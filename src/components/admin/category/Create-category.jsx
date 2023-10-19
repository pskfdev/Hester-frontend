import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Createcategory() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`${import.meta.env.VITE_APP_API}/category/create.php`, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        alert("Insert category " + res.response.category + " Success!!!");
        navigate("/admin/category")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center">
        <button
          onClick={() => navigate("/admin/category")}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-3xl">Create category</h3>
        <form className="my-10" onSubmit={handleSubmit}>
          <div>
            <input
              required
              name="name"
              type="text"
              placeholder="Name category"
              className="input w-full max-w-xs input-bordered"
              onChange={handleChange}
            />
          </div>

          <button
            className="mt-10 btn btn-primary w-full max-w-xs"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createcategory;
