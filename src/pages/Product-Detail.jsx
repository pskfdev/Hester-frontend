import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//Functions
import { readProduct } from "../functions/product";
import { createCart, editCart } from "../functions/cart";
//Components
import Vegetable from "../components/product-category/Vegetable";
import Fruit from "../components/product-category/Fruit";
import ButtonWishlist from "../components/Button-wishlist";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { addCart, updateCart } from "../store/cartSlice";

function ProductDetail() {
  let { id } = useParams();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const idtoken = localStorage.token;
  /* Redux */
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartStore.cart); /* [] */

  /* for button Quantity and button add cart */
  const [count, setCount] = useState(1);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const addCarts = () => {
    /* ถ้ายังไม่มีข้อมูลใน cart หรือ ใน cart ยังไม่มี productId นี้ */
    if (cart.length == 0 || cart.filter((item) => item.productId == id).length == 0) {
      createCart(idtoken, { productId: id, quantity: count, price: data.price })
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
    const found = cart.filter((item) => item.productId == id);

    editCart(idtoken, {
      cartId: found[0].id,
      productId: id,
      quantity: parseInt(found[0].quantity) + count,
      price: count * parseInt(data.price) + parseInt(found[0].price),
    })
      .then((res) => {
        /* ถ้าใน cart มี productId อื่นอยู่ด้วยให้ filter ข้อมูลเก่าออกมาพร้อมกับเพิ่มข้อมูลใหม่ */
        if (cart.filter((item) => item.productId != id).length > 0) {
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
                borderRadius: "20px",
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
              onClick={addCarts}
              disabled={idtoken ? false : true}
            >
              <p>Add To Cart</p>
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
