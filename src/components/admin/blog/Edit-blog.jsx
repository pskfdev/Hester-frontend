import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Functions
import { readBlog, updateBlog } from "../../../functions/blog";

function Editblog() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    imageOld: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    readBlog(id)
      .then((res) => {
        setValues({...res.data, imageOld: res.data.image});
        /* รับข้อมูลเก่ามาใส่ไว้ใน values พร้อมกับเก็บข้อมูลรูปเก่า */
      })
      .catch((err) => {
        console.log(err);
        alert(`Read data Error!!`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* สำหรับการ upload file ต้องใช้ FormData() ในการส่ง */
    /* การบันทึกไฟล์รูปภาพ(multer) จะจับแค่ property image เท่านั้น */
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image); /* ต้องใช้ properry image สำหรับส่งไฟล์ภาพใหม่ */
    formData.append("imageOld", values.imageOld);

    updateBlog(id, formData)
      .then((res) => {
        alert("Update blog " + res.data.name + " Success!!");
        navigate("/admin/blog")
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
          onClick={() => navigate("/admin/blog")}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-3xl">Edit blog</h3>
        <form className="my-10" onSubmit={handleSubmit}>
          <div>
            <input
              required
              name="name"
              type="text"
              value={values?.name}
              placeholder="Name blog"
              className="input w-full max-w-xs input-bordered"
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              required
              name="description"
              value={values?.description}
              placeholder="Description"
              className="mt-5 textarea textarea-bordered w-full max-w-xs"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="w-full mt-5">
            {values?.imageOld && (
              <div className="w-full p-2 mx-auto bg-slate-100 -mb-1 rounded-t-md max-w-xs">
                <img
                  src={`${import.meta.env.VITE_APP_IMAGE}${values?.imageOld}`}
                  alt={values?.name}
                  className="w-10 h-10 rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
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

export default Editblog;
