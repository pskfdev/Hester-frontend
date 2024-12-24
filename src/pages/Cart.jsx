import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../store/cartSlice";
//Functions
import { deleteCart, listCart } from "../functions/cart";
import { BsFillBasket2Fill } from "react-icons/bs";

function Cart() {
  const [data, setData] = useState([]);
  const [numcount, setNumcount] = useState();
  const token = localStorage.getItem("token");

  /* Redux */
  const cart = useSelector((state) => state.cartStore.cart);
  const dispatch = useDispatch();

  const fetchData = () => {
    listCart(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("fetch data fail!" + err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure remove!")) {
      deleteCart(token, id)
        .then((res) => {
          const result = cart.filter((item) => item.id != res.data.id);

          dispatch(updateCart(result));
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const sumTotal = () => {
    if (data.length != 0) {
      return data.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.price;
      }, 0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [numcount]);

  return (
    <>
      {/* List product */}
      <div className="py-52 container mx-auto">
        {/* Header */}
        <div className=" flex flex-col items-center mb-20 relative">
          <h1 className="w-full text-center uppercase flex justify-center items-center">
            <BsFillBasket2Fill size={35} className="mr-2 -rotate-12" /> Cart :{" "}
            <span className="text-rose-500 ms-2 tracking-wide">
              {cart ? cart.length : ""} product
            </span>
          </h1>
          <div className="w-[150px] mt-5 border-b-4 border-rose-400 rounded-xl"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 md:gap-4 space-y-10 md:space-y-0">
          <div>
            <h3 className="text-center py-3 text-slate-200 bg-rose-400 rounded-md tracking-wide">
              List product
            </h3>
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th className="hidden md:flex">Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data?.map((item, idx) => (
                    <tr key={idx} className="text-center">
                      <td>{idx}</td>
                      <td className="hidden md:flex">
                        <img
                          src={`${import.meta.env.VITE_APP_IMAGE}${
                            item?.product?.image
                          }`}
                          className="w-24 mx-auto rounded-md"
                        />
                      </td>
                      <td className="first-letter:uppercase text-slate-600">
                        <Link to={`/shop/${item?.productId}`}>
                          {item?.product?.title}
                        </Link>
                      </td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
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

          {/* Summary */}
          <div className="w-full text-2xl h-fit border-b-2 text-slate-600 border-slate-600">
            <h3 className="text-center py-3 text-slate-200 bg-slate-600 tracking-wide rounded-md">
              Summary
            </h3>
            <div className="px-10 space-y-5 py-10 border-x-2 border-slate-600">
              {data &&
                data?.map((item, idx) => (
                  <p key={idx} className="flex items-center text-slate-500 first-letter:uppercase">
                    {item?.product?.title} <span className="text-sm mx-2 text-slate-500">x</span>{" "}
                    {item?.quantity} = {item?.price} ฿
                  </p>
                ))}
              <hr className="border-slate-600" />
              <div className="flex justify-between">
                <p>Total : {sumTotal()} ฿</p>
                <button
                  className="btn btn-neutral"
                  disabled={token ? "" : "disabled"}
                >
                  {token ? <p>Pay now</p> : <p>Login Please</p>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
