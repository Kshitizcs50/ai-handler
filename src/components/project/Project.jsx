"use client";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import iron from "../projects/iron.png";
import thor from "../projects/thor.png";
import hulk from "../projects/hulk.png";
import america from "../projects/america.png";

const predefinedUsers = [
  { name: "Captain America", avatar: america.src },
  { name: "Iron Man", avatar: iron.src },
  { name: "Thor", avatar: thor.src },
  { name: "Hulk", avatar: hulk.src },
];

export default function HeroBattle() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [takenHeroes, setTakenHeroes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("https://ai-handler-backend-production.up.railway.app/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      setConnected(true);

      client.subscribe("/topic/notification", (msg) => {
        if (!msg.body) return;
        const data = JSON.parse(msg.body);

        if (data.type === "USER_TAKEN") {
          setTakenHeroes((prev) =>
            prev.includes(data.hero) ? prev : [...prev, data.hero]
          );
        }

        if (data.type === "USER_RELEASED") {
          setTakenHeroes((prev) => prev.filter((h) => h !== data.hero));
        }

        if (data.type === "CHAT") {
          setMessages((prev) => [
            ...prev,
            {
              text: data.text,
              sender: data.sender,
              avatar:
                predefinedUsers.find((u) => u.name === data.sender)?.avatar ||
                "",
              self: data.sender === currentUser?.name,
            },
          ]);
        }
      });
    };

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, [currentUser]);

  const sendMessage = () => {
    if (!stompClient || !stompClient.connected || !input.trim() || !currentUser) return;

    const msgObj = { type: "CHAT", sender: currentUser.name, text: input };
    stompClient.publish({ destination: "/app/sendMessage", body: JSON.stringify(msgObj) });
    setInput("");
  };

  const handleSelectHero = (hero) => {
    if (takenHeroes.includes(hero.name) || currentUser) return;

    setCurrentUser(hero);
    setTakenHeroes((prev) => [...prev, hero.name]);

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify({ type: "USER_TAKEN", hero: hero.name }),
      });
    }
  };

  const releaseHero = () => {
    if (!currentUser || !stompClient || !stompClient.connected) return;

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify({ type: "USER_RELEASED", hero: currentUser.name }),
    });

    setTakenHeroes((prev) => prev.filter((h) => h !== currentUser.name));
    setCurrentUser(null);
  };

  // Hero Selection Screen
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-6">Select Your Hero</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {predefinedUsers.map((hero) => {
            const isTaken = takenHeroes.includes(hero.name);
            return (
              <div
                key={hero.name}
                onClick={() => handleSelectHero(hero)}
                className={`cursor-pointer border-2 border-gray-300 rounded-xl p-4 w-32 transition-opacity ${
                  isTaken ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                }`}
              >
                <img
                  src={hero.avatar}
                  alt={hero.name}
                  className="w-20 h-20 mx-auto rounded-full mb-2"
                />
                <p className="text-center font-medium">{hero.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Chat Screen
  return (
    <div className="flex flex-col max-w-6xl w-full mx-auto h-[80vh] border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-800 to-gray-900 text-white">
        <h2 className="font-bold">Team Meet {connected ? "🟢" : "🔴"}</h2>
        <h3 className="text-yellow-400 font-bold">You are {currentUser.name}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-2 ${msg.self ? "justify-end" : "justify-start"}`}
          >
            {!msg.self && (
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-16 h-16 rounded-full mr-2"
              />
            )}
            <div
              className={`px-6 py-2 rounded-lg max-w-[50%] break-words flex items-center ${
                msg.self ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-4 border-t border-gray-700 bg-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>

      {/* Release Hero */}
      <div className="p-4 text-center">
        <button
          onClick={releaseHero}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Release {currentUser.name}
        </button>
      </div>
    </div>
  );
}
