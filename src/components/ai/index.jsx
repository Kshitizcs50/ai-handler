"use client";
import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Groq,sendChatPrompt } from "@/services/EmployeeService";
export default function Home({ messages: initialMessages = [] }) {

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    Groq()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    // call backend REST API
    const res = await sendChatPrompt(input); // <-- using axios service
    const aiMessage = { role: "assistant", content: res.data };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "⚠️ Error fetching AI response." },
    ]);
  } finally {
    setLoading(false);
  }
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent p-4">
  {/* Chat Container */}
  <div className="backdrop-blur-lg bg-transparent border border-white/40 rounded-2xl shadow-xl w-[1200px] h-[500px] flex flex-col overflow-hidden mb-40">
    
    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto w-full p-6 bg-transparent space-y-3">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start space-x-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow">
                  AI
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-xl shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                    : "bg-white/80 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shadow">
                  U
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow">
                AI
              </div>
              <div className="px-4 py-2 rounded-2xl max-w-xl bg-white/80 text-gray-800 shadow animate-pulse">
                Typing...{employees.data}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white/40 backdrop-blur-md border-t border-white/30 flex items-center space-x-3">
          <textarea
            className="flex-1 border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-400 placeholder-white"
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-white px-6 py-2 rounded-xl hover:opacity-90 shadow disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}


  export async function getServerSideProps(context) {
    // Fetch messages from a database or in-memory store
    // For simplicity, we'll use an array stored in the server's memory
    const messages = context.req.session.messages || [];
    return {
      props: {
        messages,
      },
    };
  }