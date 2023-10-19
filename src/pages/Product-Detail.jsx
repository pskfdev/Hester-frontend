import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import Vegetable from "../components/product-category/Vegetable";
import Fruit from "../components/product-category/Fruit";

function ProductDetail() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  /* for button */
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(1);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const addCart = () => {
    setDisabled(true);

    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      const found = cart.find((el) => el.id == id);
      if (found) {
        found.count += count;
      } else {
        cart.push({
          ...data,
          count: count
        });
      }
    } else {
      cart.push({
        ...data,
        count: count
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const fetchData = () => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_APP_API}/products/read.php/?id=${id}`)
      .then((res) => {
        setData(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="my-48 container mx-auto px-5 md:px-0">
        <div className="my-10 text-lg font-bold text-slate-500">
          <Link to="/shop">Shop</Link> <span>{">"}</span>{" "}
          <span className="text-black">{data.title}</span>
        </div>

        <div className="w-100 h-3/4 flex flex-col lg:flex-row lg:space-x-4 items-center">
          <div className="w-full">
            <img
              src={`${import.meta.env.VITE_APP_IMAGE}${data.img}`}
              alt={data.title}
              className="mx-auto"
              style={{
                width: "100%",
                height: "700px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="w-100 lg:w-9/12 space-y-8 mt-10 lg:mt-0">
            <div>
              <p className="text-4xl font-bold">{data.title}</p><br />
              <p className="text-xl font-bold">${data.price}</p><br />
              <p className="text-xl">{data.description}</p>
            </div>

            <div className="flex items-center">
              <p className="text-xl me-5">Quantity:</p>
              <button
                className="w-6 h-6 rounded-full text-white bg-gray-400 hover:bg-gray-500"
                onClick={decrement}
              >
                -
              </button>
              <span className="text-2xl font-bold mx-4">{count}</span>
              <button
                className="w-6 h-6 rounded-full text-white bg-indigo-500 hover:bg-indigo-600"
                onClick={increment}
              >
                +
              </button>
            </div>
            <br />
            
            <button
              className="btn btn-primary w-full"
              onClick={addCart}
              disabled={disabled}
            >
              {disabled ? <span className="loading " /> : <p>Add To Cart</p>}
            </button>
          </div>
          {loading && <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>}
        </div>

        <div className="my-40">
          <p className="text-4xl font-bold">You Might Also Like</p>
          {data.category == "vegetable" ? <Vegetable /> : <Fruit />}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
