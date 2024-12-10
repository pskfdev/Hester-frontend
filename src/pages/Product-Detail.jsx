import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//Functions
import { readProduct } from "../functions/product";
//Components
import Vegetable from "../components/product-category/Vegetable";
import Fruit from "../components/product-category/Fruit";
import ButtonWishlist from "../components/Button-wishlist";

function ProductDetail() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const idtoken = localStorage.token;

  /* for button Quantity and button add cart */
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
          count: count,
        });
      }
    } else {
      cart.push({
        ...data,
        count: count,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const fetchData = () => {
    setLoading(true);

    readProduct(id)
      .then((res) => {
        setData(res.data);
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
      <div className="my-48 container mx-auto px-5 md:px-0">
        <div className="my-10 text-lg font-bold text-slate-500">
          <Link to="/shop">Shop</Link> <span>{">"}</span>{" "}
          <span className="text-black">{data?.title}</span>
        </div>

        <div className="w-100 h-3/4 flex flex-col lg:flex-row lg:space-x-10 items-center">
          <div className="w-full">
            <img
              src={`${import.meta.env.VITE_APP_IMAGE}${data?.image}`}
              alt={data?.title}
              className="mx-auto"
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "20px"
              }}
            />
          </div>

          <div className="w-100 lg:w-9/12 space-y-8 mt-10 lg:mt-0">
            <div>
              <p className="text-4xl font-bold uppercase">{data?.title}</p>
              <br />
              <p className="text-xl font-bold">${data?.price}</p>
              <br />
              <p className="text-xl">{data?.description}</p>
            </div>

            <div>
              <ButtonWishlist id={id} />
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
              disabled={idtoken ? disabled : true}
            >
              {disabled ? <span className="loading" /> : <p>Add To Cart</p>}
            </button>
          </div>
          {loading && (
            <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>
          )}
        </div>

        <div className="my-40">
          <p className="text-4xl font-bold">You Might Also Like</p>
          {data?.category?.name == "vegetable" ? <Vegetable /> : <Fruit />}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
