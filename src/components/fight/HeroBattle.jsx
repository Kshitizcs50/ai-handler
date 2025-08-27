"use client";
import { useState, useEffect } from "react";

export default function HeroBattle() {
  const [heroes, setHeroes] = useState([]);
  const [mode, setMode] = useState("individual");
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [opponentHeroes, setOpponentHeroes] = useState([]);
  const [result, setResult] = useState(null);
  const [isFighting, setIsFighting] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/battle/heroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

  const toggleHeroSelection = (hero) => {
    if (mode === "individual") {
      setSelectedHeroes([hero]);
    } else {
      if (selectedHeroes.find((h) => h.id === hero.id)) {
        setSelectedHeroes(selectedHeroes.filter((h) => h.id !== hero.id));
      } else {
        if (selectedHeroes.length < 4) {
          setSelectedHeroes([...selectedHeroes, hero]);
        } else {
          alert("You can select max 4 heroes!");
        }
      }
    }
  };

  // 🛡️ Compare two heroes (best of 3 stats)
  const duel = (hero1, hero2) => {
    let h1Wins = 0;
    let h2Wins = 0;
    let fightLog = [];

    ["strength", "speed", "intelligence"].forEach((stat) => {
      if (hero1[stat] > hero2[stat]) {
        h1Wins++;
        fightLog.push(`${hero1.name}'s ${stat} is greater than ${hero2.name}`);
      } else if (hero1[stat] < hero2[stat]) {
        h2Wins++;
        fightLog.push(`${hero2.name}'s ${stat} is greater than ${hero1.name}`);
      } else {
        fightLog.push(`${hero1.name} and ${hero2.name} are equal in ${stat}`);
      }
    });

    let winner = null;
    if (h1Wins >= 2) winner = hero1;
    else if (h2Wins >= 2) winner = hero2;

    return { winner, log: fightLog };
  };

  // 🛡️ Team or individual fight
  const simulateFight = (team1, team2) => {
    let battleLog = [];
    let team1Wins = 0;
    let team2Wins = 0;
    let heroScores = {}; // for MVP tracking

    for (let i = 0; i < Math.min(team1.length, team2.length); i++) {
      const hero1 = team1[i];
      const hero2 = team2[i];
      const { winner, log } = duel(hero1, hero2);

      battleLog.push(`⚔️ ${hero1.name} vs ${hero2.name}`);
      log.forEach((line) => battleLog.push("• " + line));
      battleLog.push(`➡ Winner: ${winner ? winner.name : "Draw"}\n`);

      if (winner) {
        if (winner.id === hero1.id) team1Wins++;
        if (winner.id === hero2.id) team2Wins++;

        heroScores[winner.id] = (heroScores[winner.id] || 0) + 1;
      }
    }

    let finalWinner =
      team1Wins > team2Wins
        ? "Team 1"
        : team2Wins > team1Wins
        ? "Team 2"
        : "Draw";

    let winners = finalWinner === "Team 1" ? team1 : team2;

    // Find MVP
    let mvpId = Object.keys(heroScores).sort(
      (a, b) => heroScores[b] - heroScores[a]
    )[0];
    let mvp = heroes.find((h) => h.id === Number(mvpId));

    return {
      description: battleLog.join("\n"),
      finalWinner,
      winners,
      mvp,
    };
  };

  const handleFight = () => {
    if (mode === "individual" && selectedHeroes.length !== 1) {
      alert("Select exactly 1 hero");
      return;
    }
    if (mode === "team" && selectedHeroes.length === 0) {
      alert("Select at least 1 hero");
      return;
    }

    let available = heroes.filter(
      (h) => !selectedHeroes.find((sel) => sel.id === h.id)
    );
    let opponents = [];

    if (mode === "individual") {
      opponents = [available[Math.floor(Math.random() * available.length)]];
    } else {
      for (let i = 0; i < 4 && available.length > 0; i++) {
        let randIndex = Math.floor(Math.random() * available.length);
        opponents.push(available[randIndex]);
        available.splice(randIndex, 1);
      }
    }

    setOpponentHeroes(opponents);
    setIsFighting(true);
    setResult(null);

    setTimeout(() => {
      let fightResult = simulateFight(selectedHeroes, opponents);
      setResult(fightResult);
      setIsFighting(false);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen p-6 space-y-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
      style={{
        backgroundImage: "url('/battle-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-extrabold text-center text-yellow-400 drop-shadow-lg">
        ⚔ Hero Battle Arena ⚔
      </h1>

      <div className="flex justify-center gap-6">
        <button
          className={`px-6 py-3 rounded-xl font-bold shadow-lg transition ${
            mode === "individual"
              ? "bg-red-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
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
          className={`px-6 py-3 rounded-xl font-bold shadow-lg transition ${
            mode === "team"
              ? "bg-green-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
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
      </div>

      <h2 className="text-2xl font-bold text-yellow-300">Your Heroes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {heroes.map((hero) => (
          <div
            key={hero.id}
            className={`border-4 rounded-xl p-2 cursor-pointer transform transition hover:scale-105 flex flex-col items-center justify-center ${
              selectedHeroes.find((h) => h.id === hero.id)
                ? "border-yellow-400 bg-gray-800"
                : "border-transparent bg-gray-900/70"
            }`}
            onClick={() => toggleHeroSelection(hero)}
          >
            <div className="w-full h-48 flex items-center justify-center bg-black rounded-lg overflow-hidden">
              <img
                src={hero.imageUrl}
                alt={hero.name}
                className="object-contain h-full"
              />
            </div>
            <p className="text-center font-bold mt-2">{hero.name}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition"
          onClick={handleFight}
        >
          Fight ⚔
        </button>
      </div>

      {isFighting && (
        <div className="text-center text-3xl font-bold text-red-400 animate-pulse">
          🔥 The Battle is Raging... 🔥
        </div>
      )}

      {result && (
        <div className="text-center p-6 border rounded-xl bg-gray-800/80 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-green-400">
            {result.finalWinner === "Draw"
              ? "⚖️ It's a Draw!"
              : result.finalWinner === "Team 1"
              ? "🎉 You Won!"
              : "❌ You Lost!"}
          </h2>

          <pre className="text-left whitespace-pre-wrap text-yellow-200 bg-black/40 p-4 rounded-lg max-h-64 overflow-y-auto">
            {result.description}
          </pre>

          {mode === "team" && (
            <div className="mt-6">
              <h3 className="font-bold text-green-400">Winning Team</h3>
              <div className="flex justify-center gap-4 mt-2">
                {result.winners.map((hero) => (
                  <div key={hero.id} className="text-center">
                    <img
                      src={hero.imageUrl}
                      alt={hero.name}
                      className="w-20 h-20 object-contain rounded-full border-2 border-yellow-400 bg-black p-1"
                    />
                    <p>{hero.name}</p>
                  </div>
                ))}
              </div>

              {result.mvp && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-yellow-400">
                    🏆 Most Valuable Player
                  </h3>
                  <div className="flex justify-center mt-2">
                    <div className="text-center">
                      <img
                        src={result.mvp.imageUrl}
                        alt={result.mvp.name}
                        className="w-28 h-28 object-contain rounded-full border-4 border-yellow-400 shadow-lg bg-black p-2"
                      />
                      <p className="text-lg font-bold mt-2">{result.mvp.name}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === "individual" && (
            <p className="mt-4 font-bold text-lg text-yellow-400">
              Winner: {result.winners[0]?.name || "Draw"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
