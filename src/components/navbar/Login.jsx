import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
/* Redux */
import { useDispatch } from "react-redux";
import { signin } from "../../store/userSlice";
import { addWishlist } from "../../store/wishlistSlice";
/* Functions */
import { login } from "../../functions/auth";

function Login({ handleClose, handleRegis }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

    login(value)
      .then((res) => {
        const { payload, token } = res.data

        setLoading(false);
        alert(" Login success user : " + payload.username);
        roleRedirect(payload.role);

        dispatch(signin(payload));
        dispatch(addWishlist(payload.wishlists));
        localStorage.setItem("token", token);

        handleClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Login Fail!!");
        setLoading(false);
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
