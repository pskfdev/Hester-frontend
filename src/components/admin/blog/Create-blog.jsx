import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../../functions/blog";

function Createblog() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createBlog(values)
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        alert("Insert blog " + res.response.name + " Success!!");
        navigate("/admin/blog")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center">
        <button
          onClick={() => navigate("/admin/blog")}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-3xl">Create blog</h3>
        <form className="my-10" onSubmit={handleSubmit}>
          <div>
            <input
              required
              name="name"
              type="text"
              placeholder="Name blog"
              className="input w-full max-w-xs input-bordered"
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              required
              name="description"
              placeholder="Description"
              className="mt-5 textarea textarea-bordered w-full max-w-xs"
              onChange={handleChange}
            ></textarea>
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

export default Createblog;
