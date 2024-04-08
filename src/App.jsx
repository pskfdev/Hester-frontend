import { useState, useEffect } from "react";
/* import "./App.css"; */
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="static">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
