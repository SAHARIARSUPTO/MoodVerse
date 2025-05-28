"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import confetti from "canvas-confetti";

const socket = io("http://localhost:5000");

const moodBackground = {
  happy: "bg-gradient-to-br from-yellow-200 to-yellow-400",
  sad: "bg-gradient-to-br from-blue-200 to-blue-500",
  angry: "bg-gradient-to-br from-red-300 to-red-600",
  neutral: "bg-gray-200",
  surprise: "bg-purple-200",
  fear: "bg-black text-white",
};

const moodEmoji = {
  happy: "😄",
  sad: "😢",
  angry: "😡",
  neutral: "😐",
  surprise: "😲",
  fear: "😱",
};

const moodSuggestion = {
  happy: "Spread the vibe! Text someone you love 💚",
  sad: "Take a deep breath. Want to see a meme? 🫂",
  angry: "Punch a pillow, not your code 😤",
  neutral: "Hmm... chill for now 🧘",
  surprise: "Whoa! Didn't see that coming 😯",
  fear: "It's okay, you've got this 💪",
};

export default function MoodDisplay() {
  const router = useRouter();
  const [mood, setMood] = useState(null);
  const [user, setUser] = useState({ name: "", age: "" });
  const [prevUser, setPrevUser] = useState({ name: "", age: "" });
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (!submitted) return;

    socket.on("moodUpdate", (data) => {
      if (!user.name.trim() || !user.age.trim()) {
        setWarning("❌ Please enter your name and age before scanning.");
        return;
      }

      setMood(data.mood);
      sendMoodToBackend(data.mood);

      if (data.mood === "happy" || data.mood === "surprise") {
        confetti();
      }
    });

    return () => {
      socket.off("moodUpdate");
    };
  }, [submitted]);

  const sendMoodToBackend = async (mood) => {
    try {
      const res = await fetch("http://localhost:5000/mood-track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          age: user.age,
          mood: mood,
          time: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to post mood data");

      router.push(
        `/moodhistory?name=${encodeURIComponent(
          user.name
        )}&age=${encodeURIComponent(user.age)}`
      );
    } catch (err) {
      console.error("Error posting mood:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `I'm currently ${
        moodEmoji[mood]
      } ${mood?.toUpperCase()} according to MoodVerse AI 🧠`
    );
    alert("Copied to clipboard!");
  };

  const handleRescan = () => {
    if (
      user.name.trim() !== prevUser.name.trim() ||
      user.age.trim() !== prevUser.age.trim()
    ) {
      setWarning(
        "⚠️ Please use the same name and age as before. Mood history depends on it."
      );
      return;
    }

    setWarning("");
    socket.emit("requestScan");
    setMood(null);
  };

  const handleSubmit = () => {
    if (user.name.trim() && user.age.trim()) {
      setWarning("");
      setSubmitted(true);
      setPrevUser({ ...user });
      socket.emit("requestScan");
    } else {
      setWarning("⚠️ Please enter both your name and age to start.");
    }
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#1a0f23] via-[#2f0e3e] to-[#550f55] overflow-hidden px-6 py-16 text-white select-none ${
        mood ? moodBackground[mood] : "bg-gray-100"
      }`}
    >
      <h1 className="text-5xl font-bold mb-8 text-[#F55E61] drop-shadow-md">
        🧠 MoodVerse
      </h1>

      {/* Always show this message above the form */}
      <div className="mb-6 w-full max-w-md">
        <div className="bg-blue-100 border border-blue-300 text-blue-900 rounded-lg px-4 py-3 text-sm font-medium shadow">
          <span className="font-semibold">Note:</span> Use the{" "}
          <span className="font-bold">same Name and Age</span> every time to
          view your mood history.
        </div>
      </div>

      {warning && (
        <p className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4 max-w-md w-full border border-yellow-300">
          {warning}
        </p>
      )}

      {!submitted && (
        <form
          className="mb-4 w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 flex flex-col gap-5 border border-gray-200"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-black"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-black"
              value={user.age}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              min="1"
              max="120"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-[#f72585] text-white px-4 py-3 rounded-lg w-full font-semibold hover:bg-[#f72555] transition duration-300 shadow"
          >
            Start Mood Detection
          </button>
        </form>
      )}

      {submitted && (
        <div className="bg-white bg-opacity-80 shadow-xl rounded-lg p-6 max-w-md w-full">
          <p className="text-xl mb-4 font-medium">
            Detected Mood:{" "}
            <span className="text-green-600 font-bold">
              {mood ? mood.toUpperCase() : "Waiting..."}
            </span>
          </p>

          {mood && (
            <>
              <div className="text-7xl mb-4 animate-bounce">
                {moodEmoji[mood]}
              </div>
              <p className="text-lg font-medium italic text-gray-700 mb-4">
                {moodSuggestion[mood]}
              </p>

              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
              >
                Share Your Mood
              </button>

              <button
                onClick={handleRescan}
                className="mt-3 text-sm underline text-gray-800 hover:text-black block"
              >
                Scan Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
