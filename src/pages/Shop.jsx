import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Functions
import { listCategory } from "../functions/category";
import { listProduct } from "../functions/product";
import { FiBookOpen } from "react-icons/fi";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { CiLemon } from "react-icons/ci";

function Shop() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [activeMenu, setActiveMenu] = useState("all");
  const [filter, setFilter] = useState([]); /* keep data filter */

  const SelectCategory = (name) => {
    const updateItems = data.filter((item) => {
      return item.category.name == name;
    });
    setFilter(updateItems);
    setActiveMenu(name);
  };

  const fetchCategory = () => {
    listCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = () => {
    setLoading(true);

    listProduct()
      .then((res) => {
        setData(res.data);
        setFilter(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategory();
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto w-full my-20 relative grow">
        <div className="w-full flex flex-col lg:flex-row pt-44 ps-10 relative">
          {/* Header */}
          <div className="pb-44 lg:pb-0">
            <h1 className="w-full text-center uppercase flex justify-center items-center">
              <CiLemon size={35} className="mr-1 -rotate-90" />{" "}
              Pro
              <span className="text-rose-500 tracking-wide">
                Ducts
              </span>
            </h1>
          </div>

          {/* Menu category */}
          <div className="tabs tabs-boxed w-fit uppercase bg-slate-200 drop-shadow-lg mt-[90px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <a
              className={`tab ${"all" == activeMenu && "tab-active"}`}
              onClick={() => {
                setFilter(data);
                setActiveMenu("all");
              }}
            >
              all
            </a>
            {category &&
              category.map((item, idx) => (
                <a
                  key={item.id}
                  className={`tab ${item.name == activeMenu && "tab-active"}`}
                  onClick={() => SelectCategory(item.name)}
                >
                  {item.name}
                </a>
              ))}
          </div>
        </div>

        {/* show products */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 px-10 drop-shadow-md">
          {filter ? (
            filter.map((item, idx) => (
              <Link to={`/shop/${item.id}`} key={item.id}>
                <img
                  src={`${import.meta.env.VITE_APP_IMAGE}/${item?.image}`}
                  alt={item?.title}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
                <div className="text-center mt-5 text-slate-600">
                  <h3 className="text-3xl">{item?.title}</h3>
                  <p className="mt-3 text-lg">${item?.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center">No, Data product..</p>
          )}
          {loading && (
            <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
