"use client";
import { useState, useEffect } from "react";

export default function WelcomePage() {
  const [joke, setJoke] = useState("");
  const [isClient, setIsClient] = useState(false); // Hydration fix

  useEffect(() => {
    setIsClient(true); // Ensures jokes only render on the client
  }, []);

  const generateJoke = () => {
    const jokes = [
      "Why did the student eat his homework? Because the teacher said it was a piece of cake! 🎂",
      "Why don’t eggs tell jokes? Because they might crack up! 🥚😂",
      "What do you call a bear with no teeth? A gummy bear! 🐻",
      "Why was the math book sad? Because it had too many problems! 📖",
      "I told my WiFi a joke... but it didn’t get it. Must have been a bad connection. 📶😆",
      "Why did the computer catch a cold? Because it left its Windows open! 🖥️❄️",
      "Why don’t skeletons fight each other? They don’t have the guts! 💀😂",
      "Why was the broom late? It swept in! 🧹😆",
      "What’s orange and sounds like a parrot? A carrot! 🥕🦜",
      "Why don’t cows have phones? Because they always drop their calls! 🐄📱",
      "Why did the banana go to the doctor? Because it wasn’t peeling well! 🍌🤒",
      "Why did the bicycle fall over? Because it was two-tired! 🚲😴",
      "What did one wall say to the other wall? Meet you at the corner! 🏠🤣",
      "Why did the tomato blush? Because it saw the salad dressing! 🍅👀",
      "What’s a cat’s favorite color? Purrrrrple! 🐱💜",
    ];
    setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
  };

  // Only render the content after client-side hydration is complete
  if (!isClient) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FCF2F2] relative overflow-hidden px-6 py-10">
      {/* Floating Emojis */}
      <FloatingEmoji emoji="😭" top="10%" left="5%" />
      <FloatingEmoji emoji="🤔" top="15%" right="10%" />
      <FloatingEmoji emoji="😐" bottom="20%" left="15%" />
      <FloatingEmoji emoji="😍" bottom="10%" right="12%" />
      <FloatingEmoji emoji="😂" bottom="50%" left="12%" />
      <FloatingEmoji emoji="😂" bottom="50%" right="12%" />

      {/* Main Content */}
      <div className="text-center space-y-6">
        {/* Stylish Animated Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 md:mb-10 hover:scale-105 transition-transform duration-300">
          Welcome to{" "}
          <span className="text-red-500 hover:text-blue-500 transition-colors duration-500 animate-wave">
            MoodVerse
          </span>
        </h1>

        {/* Fun, Bold Text */}
        <p className="text-2xl md:text-5xl font-bold space-y-4">
          <span className="bg-red-500 text-white px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-xl">
            Your Mood
          </span>{" "}
          <span className="text-red-500 hover:text-blue-600 transition-colors duration-500">
            Our Vibe
          </span>
        </p>

        {/* Mood Detection Text */}
        <p className="text-lg md:text-xl text-gray-700 italic">
          "Detecting your mood... Just kidding! 🤭"
        </p>

        {/* Joke Display (Now Above Buttons & Hidden Initially) */}
        {joke && (
          <p className="mt-6 text-lg md:text-xl text-gray-800 bg-white p-4 rounded-lg shadow-lg w-[90%] md:w-3/4 mx-auto animate-fade-in">
            {joke}
          </p>
        )}

        {/* Buttons Container */}
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
        {/* Joke Button */}
        <button
          onClick={generateJoke}
          className="bg-blue-500 text-white font-semibold py-3 px-10 md:px-14 rounded-lg shadow-lg text-lg md:text-xl transition-transform duration-300 hover:scale-110 hover:bg-blue-600 active:scale-95"
        >
          Need a laugh? 😂
        </button>
      </div>
      {/* "Let’s Start" Button Positioned Elsewhere */}
      <div className=" mt-10 w-full flex justify-center">
        <button className="bg-white text-black font-semibold py-3 px-12 md:px-20 rounded-lg shadow-lg text-lg md:text-xl transition-transform duration-300 hover:scale-110 hover:bg-gray-200 active:scale-95">
          Let’s Start 🚀
        </button>
      </div>
    </main>
  );
}

// 🎭 Reusable Floating Emoji Component with Smooth Floating Animation
const FloatingEmoji = ({ emoji, top, left, right, bottom }) => {
  const styles = { top, left, right, bottom };

  return (
    <div
      className="absolute text-5xl md:text-7xl floating-emoji animate-float"
      style={{
        ...styles,
        transform: `rotate(${Math.random() * 10 - 5}deg)`, // Soft random tilt
      }}
    >
      {emoji}
    </div>
  );
};
