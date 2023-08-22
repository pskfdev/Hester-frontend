import React from "react";
import { Link } from "react-router-dom";
import bgHeader from "../assets/background/bg-head.jpg";

function Header() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgHeader})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen w-100 flex justify-center items-center align-center"
    >
      <div className="text-center">
        <h1 className="text-6xl text-white font-bold">Pickle Perfection</h1><br />
        <Link to="/shop" className="btn btn-md lg:btn-lg mx-0">Shop now</Link>
      </div>
    </div>
  );
}

export default Header;
