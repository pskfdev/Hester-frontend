import React, { useState, useEffect } from "react";

//Functions
import { register } from "../../functions/auth";

function Register({ handleClose, handleLogin }) {
  const [value, setValue] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.password !== value.password2) {
      alert("Password not match");
    } else {
      register(value)
        .then(function (res) {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          alert("Register Fail!!");
        });
      e.target.reset();
    }
  };

  return (
    <div className="modal modal-open text-black">
      <div className="modal-box text-center">
        <button
          onClick={handleClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-3xl text-slate-600">Register</h3>
        <form className="mt-5" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input w-full max-w-xs"
            onChange={handleChange}
          />
          <input
            name="username"
            type="text"
            placeholder="Create username"
            className="mt-5 input w-full max-w-xs"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Create password"
            className="mt-5 input w-full max-w-xs"
            onChange={handleChange}
          />
          <input
            name="password2"
            type="password"
            placeholder="Re-type Password"
            className="mt-5 input w-full max-w-xs"
            onChange={handleChange}
          />
          <button className="mt-5 btn btn-primary w-full max-w-xs">
            Submit
          </button>
        </form>
        <button className="btn btn-link" onClick={handleLogin}>
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}

export default Register;
