import React from "react";
import hunterLogo from "../assets/hunter_reading.png";

const Header = () => (
  <header className="text-center py-6">
    <img
      src={hunterLogo}
      alt="Hunter reading"
      className="mx-auto w-32 md:w-40 lg:w-48 rounded-full shadow"
    />
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-4">
      Web3Dobie Articles
    </h1>
  </header>
);

export default Header;
