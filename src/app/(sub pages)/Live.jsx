import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function Live() {
  const [projects, setProjects] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // WebSocket connection
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/topic/marvelUpdates", (msg) => {
        if (msg.body) {
          setProjects(JSON.parse(msg.body));
        }
      });
    };

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", overflowX: "scroll" }}>
      {projects.map((p, idx) => (
        <div key={idx} style={{ minWidth: "200px" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${p.posterPath}`}
            alt={p.title}
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <h3>{p.title}</h3>
          <p>Release: {p.releaseDate}</p>
        </div>
      ))}
    </div>
  );
}
