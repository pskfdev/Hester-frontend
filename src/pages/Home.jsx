import React, { useEffect } from "react";
import Header from "../components/Header";
import RecommendMenu from "../components/Recommend-menu";
import Subscribe from "../components/Subscribe";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-100 bg-base-100">
      <Header />

      <RecommendMenu />
      <Subscribe />
    </div>
  );
}

export default Home;
