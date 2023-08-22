import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ handleClose, handleRegis }) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_APP_API}/users/login.php`, value)
      .then((res) => {
        setLoading(false);
        alert(" Login success user : " + res.data.response.username);
        roleRedirect(res.data.response.role)
        localStorage.setItem("token", res.data.response.token);
        localStorage.setItem("username", res.data.response.username);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Login Fail!!");
      });
  };


  return (
    <div className="modal modal-open">
      <div className="modal-box text-center text-black">
        <button
          onClick={handleClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-3xl text-slate-600">Login</h3>
        <form className="mt-5" onSubmit={handleSubmit}>
          <input
            required
            name="username"
            type="text"
            placeholder="Username"
            className="input w-full max-w-xs"
            onChange={handleChange}
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="mt-5 input w-full max-w-xs"
            onChange={handleChange}
          />
          <button
            className="mt-5 btn btn-primary w-full max-w-xs"
            type="submit"
            /* onClick={handleSubmit} */
          >
            {loading ? <span className="loading " /> : <>sign in</>}
          </button>
        </form>

        <button className="btn btn-link" onClick={handleRegis}>
          create account
        </button>
      </div>
    </div>
  );
}

export default Login;
