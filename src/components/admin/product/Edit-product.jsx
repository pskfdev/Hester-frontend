import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
//Functions
import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

function Editproduct() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [category, setCategory] = useState([]);
  const [values, setValues] = useState({
    title: "",
    categoryId: "",
    price: "",
    description: "",
    image: "",
    imageOld: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* สำหรับการ upload file ต้องใช้ FormData() ในการส่ง */
    /* การบันทึกไฟล์รูปภาพ(multer) จะจับแค่ property image เท่านั้น */
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    formData.append("price", values.price);
    formData.append("image", values.image);
    formData.append("imageOld", values.imageOld);

    updateProduct(id, formData)
      .then((res) => {
        alert("Update product " + res.data.title + " Success!");
        navigate("/admin/product");
      })
      .catch((err) => {
        console.log(err);
        alert("Update product fail!");
      });
  };

  const fetchData = () => {
    readProduct(id)
      .then((res) => {
        setValues({ ...res.data, imageOld: res.data.image });
        /* รับข้อมูลเก่ามาใส่ไว้ใน values พร้อมกับเก็บข้อมูลรูปเก่า */
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCategory = () => {
    listCategory()
      .then((res) => {
        setCategory(res.data);
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
              value={values?.title}
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
                setValues({ ...values, categoryId: e.target.value })
              }
            >
              <option value="">--please select category--</option>
              {category &&
                category.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {item?.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <input
              required
              name="price"
              type="number"
              value={values?.price}
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
              value={values?.description}
              placeholder="Description"
              className="mt-5 textarea textarea-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="w-full mt-5">
            {values?.imageOld && (
              <div className="w-full p-2 mx-auto bg-slate-100 -mb-1 rounded-t-md max-w-xs">
                <img
                  src={`${import.meta.env.VITE_APP_IMAGE}${values?.imageOld}`}
                  alt={values?.title}
                  className="w-10 h-10 rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              className="mt-5 file-input w-full max-w-xs input-bordered"
              onChange={(e) =>
                setValues({ ...values, image: e.target.files[0] })
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
