import React, { useEffect } from "react";
//Components
import Header from "../components/Header";
import RecommendMenu from "../components/Recommend-menu";
import Subscribe from "../components/Subscribe";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full">
      <Header />

      <RecommendMenu />
      <Subscribe />
    </div>
  );
}

export default Home;
