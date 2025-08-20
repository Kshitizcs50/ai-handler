"use client"
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export default function Project() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000, // auto reconnect
    debug: (str) => console.log(str),
  });

  stompClient.onConnect = () => {
    console.log("✅ Connected");
    setConnected(true);

    stompClient.subscribe("/topic/notification", (msg) => {
      if (msg.body) {
        setMessages((prev) => [...prev, msg.body]);
      }
    });
  };

  stompClient.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  stompClient.activate();
};


  const sendMessage = () => {
  if (!stompClient || !stompClient.connected) {
    console.warn("Not connected to WebSocket yet!");
    return;
  }

  if (input.trim() !== "") {
    stompClient.publish({
      destination: "/meet/sendMessage",
      body: input,
    });
    setInput("");
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl flex flex-col h-[80vh]">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-2xl text-lg font-semibold">
          Group Chat {connected ? "🟢" : "🔴"}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="p-2 bg-gray-200 rounded-lg text-gray-800 w-fit max-w-[80%]"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
