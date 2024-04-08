import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

function Editproduct() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    img: "",
    imgNew: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("img", values.img);
    formData.append("imgNew", values.imgNew);

    updateProduct(id, formData)
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        alert("Update product " + res.response.title + " Success!!!");
        navigate("/admin/product");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = () => {
    readProduct(id)
      .then((res) => {
        setValues({ ...values, img: res.data.response.img });
        setData(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCategory = () => {
    listCategory()
      .then((res) => {
        setCategory(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
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
        <h3 className="text-3xl">Edit product</h3>
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
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            >
              <option value="">--please select category--</option>
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
              /* name="img" */
              type="file"
              className="mt-5 file-input w-full max-w-xs input-bordered"
              onChange={(e) =>
                setValues({ ...values, imgNew: e.target.files[0] })
              }
            />
          </div>

          <button
            className="mt-10 btn btn-primary w-full max-w-xs"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Editproduct;
