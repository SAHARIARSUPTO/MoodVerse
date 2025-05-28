"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const moodColors = {
  happy: "#4ade80",
  sad: "#60a5fa",
  angry: "#f87171",
  fear: "#facc15",
  surprise: "#a78bfa",
  neutral: "#a3a3a3",
};

// Map moods to numeric levels for chart Y-axis
const moodLevels = {
  angry: 0,
  sad: 1,
  fear: 2,
  neutral: 3,
  surprise: 4,
  happy: 5,
};

// Suggestions for each mood
const moodSuggestions = {
  happy: [
    {
      label: "Celebrate with a happy playlist 🎶",
      url: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
      type: "spotify",
    },
    {
      label: "See happy memes 😄",
      url: "https://www.google.com/search?q=happy+memes&tbm=isch",
      type: "meme",
    },
    {
      label: "Try a fun online game 🎮",
      url: "https://poki.com/",
      type: "fun",
    },
  ],
  sad: [
    {
      label: "Cheer up with wholesome memes 🥰",
      url: "https://www.google.com/search?q=wholesome+memes&tbm=isch",
      type: "meme",
    },
    {
      label: "Listen to uplifting music 🎵",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
      type: "spotify",
    },
    {
      label: "Watch a cute animal video 🐶",
      url: "https://www.youtube.com/results?search_query=cute+animal+videos",
      type: "fun",
    },
  ],
  angry: [
    {
      label: "Calm down with chill beats 🎧",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
      type: "spotify",
    },
    {
      label: "Laugh it off with funny memes 😂",
      url: "https://www.google.com/search?q=funny+memes&tbm=isch",
      type: "meme",
    },
    {
      label: "Try a breathing exercise 🌬️",
      url: "https://www.youtube.com/results?search_query=breathing+exercise",
      type: "fun",
    },
  ],
  fear: [
    {
      label: "Motivational playlist 💪",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa",
      type: "spotify",
    },
    {
      label: "See brave memes 🦁",
      url: "https://www.google.com/search?q=brave+memes&tbm=isch",
      type: "meme",
    },
    {
      label: "Try a guided meditation 🧘",
      url: "https://www.youtube.com/results?search_query=guided+meditation",
      type: "fun",
    },
  ],
  surprise: [
    {
      label: "Surprise playlist! 🎉",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO",
      type: "spotify",
    },
    {
      label: "Surprised Pikachu memes 😲",
      url: "https://www.google.com/search?q=surprised+pikachu+memes&tbm=isch",
      type: "meme",
    },
    {
      label: "Random fun fact 🤓",
      url: "https://www.thefactsite.com/1000-interesting-facts/",
      type: "fun",
    },
  ],
  neutral: [
    {
      label: "Chill lo-fi beats ☕",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
      type: "spotify",
    },
    {
      label: "Neutral memes 😐",
      url: "https://www.google.com/search?q=neutral+memes&tbm=isch",
      type: "meme",
    },
    {
      label: "Try a relaxing puzzle 🧩",
      url: "https://www.jigsawplanet.com/",
      type: "fun",
    },
  ],
};

export default function MoodHistoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "";
  const age = searchParams.get("age") || "";

  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/mood-history?name=${name}&age=${age}`
      );
      if (!res.ok) throw new Error("Failed to fetch mood history");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    if (name && age) fetchHistory();
  }, [name, age]);

  const lastMood = history.length > 0 ? history[history.length - 1].mood : "";

  const suggestContent = () => {
    if (!lastMood) return "Let's explore something based on your mood!";
    const suggestions = moodSuggestions[lastMood] || [];
    return (
      <div>
        <div className="mb-2">
          {lastMood === "happy" &&
            "😊 You're glowing! Keep riding that good vibe."}
          {lastMood === "sad" &&
            "😢 Feeling blue? Here's something to cheer you up!"}
          {lastMood === "angry" &&
            "😡 Breathe out the rage. Try these to relax."}
          {lastMood === "fear" && "😨 Fear not. Get motivated or calm down."}
          {lastMood === "surprise" && "😲 Something unexpected? Enjoy these!"}
          {lastMood === "neutral" && "😐 Take it easy with these suggestions."}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {suggestions.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 rounded shadow transition ${
                s.type === "spotify"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : s.type === "meme"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-4 text-[#f55e61]">
          🧠 Mood History
        </h1>

        <p className="text-center text-gray-700 mb-6">
          Name: <strong>{name}</strong> | Age: <strong>{age}</strong>
        </p>

        {history.length > 0 ? (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Mood Timeline</h2>
              <ul className="space-y-2">
                {history.map((item, idx) => (
                  <li key={idx} className="text-gray-800">
                    <span className="font-semibold">
                      {new Date(item.time).toLocaleString()}
                    </span>{" "}
                    —{" "}
                    <span
                      className="uppercase tracking-wide font-bold"
                      style={{ color: moodColors[item.mood] || "#f55e61" }}
                    >
                      {item.mood}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Mood Line Chart</h2>
              <Line
                data={{
                  labels: history.map((item) =>
                    new Date(item.time).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  ),
                  datasets: [
                    {
                      label: "Mood Level",
                      data: history.map((item) => moodLevels[item.mood] ?? 3),
                      backgroundColor: "rgba(245, 94, 97, 0.2)",
                      borderColor: "#f55e61",
                      tension: 0.4,
                      fill: true,
                      pointRadius: 6,
                      pointBackgroundColor: history.map(
                        (item) => moodColors[item.mood] || "#ccc"
                      ),
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      min: 0,
                      max: 5,
                      ticks: {
                        stepSize: 1,
                        callback: function (value) {
                          // Map numeric value to mood label for y-axis
                          const moodMap = Object.entries(moodLevels).reduce(
                            (acc, [k, v]) => ({ ...acc, [v]: k }),
                            {}
                          );
                          return moodMap[value]
                            ? moodMap[value].toUpperCase()
                            : value;
                        },
                      },
                    },
                  },
                }}
              />
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-2">
                Mood Suggestions 💡
              </h2>
              <div className="text-gray-700 text-lg">{suggestContent()}</div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-12">
            Loading your mood history...
          </p>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => router.push("/")}
            className="bg-[#f55e61] hover:bg-[#e04c51] text-white px-6 py-2 rounded-full transition"
          >
            ← Return to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
