import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../store/cartSlice";
//Functions
import { deleteCart, listCart } from "../functions/cart";

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
    window.scrollTo(0, 0);
  }, [numcount]);

  return (
    <>
      {/* List product */}
      <div className="my-52 container mx-auto">
        <h2 className="text-center text-3xl my-10">
          Cart : {cart ? cart.length : ""} product
        </h2>
        <div className="grid lg:grid-cols-2 gap-0 md:gap-4 space-y-10 md:space-y-0">
          <div>
            <h4 className="text-center text-3xl py-3 bg-green-200 rounded-md">
              List product
            </h4>
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
                      <td>
                        <Link to={`/shop/${item?.productId}`}>{item?.product?.title}</Link>
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
          <div className="w-full text-2xl border border-yellow-200 h-fit rounded-md">
            <h4 className="text-center text-3xl py-3 bg-yellow-200">Summary</h4>
            <div className="px-10 space-y-5 py-10">
              {data &&
                data?.map((item, idx) => (
                  <p key={idx}>
                    {item?.product?.title} x {item?.quantity} = {item?.price}
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
    </>
  );
}

export default Cart;
