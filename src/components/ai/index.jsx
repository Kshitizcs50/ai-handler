"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Groq, sendChatPrompt } from "@/services/EmployeeService";

export default function Home({ messages: initialMessages = [] }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, Jarvis this side. Do you need help?" },
    ...initialMessages,
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    Groq()
      .then((response) => setEmployees(response.data))
      .catch(console.error);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChatPrompt(input);
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
    
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl w-full  h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between bg-white/5">
          <h1 className="text-xl font-bold tracking-wide text-white">✨ Smart Chat - Jarvis</h1>
          <span className="text-sm opacity-70">{employees.length} Employees loaded</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto w-full p-6 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end space-x-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-10 h-10 bg-blue-600 text-white font-bold flex items-center justify-center rounded-full shadow">AI</div>
              )}
              <div
                className={`px-5 py-3 rounded-3xl max-w-2xl shadow-lg text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-10 h-10 bg-emerald-600 text-white font-bold flex items-center justify-center rounded-full shadow">U</div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-blue-600 text-white font-bold flex items-center justify-center rounded-full shadow">AI</div>
              <div className="px-5 py-3 rounded-3xl max-w-md bg-white/20 text-white shadow animate-pulse">
                Typing...
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Field */}
        <div className="p-4 bg-white/10 border-t border-white/20 flex items-center space-x-4 backdrop-blur-sm">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none p-3 rounded-2xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 text-white px-6 py-2 rounded-2xl font-medium shadow transition-all duration-300 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    
  );
}

export async function getServerSideProps(context) {
  const messages = context.req.session?.messages || [];
  return {
    props: {
      messages,
    },
  };
}
