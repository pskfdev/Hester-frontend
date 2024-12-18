import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import bgProduct from "../assets/background/bg-product.jpg";
//Functions
import { listProduct } from "../functions/product";

function RecommendMenu() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    listProduct()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="text-center py-32 text-slate-600">
        <h1 className="text-4xl font-bold">
          Only the Highest Quality Ingredients
        </h1>
        <p className="mt-8">
          In fact, we grow most of them ourselves on our 17-acre farm!
        </p>

        <div className="mt-32 flex flex-col md:flex-row justify-center gap-5 px-10 md:px-0">
          {data?.slice(0, 3).map((item, idx) => (
            <div className="w-100" key={idx}>
              <img
                src={`${import.meta.env.VITE_APP_IMAGE}${item?.image}`}
                alt={item?.title}
                className="w-full h-[400px] object-cover rounded-3xl drop-shadow-md"
              />
            </div>
          ))}
        </div>
        <Link to="/shop">
          <button className="btn btn-md bg-red-300 text-white lg:btn-lg mt-20">
            Shop now
          </button>
        </Link>
      </div>
      <div
        style={{
          backgroundImage: `url(${bgProduct})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen w-100"
      ></div>
    </>
  );
}

export default RecommendMenu;
