import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addWishlist, removeWistlist } from "../store/wishlistSlice";
import { createWishlists, deleteWishlists } from "../functions/wishlist";

function ButtonWishlist() {
  const [like, setLike] = useState(false);
  
  const userStore = useSelector((state) => state.userStore.user)
  const wishlistStore = useSelector((state) => state.wishlistStore)
  const dispatch = useDispatch();
  let { id } = useParams();
  const idtoken = localStorage.token;


  const checkLike = () => {
    if (wishlistStore.product_id) {
      const found = wishlistStore.product_id.includes(id);

      if (found) {
        setLike(true);
      } else {
        setLike(false);
      }
    } else {
      setLike(false);
    }
  };

  const createWishlist = () => {
    if (!idtoken) {
      return alert("Please log in.")
    }

    setLike(true)
    createWishlists(id, userStore.username)
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        dispatch(addWishlist(res.response.product_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWishlist = () => {
    setLike(false)
    const oldProductId = wishlistStore.product_id

    deleteWishlists(id, userStore.username)
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        const result = oldProductId.filter(id => id !== res.response.product_id);
        dispatch(removeWistlist(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkLike();
  }, [id]);

  return (
    <div className="flex items-center">
      <p className="text-xl me-5">Favorite :</p>
      <div className="cursor-pointer text-red-700">
        {like ? (
          <FaHeart size={25} onClick={deleteWishlist} />
        ) : (
          <FaRegHeart size={25} onClick={createWishlist} />
        )}
      </div>
    </div>
  );
}

export default ButtonWishlist;
