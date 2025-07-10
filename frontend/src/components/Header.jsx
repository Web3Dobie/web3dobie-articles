import React from "react";
import hunterLogo from "../assets/hunter_reading.png"; // Ensure this path is correct

const Header = () => (
  <header className="flex flex-col items-center mt-8 mb-6">
    <img
      src={hunterLogo}
      alt="Hunter reading"
      className="w-32 h-auto rounded-full shadow-md mb-2"
    />
    <h1 className="text-2xl font-bold text-white">Web3Dobie Articles</h1>
  </header>
);

export default Header;
