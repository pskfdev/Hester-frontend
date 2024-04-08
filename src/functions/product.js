import axios from "axios";

export const listProduct = async () => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}/products/list.php`
  );
};

export const readProduct = async (id) => {
  return await axios(
    `${import.meta.env.VITE_APP_API}/products/read.php/?id=${id}`
  );
};

export const createProduct = async (values) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/products/create.php`,
    {
      method: "POST",
      body: values,
    }
  );
};

export const updateProduct = async (id, values) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/products/update.php/?id=${id}`, {
    method: "POST",
    body: values,
  })
};

export const deleteProduct = async (id) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/products/delete.php/?id=${id}`, {
    method: "POST",
    body: JSON.stringify({ id: id }),
  })
};
