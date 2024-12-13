import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
/* Redux */
import { useSelector, useDispatch } from "react-redux";
import { addWishlist, removeWistlist } from "../store/wishlistSlice";
import { createWishlists, deleteWishlists } from "../functions/wishlist";

function ButtonWishlist() {
  
  const { wishlist } = useSelector((state) => state.wishlistStore)
  const dispatch = useDispatch();
  let { id } = useParams();
  const idtoken = localStorage.token;
  
  const createWishlist = () => {
    if (!idtoken) {
      return alert("Please login.")
    }
    
    createWishlists(idtoken, id)
      .then((res) => {
        /* เพิ่ม wishlist ใหม่เข้าไปใน obj เดิม แล้วค่อย dispatch */
        dispatch(addWishlist(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWishlist = () => {
    
    const allWishlist = wishlist /* wishlist ทั้งหมดใน Redux */
    const productRemove = allWishlist.filter((item) => item.productId == id) /* wishlist ที่ต้องการลบ [{...}] */

    deleteWishlists(idtoken, productRemove[0].id)
      .then((res) => {
        const result = allWishlist.filter(item => item.id !== res.data.id);
        dispatch(removeWistlist(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="flex items-center">
      <p className="text-xl me-5">Favorite :</p>
      <div className="cursor-pointer text-red-700">
        {wishlist?.filter((item) => item.productId == id).length > 0 ? (
          <FaHeart size={25} onClick={deleteWishlist} />
        ) : (
          <FaRegHeart size={25} onClick={createWishlist} />
        )}
      </div>
    </div>
  );
}

export default ButtonWishlist;
