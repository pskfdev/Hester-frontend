import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/Header";
import RecommendMenu from "../components/Recommend-menu";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-100 bg-base-100">
      <Navbar />
      <Header />

      <RecommendMenu />
      <Subscribe />
      <Footer />
    </div>
  );
}

export default Home;
