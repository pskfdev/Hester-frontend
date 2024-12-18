import React from "react";
import cucumber from "../assets/product/cucumber.jpeg";
import bitter from "../assets/product/bitter.jpeg";
import Brussels from "../assets/product/Brussels-sprouts.jpeg";
import { Link } from "react-router-dom";

function Subscribe() {
  return (
    <div className="py-20">
      <div className="text-center text-slate-600">
        <h1 className="text-4xl font-bold">What’s the Dill?</h1>
        <p className="my-10">
          Sign up with your email address to receive news and updates.
        </p>
        <Link to="/blog" className="btn btn-md bg-red-300 text-white lg:btn-lg">Subcribe</Link>
      </div>

      <div className="mt-36 flex justify-center px-10 gap-x-4 md:gap-x-8">
        <div>
          <img src={cucumber} alt="cucumber" />
        </div>
        <div>
          <img src={bitter} alt="bitter" />
        </div>
        <div>
          <img src={Brussels} alt="Brussels" />
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
