import axios from "axios";

export const listBlog = async () => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/blog/list.php`);
};

export const readBlog = async (id) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}/blog/read.php/?id=${id}`
  );
};

export const createBlog = async (values) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/blog/create.php`, {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateBlog = async (id, values) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/blog/update.php/?id=${id}`,
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );
};

export const deleteBlog = async (id) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/blog/delete.php/?id=${id}`, {
    method: "POST",
  })
};
