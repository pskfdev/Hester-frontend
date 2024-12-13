import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Functions
import { deleteWishlists, listWishlist } from "../functions/wishlist";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { removeWistlist } from "../store/wishlistSlice";

function wishlist() {
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [count, setCount] = useState(1);
  const idtoken = localStorage.token;

  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlistStore);

  const fetchData = () => {
    listWishlist(idtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Get wishlist fail!" + err);
      });
  };

  const deleteWishlist = (id) => {
    deleteWishlists(idtoken, id)
      .then((res) => {
        const result = wishlist.filter((item) => item.id != res.data.id);
        dispatch(removeWistlist(result));

        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCart = (id) => {
    setDisable(true);

    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      const found = cart.find((el) => el.id == id);
      if (found) {
        found.count += count;
      } else {
        cart.push({
          ...data.find((item) => item.product_id == id),
          count: count,
        });
      }
    } else {
      cart.push({
        ...data.find((item) => item.product_id == id),
        count: count,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => {
      setDisable(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-100 grow my-52 container mx-auto">
        <h2 className="text-center text-3xl my-10 py-5 bg-red-100">
          My wishlist
        </h2>
        {data ? (
          data.map((item) => {
            return (
              <div
                className="hover:bg-slate-50 border-y flex flex-col mx-auto items-center my-5 py-5 text-center space-y-5 md:flex-row justify-around"
                key={item.id}
              >
                <div>
                  <img
                    src={`${import.meta.env.VITE_APP_IMAGE}${
                      item?.product?.image
                    }`}
                    alt={item?.title}
                    className="w-40 mx-auto"
                  />
                </div>
                <Link
                  to={`/shop/${item?.productId}`}
                  className="flex flex-col space-y-3 w-64 text-lg"
                >
                  <p>{item?.product?.title}</p>
                  <p>${item?.product?.price}</p>
                </Link>
                <div className="space-x-5">
                  <button
                    className="btn btn-outline btn-success z-10"
                    disabled={disable}
                    onClick={() => addCart(item?.productId)}
                  >
                    {disable ? (
                      <span className="loading " />
                    ) : (
                      <p>Add To Cart</p>
                    )}
                  </button>
                  <button
                    onClick={() => deleteWishlist(item?.id)}
                    className="btn btn-outline btn-error z-10"
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-3xl">No, Products</p>
        )}
      </div>
    </div>
  );
}

export default wishlist;
