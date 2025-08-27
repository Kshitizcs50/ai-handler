"use client";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import iron from "../projects/iron.png";
import thor from "../projects/thor.png";
import hulk from "../projects/hulk.png";
import america from "../projects/america.png";

const predefinedUsers = [
  { name: "Iron Man", avatar: iron.src },
  { name: "Thor", avatar: thor.src },
  { name: "Hulk", avatar: hulk.src },
  { name: "Captain America", avatar: america.src },
];

export default function Project() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [takenUsers, setTakenUsers] = useState([]);
  const [disabledHeroes, setDisabledHeroes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Setup WebSocket
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("✅ Connected to WebSocket");
      setConnected(true);

      // 🔹 Subscribe to global taken heroes updates
      client.subscribe("/topic/takenHeroes", (msg) => {
        if (msg.body) {
          const heroes = JSON.parse(msg.body);
          console.log("📌 Taken heroes from server:", heroes);
          setTakenUsers(heroes); // overwrite with server state
        }
      });

      // 🔹 Request current taken heroes from server
      client.publish({
        destination: "/app/getTakenHeroes",
        body: "{}",
      });

      // 🔹 Subscribe to notifications
      client.subscribe("/topic/notification", (msg) => {
        if (!msg.body) return;
        const data = JSON.parse(msg.body);

        if (data.type === "USER_TAKEN") {
          setTakenUsers((prev) =>
            prev.includes(data.hero) ? prev : [...prev, data.hero]
          );
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

    return () => {
      client.deactivate();
    };
  }, [currentUser]);

  // Send chat message
  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) return;

    stompClient.publish({
      destination: "/meet/sendMessage",
      body: JSON.stringify({
        type: "CHAT",
        sender: currentUser.name,
        text: input,
      }),
    });

    setInput("");
  };

  // 🔹 REST-based hero selection
  const handleSelectHero = async (u) => {
    if (takenUsers.includes(u.name)) return; // 🚫 Already taken
    if (currentUser) return; // 🚫 Already selected yourself

    // Set locally
    setCurrentUser(u);
    setTakenUsers((prev) => [...prev, u.name]);

    try {
      // Call backend REST API
      await fetch(`api/heroes/${heroId}/disable`, { method: "POST" });
      setDisabledHeroes([...disabledHeroes, u.name]);
    } catch (error) {
      console.error("Error disabling hero=", error);
    }

    // Also broadcast via WebSocket so other clients know
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/api/selectHero",
        body: JSON.stringify({
          type: "USER_TAKEN",
          hero: u.name,
        }),
      });
    }
  };

  // If hero not selected yet
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
          {predefinedUsers.map((u) => {
            const isTaken = takenUsers.includes(u.name);
            return (
              <div
                key={u.name}
                style={{
                  cursor: isTaken ? "not-allowed" : "pointer",
                  padding: "10px",
                  border: "2px solid #ddd",
                  borderRadius: "12px",
                  width: "120px",
                  opacity: isTaken ? 0.5 : 1,
                  transition: "0.2s",
                }}
                onClick={() => handleSelectHero(u)}
              >
                <img
                  src={u.avatar}
                  alt={u.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                />
                <p>{u.name}</p>
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
          textAlign: "center",
          height: "100px",
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
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.self ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            {!msg.self && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  style={{
                    width: "75px",
                    height: "85px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
            <div
              style={{
                background: msg.self ? "#007bff" : "#e5e5ea",
                color: msg.self ? "white" : "black",
                padding: "5px 28px",
                borderRadius: "10px",
                maxWidth: "50%",
                wordWrap: "break-word",
                height: "37px",
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
    </div>
  );
}
