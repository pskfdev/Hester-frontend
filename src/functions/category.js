import axios from "axios";

export const listCategory = async () => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}/category/list.php`
  );
};

export const createCategory = async (values) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/category/create.php`, {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateCategory = async (id, values) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/category/update.php/?id=${id}`,
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );
};

export const deleteCategory = async (id) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/category/delete.php/?id=${id}`,
    {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    }
  );
};
