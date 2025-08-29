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

  // WebSocket setup
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("✅ Connected to WebSocket");
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

  // Send chat
  const sendMessage = () => {
    if (!stompClient || !stompClient.connected || !input.trim() || !currentUser) return;

    const msgObj = { type: "CHAT", sender: currentUser.name, text: input };

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(msgObj),
    });

    setInput("");
  };

  // Select hero
  const handleSelectHero = (hero) => {
    if (takenHeroes.includes(hero.name) || currentUser) return;

    setCurrentUser(hero);
    setTakenHeroes((prev) => [...prev, hero.name]);

    // Notify server
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify({ type: "USER_TAKEN", hero: hero.name }),
      });
    }
  };

  // Release hero
  const releaseHero = () => {
    if (!currentUser || !stompClient || !stompClient.connected) return;

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify({ type: "USER_RELEASED", hero: currentUser.name }),
    });

    setTakenHeroes((prev) => prev.filter((h) => h !== currentUser.name));
    setCurrentUser(null);
  };

  // Hero selection screen
  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Select Your Hero</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {predefinedUsers.map((hero) => {
            const isTaken = takenHeroes.includes(hero.name);
            return (
              <div
                key={hero.name}
                onClick={() => handleSelectHero(hero)}
                style={{
                  cursor: isTaken ? "not-allowed" : "pointer",
                  opacity: isTaken ? 0.5 : 1,
                  border: "2px solid #ddd",
                  borderRadius: "12px",
                  padding: "10px",
                  width: "120px",
                  transition: "0.2s",
                }}
              >
                <img
                  src={hero.avatar}
                  alt={hero.name}
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
                <p>{hero.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Chat UI
  return (
    <div
      style={{
        maxWidth: "1500px",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        width: "90%",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg, rgb(83 52 121), rgb(38 30 47))",
          color: "white",
          padding: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold", margin: 0 }}>
          Team meet {connected ? "🟢" : "🔴"}
        </h2>
        <h3
          style={{ marginLeft: "160px", color: "yellow", fontWeight: "bold" }}
        >
          You are {currentUser.name}
        </h3>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          background: "transparent",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.self ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            {!msg.self && (
              <img
                src={msg.avatar}
                alt={msg.sender}
                style={{
                  width: "75px",
                  height: "85px",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
            )}
            <div
              style={{
                background: msg.self ? "#007bff" : "#e5e5ea",
                color: msg.self ? "white" : "black",
                padding: "5px 28px",
                borderRadius: "10px",
                maxWidth: "50%",
                wordWrap: "break-word",
                minHeight: "37px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "black",
            color: "white",
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>

      {/* Release button */}
      {currentUser && (
        <div style={{ textAlign: "center", margin: "10px" }}>
          <button
            onClick={releaseHero}
            style={{
              padding: "8px 16px",
              background: "red",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Release {currentUser.name}
          </button>
        </div>
      )}
    </div>
  );
}
