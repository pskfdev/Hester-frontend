import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteForever, MdModeEdit, MdAutorenew } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

function ManageProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRemove = (id) => {
    if (window.confirm("Are you sure delete!")) {
      axios
        .delete(
          `${import.meta.env.VITE_APP_API}/products/delete.php/?id=${id}`
        )
        .then((res) => {
          alert("Remove Product " + res.data.response.title + " Success!!!");
          fetchData();
        })
        .catch((err) => {
          console.log(err);
          alert("Error!! Remove Product");
        });
    }
  };

  const fetchData = () => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_APP_API}/products/list.php`)
      .then((res) => {
        setData(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshPage = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full container mx-auto py-20">
      <h3 className="text-4xl text-center font-bold">Manage product</h3>
      {loading && <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>}
      <div className="flex space-x-3 my-20">
        <Link to={`/admin/product/create`}>
          <button className="btn btn-primary">Add product</button>
        </Link>
        <button onClick={refreshPage} className="btn btn-warning">
          <MdAutorenew size={28} />
        </button>
      </div>

      <div className="overflow-x-auto my-10 h-96">
        <table className="table table-pin-row">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx}</td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_APP_IMAGE}${item.img}`}
                      alt={item.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="flex space-x-3">
                    <MdDeleteForever
                      className="text-red-600"
                      role="button"
                      size={28}
                      onClick={() => handleRemove(item.id)}
                    />
                    <Link to={`/admin/product/${item.id}`}>
                      <MdModeEdit
                        className="text-amber-600"
                        role="button"
                        size={28}
                      />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <p className="text-center">No, Data product..</p>
            )}
          </tbody>
        </table>
      </div>

      <Outlet />
    </div>
  );
}

export default ManageProduct;
