import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="">
      <footer className="absolute bg-[#FCF2F2]  flex justify-between items-center w-full px-8 text-gray-600 text-lg">
        <p className="cursor-pointer hover:text-black transition">
          Let’s Talk 💬
        </p>
        <p className="font-semibold">All Rights Reserved 2025</p>
        <div className="flex gap-6 text-black">
          <FaFacebook
            className="cursor-pointer hover:text-gray-700 transition"
            size={30}
          />
          <FaYoutube
            className="cursor-pointer hover:text-gray-700 transition"
            size={32}
          />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
