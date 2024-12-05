import axios from "axios";

export const createWishlists = async (token, productId) => {
  return await axios.post(
    `${import.meta.env.VITE_APP_API}/wishlist`,
    { productId: productId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const listWishlist = async (token) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}/wishlist`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteWishlists = async (token, wishlistId) => {
  return await axios.delete(
    `${import.meta.env.VITE_APP_API}/wishlist`,
    { wishlistId: wishlistId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
