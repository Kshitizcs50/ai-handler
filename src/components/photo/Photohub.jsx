"use client";
import React, { useState, useEffect } from "react";

const HEROES = ["Iron Man", "Thor", "Hulk", "Captain America"];

export default function Photohub() {
  const [file, setFile] = useState(null);
  const [hero, setHero] = useState(HEROES[0]);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState("");
  const [keyStatus, setKeyStatus] = useState(null); // ✅ API key check

  // ✅ Check Hugging Face key when page loads
  useEffect(() => {
    async function checkKey() {
      try {
        const res = await fetch("http://localhost:8080/ai/check-key");
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to check key");
        setKeyStatus(data.valid ? "valid" : "invalid");
      } catch (err) {
        setKeyStatus("error");
      }
    }
    checkKey();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResultUrl(null);

    if (!file) {
      setError("Please choose a photo first.");
      return;
    }

    if (keyStatus !== "valid") {
      setError("Cannot generate — API key is missing or invalid.");
      return;
    }

    const form = new FormData();
    form.append("photo", file);
    form.append("hero", hero);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/ai/heroize", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      if (data.url) {
        setResultUrl(
          data.url.startsWith("http")
            ? data.url
            : `http://localhost:8080${data.url}`
        );
      } else {
        throw new Error("No image URL returned from server.");
      }
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", color: "#fff" }}>
      <h2>Become a Hero 🦸</h2>

      {/* ✅ Key status banner */}
      {keyStatus === "valid" && (
        <p style={{ color: "lightgreen" }}>✅ API key is valid, ready to generate.</p>
      )}
      {keyStatus === "invalid" && (
        <p style={{ color: "salmon" }}>⚠️ API key is missing or invalid. Image generation won’t work.</p>
      )}
      {keyStatus === "error" && (
        <p style={{ color: "orange" }}>⚠️ Could not check API key (server error).</p>
      )}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Choose a hero:
          <select value={hero} onChange={(e) => setHero(e.target.value)}>
            {HEROES.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>

        <label>
          Upload your photo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <button
          type="submit"
          disabled={!file || loading}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: loading ? "#555" : "#007bff",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && <p style={{ color: "salmon", marginTop: 12 }}>{error}</p>}

      {resultUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Your result</h3>
          <img
            src={resultUrl}
            alt="Result"
            style={{ width: "100%", maxWidth: 512, borderRadius: 12 }}
          />
        </div>
      )}
    </div>
  );
}
