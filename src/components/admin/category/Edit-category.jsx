import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Functions
import { readCategory, updateCategory } from "../../../functions/category";

function Editcategory() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    readCategory(id)
    .then((res) => {
      setValues(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateCategory(id, values)
      .then((res) => {
        alert("Update category " + res.data.name + " Success!!!");
        navigate("/admin/category")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center">
        <button
          onClick={() => navigate("/admin/category")}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-3xl">Edit category</h3>
        <form className="my-10" onSubmit={handleSubmit}>
          <div>
            <input
              required
              name="name"
              type="text"
              value={values?.name}
              placeholder="Name category"
              className="input w-full max-w-xs input-bordered"
              onChange={handleChange}
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

export default Editcategory;
