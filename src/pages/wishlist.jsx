import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Functions
import { deleteWishlists, listWishlist } from "../functions/wishlist";
import { BsFillBalloonHeartFill } from "react-icons/bs";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { removeWistlist } from "../store/wishlistSlice";
import { addCart, updateCart } from "../store/cartSlice";
import { createCart, editCart } from "../functions/cart";


function wishlist() {
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [count, setCount] = useState(1);
  const idtoken = localStorage.token;

  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlistStore);
  const cart = useSelector((state) => state.cartStore.cart); /* [] */

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

  const addCarts = (productId, price) => {
    /* ถ้ายังไม่มีข้อมูลใน cart หรือ ใน cart ยังไม่มี productId นี้ */
    if (
      cart.length == 0 ||
      cart.filter((item) => item.productId == productId).length == 0
    ) {
      createCart(idtoken, { productId: productId, quantity: 1, price: price })
        .then((res) => {
          dispatch(addCart(res.data));
        })
        .catch((err) => {
          console.log("Create cart fail!" + err);
        });

      return;
    }

    /* ถ้ามี productId นี้ใน cart ให้เข้า function editCart */
    /* ดึง cart จาก redux เพื่อเอา id cart */
    const found = cart.filter((item) => item.productId == productId);

    editCart(idtoken, {
      cartId: found[0].id,
      productId: productId,
      quantity: parseInt(found[0].quantity) + 1,
      price: 1 * parseInt(price) + parseInt(found[0].price),
    })
      .then((res) => {
        /* ถ้าใน cart มี productId อื่นอยู่ด้วยให้ filter ข้อมูลเก่าออกมาพร้อมกับเพิ่มข้อมูลใหม่ */
        if (cart.filter((item) => item.productId != productId).length > 0) {
          /* Update ข้อมูลเก่า */
          dispatch(
            updateCart(
              cart.filter((item) => item.productId != res.data.productId)
            )
          );

          /* Update ข้อมูลใหม่ที่แก้ไขแล้ว */
          dispatch(addCart(res.data));
        } else {
          dispatch(updateCart([res.data]));
        }
      })
      .catch((err) => {
        console.log("Update cart fail!" + err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full grow my-52 container mx-auto">

        {/* Header */}
        <div className=" flex flex-col items-center mb-20 relative">
          <h1 className="w-full text-center uppercase flex justify-center items-center">
            <BsFillBalloonHeartFill size={30} className="mr-2 -rotate-12" /> My{" "}
            <span className="text-rose-500 ms-2 tracking-wider">Wishlist</span>
          </h1>
          <div className="w-[80px] mt-5 border-b-4 border-rose-400 rounded-xl"></div>
        </div>

        {data.length != 0 ? (
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
                    className="w-40 mx-auto rounded-md"
                  />
                </div>
                <Link
                  to={`/shop/${item?.productId}`}
                  className="flex flex-col space-y-3 w-64 font-semibold text-slate-600"
                >
                  <p className="first-letter:uppercase">{item?.product?.title}</p>
                  <p>{item?.product?.price} ฿</p>
                </Link>
                <div className="space-x-5">
                  <button
                    className="btn btn-outline btn-success z-10"
                    disabled={disable}
                    onClick={() =>
                      addCarts(item?.productId, item?.product?.price)
                    }
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
