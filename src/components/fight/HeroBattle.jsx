"use client";
import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { motion } from "framer-motion";

export default function HeroBattle() {
  const [heroes, setHeroes] = useState([]);
  const [mode, setMode] = useState("individual");
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [opponentHeroes, setOpponentHeroes] = useState([]);
  const [result, setResult] = useState(null);
  const [isFighting, setIsFighting] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [opponentPresent, setOpponentPresent] = useState(false);

  const [battleAnim, setBattleAnim] = useState(null);
  const [commentary, setCommentary] = useState([]);
  const [winningTeam, setWinningTeam] = useState([]);
  const commentaryRef = useRef(null);

  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  // 🔌 Connect WebSocket
  useEffect(() => {
    const socket = new SockJS(
      "https://ai-handler-backend-production.up.railway.app/ws"
    );
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log("[STOMP]", str),
      reconnectDelay: 5000,
    });
    stompClientRef.current = client;

    client.onConnect = () => {
      console.log("✅ Connected to STOMP server");
      if (roomId) subscribeToRoom(roomId);
    };

    client.activate();
    return () => client.deactivate();
  }, []);

  const subscribeToRoom = (room) => {
    if (!stompClientRef.current?.connected) return;

    if (subscriptionRef.current) subscriptionRef.current.unsubscribe();

    subscriptionRef.current = stompClientRef.current.subscribe(
      `/topic/room/${room}`,
      (msg) => {
        const data = JSON.parse(msg.body);
        if (data.opponentPresent !== undefined)
          setOpponentPresent(data.opponentPresent);
        if (data.opponentHeroes) setOpponentHeroes(data.opponentHeroes);
        if (data.fightResult) {
          setResult(data.fightResult);
          setIsFighting(false);
        }
        if (data.error) alert("⚠️ " + data.error);
      }
    );
  };

  // 📥 Fetch heroes
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://ai-handler-backend-production.up.railway.app/api/battle/heroes",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch heroes: ${res.status}`);
        const data = await res.json();
        setHeroes(data);
      } catch (err) {
        console.error("❌ Error fetching heroes:", err);
      }
    };

    fetchHeroes();
  }, []);

  // 🎯 Select heroes
  const toggleHeroSelection = (hero) => {
    if (mode === "individual") {
      setSelectedHeroes([hero]);
    } else {
      if (selectedHeroes.find((h) => h.id === hero.id)) {
        setSelectedHeroes(selectedHeroes.filter((h) => h.id !== hero.id));
      } else if (selectedHeroes.length < 4) {
        setSelectedHeroes([...selectedHeroes, hero]);
      } else {
        alert("Max 4 heroes");
      }
    }
  };

  // 🥊 Local duel logic
  const duel = (hero1, hero2) => {
    let h1Wins = 0,
      h2Wins = 0,
      log = [];
    ["strength", "speed", "intelligence"].forEach((stat) => {
      if (hero1[stat] > hero2[stat]) {
        h1Wins++;
        log.push(`${hero1.name}'s ${stat} > ${hero2.name}`);
      } else if (hero1[stat] < hero2[stat]) {
        h2Wins++;
        log.push(`${hero2.name}'s ${stat} > ${hero1.name}`);
      } else log.push(`${hero1.name} and ${hero2.name} equal in ${stat}`);
    });
    const winner = h1Wins >= 2 ? hero1 : h2Wins >= 2 ? hero2 : null;
    return { winner, log };
  };

  // 🏆 Animated fight simulation
  const simulateFightAnimated = async (team1, team2) => {
    setBattleAnim(null);
    setCommentary([]);
    setWinningTeam([]);
    let heroScores = {};

    for (let i = 0; i < Math.min(team1.length, team2.length); i++) {
      const { winner, log } = duel(team1[i], team2[i]);
      setBattleAnim({ hero1: team1[i], hero2: team2[i], winner: null });
      await new Promise((res) => setTimeout(res, 2000));

      for (let l of log) {
        setCommentary((prev) => [...prev, l]);
        commentaryRef.current?.scrollTo({
          top: commentaryRef.current.scrollHeight,
          behavior: "smooth",
        });
        await new Promise((res) => setTimeout(res, 900));
      }

      setBattleAnim({ hero1: team1[i], hero2: team2[i], winner });
      if (winner) heroScores[winner.id] = (heroScores[winner.id] || 0) + 1;
      await new Promise((res) => setTimeout(res, 3000));
      setBattleAnim(null);
      await new Promise((res) => setTimeout(res, 500));
    }

    const team1Wins = team1.reduce(
      (acc, h, i) => acc + (duel(team1[i], team2[i]).winner?.id === h.id ? 1 : 0),
      0
    );
    const team2Wins = team2.reduce(
      (acc, h, i) => acc + (duel(team1[i], team2[i]).winner?.id === h.id ? 1 : 0),
      0
    );
    const finalWinner =
      team1Wins > team2Wins ? "Team 1" : team2Wins > team1Wins ? "Team 2" : "Draw";
    const mvpId = Object.keys(heroScores).sort((a, b) => heroScores[b] - heroScores[a])[0];
    const mvp = heroes.find((h) => h.id === Number(mvpId));
    setResult({
      description: "Battle Finished!",
      finalWinner,
      winners: finalWinner === "Team 1" ? team1 : team2,
      mvp,
    });
    setWinningTeam(finalWinner === "Draw" ? [] : finalWinner === "Team 1" ? team1 : team2);
    setIsFighting(false);
  };

  // ⚔ Fight button
  const handleFight = () => {
    if (mode === "individual" && selectedHeroes.length !== 1)
      return alert("Select 1 hero");
    if (mode === "team" && selectedHeroes.length === 0)
      return alert("Select at least 1 hero");

    if (mode === "multiplayer") {
      if (!roomId || selectedHeroes.length !== 4)
        return alert("Enter room ID and select 4 heroes");
      stompClientRef.current.publish({
        destination: "/app/selectHeroes",
        body: JSON.stringify({ roomId, heroes: selectedHeroes.map((h) => h.id) }),
      });
      setIsFighting(true);
      return;
    }

    const available = heroes.filter(
      (h) => !selectedHeroes.find((sel) => sel.id === h.id)
    );
    const opponents =
      mode === "individual"
        ? [available[Math.floor(Math.random() * available.length)]]
        : available.slice(0, 4);
    setOpponentHeroes(opponents);
    setIsFighting(true);
    setResult(null);
    simulateFightAnimated(selectedHeroes, opponents);
  };

  // 🚪 Join multiplayer room
  const joinRoom = () => {
    const room = prompt("Enter room ID:");
    if (!room) return;
    setRoomId(room);
    setMode("multiplayer");
    setSelectedHeroes([]);
    setOpponentHeroes([]);
    setResult(null);
    subscribeToRoom(room);
    stompClientRef.current.publish({ destination: "/joinRoom", body: JSON.stringify({ roomId: room }) });
    setOpponentPresent(false);
  };

  const canFight =
    mode === "individual"
      ? selectedHeroes.length === 1
      : mode === "team"
      ? selectedHeroes.length > 0
      : mode === "multiplayer"
      ? opponentPresent && selectedHeroes.length === 4 && opponentHeroes.length === 4
      : false;

  // --- JSX ---
  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-yellow-400 drop-shadow-lg">
        ⚔ Hero Battle Arena ⚔
      </h1>

      {/* Modes */}
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
        <button
          className={`px-6 py-3 rounded-xl font-bold shadow-lg ${
            mode === "individual" ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => {
            setMode("individual");
            setSelectedHeroes([]);
            setOpponentHeroes([]);
            setResult(null);
          }}
        >
          Individual
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-bold shadow-lg ${
            mode === "team" ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => {
            setMode("team");
            setSelectedHeroes([]);
            setOpponentHeroes([]);
            setResult(null);
          }}
        >
          Team (4 vs 4)
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-bold shadow-lg ${
            mode === "multiplayer" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={joinRoom}
        >
          Multiplayer 4v4
        </button>
      </div>

      {mode === "multiplayer" && (
        <p className="text-center text-yellow-400 mt-2 text-sm md:text-base">
          Room ID: {roomId} | {opponentPresent ? "✅ Opponent joined!" : "⏳ Waiting for opponent..."}
        </p>
      )}

      {/* Hero selection */}
      <h2 className="text-2xl font-bold text-yellow-300">Select Your Heroes</h2>
      <p className="text-center text-yellow-400 mb-2 text-sm md:text-base">
        Selected: {selectedHeroes.length} / {mode === "individual" ? 1 : 4} | Remaining:{" "}
        {mode === "individual" ? 1 - selectedHeroes.length : 4 - selectedHeroes.length}
      </p>
      {selectedHeroes.length > 0 && (
        <p className="text-center text-yellow-300 mb-2 text-sm md:text-base">
          ⚔ Heroes will fight in the order you selected them, line by line against the opponent.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {heroes.map((hero) => (
          <div
            key={hero.id}
            className={`border-4 rounded-xl p-2 cursor-pointer flex flex-col items-center justify-center ${
              selectedHeroes.find((h) => h.id === hero.id)
                ? "border-yellow-400 bg-gray-800"
                : "border-transparent bg-gray-900/70"
            }`}
            onClick={() => toggleHeroSelection(hero)}
          >
            <div className="w-full h-36 sm:h-40 md:h-48 flex items-center justify-center bg-black rounded-lg overflow-hidden">
              <img
                src={hero.imageUrl || hero.image}
                alt={hero.name}
                className="object-contain h-full"
              />
            </div>
            <p className="text-center font-bold mt-2 text-sm sm:text-base">{hero.name}</p>
          </div>
        ))}
      </div>

      {/* Fight button */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-6 md:px-8 py-3 rounded-xl font-bold text-lg md:text-xl shadow-lg transition ${
            canFight
              ? "bg-gradient-to-r from-red-600 to-yellow-500 hover:scale-105"
              : "bg-gray-600 cursor-not-allowed"
          }`}
          disabled={!canFight || isFighting}
          onClick={handleFight}
        >
          {isFighting ? "Fighting..." : "Fight ⚔"}
        </button>
      </div>

      {/* Opponent heroes */}
      {opponentHeroes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Opponent Heroes:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {opponentHeroes.map((hero) => (
              <div
                key={hero.id}
                className="border border-gray-700 p-2 rounded-xl bg-gray-800 flex flex-col items-center"
              >
                <img
                  src={hero.imageUrl || hero.image}
                  alt={hero.name}
                  className="w-full h-28 sm:h-32 md:h-36 object-contain rounded-lg mb-2"
                />
                <p className="font-bold text-sm sm:text-base">{hero.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Battle Animation */}
      {battleAnim && (
        <div className="relative w-full h-48 sm:h-56 md:h-64 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12 mt-6">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <img
              src={battleAnim.hero1.imageUrl || battleAnim.hero1.image}
              alt={battleAnim.hero1.name}
              className={`w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full border-2 border-yellow-400 ${
                battleAnim.winner === battleAnim.hero2 ? "blur-sm" : ""
              }`}
            />
            <p className="text-center mt-2 text-sm sm:text-base">{battleAnim.hero1.name}</p>
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <img
              src={battleAnim.hero2.imageUrl || battleAnim.hero2.image}
              alt={battleAnim.hero2.name}
              className={`w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full border-2 border-red-400 ${
                battleAnim.winner === battleAnim.hero1 ? "blur-sm" : ""
              }`}
            />
            <p className="text-center mt-2 text-sm sm:text-base">{battleAnim.hero2.name}</p>
          </motion.div>
        </div>
      )}

      {/* Commentary */}
      {commentary.length > 0 && (
        <div
          ref={commentaryRef}
          className="max-h-36 sm:max-h-48 overflow-y-auto bg-black/40 p-3 sm:p-4 rounded-lg text-yellow-200 text-xs sm:text-sm"
        >
          {commentary.map((c, i) => (
            <p key={i}>{c}</p>
          ))}
        </div>
      )}

      {/* Battle result */}
      {result && (
        <div className="text-center p-4 sm:p-6 border rounded-xl bg-gray-800/80 shadow-lg mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-green-400">
            {result.finalWinner === "Draw"
              ? "⚖️ It's a Draw!"
              : result.finalWinner === "Team 1"
              ? "🎉 You Won!"
              : "❌ You Lost!"}
          </h2>

          {result.mvp && (
            <div className="mb-4 flex flex-col items-center">
              <p className="text-lg sm:text-xl font-bold text-yellow-300 mb-2">🏅 MVP: {result.mvp.name}</p>
              <img
                src={result.mvp.imageUrl || result.mvp.image}
                alt={result.mvp.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-full border-2 border-yellow-400"
              />
            </div>
          )}

          {winningTeam.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg sm:text-xl text-yellow-400 mb-2">🏆 Winning Team:</h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {winningTeam.map((h) => (
                  <img
                    key={h.id}
                    src={h.imageUrl || h.image}
                    alt={h.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full border-2 border-green-400"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
