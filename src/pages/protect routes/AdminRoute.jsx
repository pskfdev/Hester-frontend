import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingtoRedirect from "./LoadingtoRedirect";

function AdminRoute({ children }) {
  const [value, setValue] = useState({
    token: "",
  });
  const [admin, setAdmin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    /* check stor user && check user.token */
    if (token) {
        setValue({ ...value, token: token });

        axios.post(`${import.meta.env.VITE_APP_API}/users/login.php`, value)
        .then((res) => {
          setAdmin(true);
        })
        .catch((err) => {
          console.log(err);
          setAdmin(false);
        });
    }
  }, [token]);

  return admin ? children : <LoadingtoRedirect />;
}

export default AdminRoute;
