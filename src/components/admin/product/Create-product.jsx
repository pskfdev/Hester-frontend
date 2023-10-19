import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Createproduct() {
  const initialState = {
    title: "",
    description: "",
    category: "",
    price: "",
    img: "",
  };

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log(values) */
    const formData = new FormData(); //สร้าง formData เพื่อส่งไปหลังบ้าน
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("img", values.img);

      fetch(`${import.meta.env.VITE_APP_API}/products/create.php`, {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          alert(`Add product ${res.response.title} success!`);
        })
        .catch((err) => {
          console.log(err);
        });
    navigate("/admin/product");
  };

  const fetchCategory = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/category/list.php`)
      .then((res) => {
        setCategory(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* console.log(category); */

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center">
        <button
          onClick={() => navigate("/admin/product")}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-3xl">Create product</h3>
        <form className="my-10" onSubmit={handleSubmit}>
          <div>
            <input
              required
              name="title"
              type="text"
              placeholder="title"
              className="input w-full max-w-xs input-bordered"
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              required
              className="mt-5 select w-full max-w-xs select-bordered"
              onChange={(e) => setValues({ ...values, category: e.target.value })}
            >
              <option value="">
                --please select category--
              </option>
              {category.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              required
              name="price"
              type="number"
              placeholder="Price"
              className="mt-5 input w-full max-w-xs input-bordered"
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              required
              name="description"
              type="text"
              placeholder="Description"
              className="mt-5 textarea textarea-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              /* name="img" */
              type="file"
              className="mt-5 file-input w-full max-w-xs input-bordered"
              onChange={(e) => setValues({ ...values, img: e.target.files[0] })}
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

export default Createproduct;
