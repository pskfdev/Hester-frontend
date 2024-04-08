export const listWishlist = async (token) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/wishlist/list.php`, {
    method: "POST",
    body: JSON.stringify({ token: token }),
  })
};

export const createWishlists = async (id, user) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/wishlist/create.php/?id=${id}`,
    {
      method: "POST",
      body: JSON.stringify({ username: user }),
    }
  )
};

export const deleteWishlists = async (id, user) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/wishlist/delete.php/?id=${id}`,
    {
      method: "POST",
      body: JSON.stringify({ username: user }),
    }
  )
};
