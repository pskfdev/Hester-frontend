import axios from "axios";

export const listUser = async (token) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}/user`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const readUser = async (token, id) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}/user/${id}`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateName = async (token, id, name) => {
  return await axios.put(
    `${import.meta.env.VITE_APP_API}/user/${id}`,
    {
      name: name,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const DeleteUser = async (token, id) => {
  return await axios.delete(
    `${import.meta.env.VITE_APP_API}/user/${id}`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changePassword = async (token, id, newPassword) => {
  return await axios.put(
    `${import.meta.env.VITE_APP_API}/change-password/${id}`,
    { newPassword: newPassword },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changeRole = async (token, id, role) => {
  return await axios.put(
    `${import.meta.env.VITE_APP_API}/change-role/${id}`,
    { role: role },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
