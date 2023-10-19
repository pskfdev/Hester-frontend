import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingtoRedirect from "./LoadingtoRedirect";

function AdminRoute({ children }) {
  const [admin, setAdmin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    /* check stor user && check user.token */

    if (token) {
      fetch(`${import.meta.env.VITE_APP_API}/users/current-user.php`, {
        method: "POST",
        body: JSON.stringify({token:token}),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          if (res.response.role == "admin") {
            setAdmin(true)
          } else {
            setAdmin(false)
          }
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
