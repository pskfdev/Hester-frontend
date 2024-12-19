import React from "react";
import { FiFeather } from "react-icons/fi";
//Components
import bgProduct from "../assets/background/bg-product.jpg";


function About() {

  return (
    <>
      <div className="w-full py-20 text-slate-600">
        <div className="w-full lg:w-2/4 mx-auto py-52 px-5 lg:px-0">
      
          {/* Header */}
          <div className="flex flex-col relative w-fit text-black">
            <h1 className="uppercase flex items-center">
              <FiFeather size={35} className="mr-2 -rotate-90" /> Our{" "}
              <span className="text-rose-500 ms-2 tracking-wider">Story</span>
            </h1>
          </div>

          <p className="mt-5 text-2xl">
            Since 2005, Hester has done more than refine an old tradition.
            Guided by an international palate, we fuse unique pickling
            techniques from around the world to create the most interesting
            flavors and textures.
          </p>
          <p className="mt-5 text-2xl">
            Hester makes everything in small batches from our home base in New
            York. To achieve optimal flavor, our products age from three weeks
            to four months, making every pickle worth your patience.
          </p>
        </div>

        <div
          style={{
            backgroundImage: `url(${bgProduct})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-screen w-full shadow-2xl"
        ></div>

        <div className="w-100 lg:w-2/4 mx-auto my-60 px-5 lg:px-0">
          <h1 className="text-4xl font-bold">
            Hester produces fresh, organic produce from local farmers in New
            York. Even our spices are fresh. Just because pickling is a
            preservation process doesn’t mean you can use dried-up thyme or
            week-old asparagus that’s already a little spongy.
          </h1>
          <p className="mt-10 text-2xl">
            We want to give our customers crisp, crunchy and delicious pickled
            vegetables and fruits. Most of all, we want to expand people’s
            palates and prove that pickles don’t always come in a green or red
            variety.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
