import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-white">
      <a className="btn btn-ghost text-4xl text-[#F55E61]">MoodVerse</a>
      <div className="flex-1"></div>
      <div className="flex space-x-4">
        <a href="/privacy-policy" className="btn btn-ghost text-md text-black">
          Privacy Policy
        </a>
        <a href="/about-us" className="btn btn-ghost text-md text-black">
          About Us
        </a>
      </div>
    </div>
  );
};

export default Navbar;
