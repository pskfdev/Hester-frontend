import axios from "axios";

export const listUser = async () => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API}/users/list.php`
  );
};

export const DeleteUser = async (id) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/users/delete.php/?id=${id}`,
    {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    }
  );
};

export const changeRole = async (id, values) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/users/change-role.php/?id=${id}`, {
    method: "POST",
    body: JSON.stringify(values),
  })
};
