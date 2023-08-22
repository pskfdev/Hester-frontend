import React, {useState, useEffect} from "react";
import axios from "axios";

function Register({ handleClose, handleLogin }) {

  const [value, setValue] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log(value); */

    if (value.password !== value.password2) {
      alert("Password not match");
    } else {
      axios.post(`${import.meta.env.VITE_APP_API}/users/register.php`, value)
        .then((res) => {
          console.log(res.data);
          alert("Register user " + res.data.response.username + " success!!");
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
            name="username"
            type="text"
            placeholder="Create username"
            className="input w-full max-w-xs"
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
