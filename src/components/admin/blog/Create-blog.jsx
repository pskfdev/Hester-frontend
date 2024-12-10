import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Functions
import { createBlog } from "../../../functions/blog";

function Createblog() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* สำหรับการ upload file ต้องใช้ FormData() ในการส่ง */
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image);

    createBlog(formData)
      .then((res) => {
        alert("Insert blog " + res.data.name + " Success!!");
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
          <div>
            <input
              required
              name="image"
              type="file"
              className="mt-5 file-input file-input-bordered w-full max-w-xs"
              onChange={(e) =>
                setValues({ ...values, image: e.target.files[0] })
              }
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

export default Createblog;
