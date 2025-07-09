import React from "react";
import hunterLogo from "../assets/hunter_reading.png"; // Add this to your `src/assets/` folder

const Header = () => (
  <header className="site-header">
    <img src={hunterLogo} alt="Hunter reading" className="logo" />
    <h1>Web3Dobie Articles</h1>
  </header>
);

export default Header;
