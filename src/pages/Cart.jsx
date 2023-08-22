import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { FiTrash2 } from "react-icons/fi";

function Cart() {
  const [numcount, setNumcount] = useState();
  let cart = JSON.parse(localStorage.getItem("cart"));
  const token = localStorage.getItem("token");

  const handleRemove = (id) => {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        alert(`Remove product ${cart[i].title} success!`);
        cart.splice(i, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    let itemCart = JSON.parse(localStorage.getItem("cart"));
    setNumcount(itemCart.length);
  };

  const sumTotal = () => {
    if (cart) {
      return cart.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0);  
    }
    
  };

  useEffect(() => {
    /* if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    } */
    window.scrollTo(0, 0);
  }, [numcount]);

  return (
    <>
      <Navbar />

      <div className="my-52 container mx-auto ">
        <h2 className="text-center text-3xl my-10">
          Cart : {cart ? cart.length : ""} product
        </h2>
        <div className="grid lg:grid-cols-2 gap-0 md:gap-4">
          <div className="w-100">
            <h4 className="text-center text-3xl py-3 bg-green-200">
              List product
            </h4>
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart ? (
                  cart.map((item, idx) => (
                    <tr key={idx} className="text-center">
                      <td>{idx}</td>
                      <td>
                        <img
                          src={`${import.meta.env.VITE_APP_IMAGE}${item.img}`}
                          className="w-24 mx-auto"
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.count}</td>
                      <td>
                        <FiTrash2
                          role="button"
                          className="text-error mx-auto"
                          onClick={() => handleRemove(item.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No products in the cart...</p>
                )}
              </tbody>
            </table>
          </div>

          <div className="w-full text-2xl border border-yellow-200 h-fit">
            <h4 className="text-center text-3xl py-3 bg-yellow-200">Summary</h4>
            <div className="px-10 space-y-5 py-10">
              {cart && cart.map((item, idx) => (
                <p key={idx}>
                  {item.title} x {item.count} = {item.price * item.count}
                </p>
              ))}
              <hr className="border-yellow-200" />
              <div className="flex justify-between">
                <p>Total : {sumTotal()}</p>
                <button
                  className="btn btn-warning"
                  disabled={token ? "" : "disabled"}
                >
                  {token ? <p>Pay now</p> : <p>Login Please</p>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
