import axios from "axios";

export const createBlog = async (value) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}/blog`, value);
};

export const listBlog = async () => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/blog`);
};

export const readBlog = async (id) => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/blog/${id}`);
};

export const updateBlog = async (id, value) => {
  return await axios.put(`${import.meta.env.VITE_APP_API}/blog/${id}`, value);
};

export const deleteBlog = async (id) => {
  return await axios.delete(`${import.meta.env.VITE_APP_API}/blog/${id}`);
};
