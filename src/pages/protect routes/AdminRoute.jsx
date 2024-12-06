import React, { useState, useEffect } from "react";

//Components
import LoadingtoRedirect from "./LoadingtoRedirect";

//Functions
import { currentAdmin  } from "../../functions/auth";

function AdminRoute({ children }) {
  const [admin, setAdmin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    /* check stor user && check user.token */

    if (token) {
      currentAdmin(token)
        .then((res) => {
          if (res.data.role == "admin") {
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
