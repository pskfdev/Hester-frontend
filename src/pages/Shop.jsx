import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Functions
import { listCategory } from "../functions/category";
import { listProduct } from "../functions/product";

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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      <div className="container mx-auto w-100 my-20 relative grow">
        {/* Menu category */}
        <div className="tabs tabs-boxed w-fit mx-auto mt-44 uppercase">
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

        {/* show products */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 px-10">
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
                    borderRadius: "20px"
                  }}
                />
                <div className="text-center mt-5">
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
