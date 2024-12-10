import React, { useState, useEffect } from "react";
import { MdDeleteForever, MdModeEdit, MdAutorenew } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
//Functions
import { listCategory, deleteCategory } from "../../functions/category";

function ManageCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const handleRemove = (id) => {
    if (window.confirm("Are you sure delete!")) {

      deleteCategory(id)
        .then((res) => {
          alert("Remove category " + res.data.name + " Success!!!");
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchData = () => {
    setLoading(true);

    listCategory()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const refreshPage = (e) => {
    e.preventDefault();
    fetchData();
  };


  useEffect(() => {
    fetchData();
  }, [location.pathname]);

  return (
    <div className="w-full container mx-auto py-20 px-5">
      <h3 className="text-4xl text-center font-bold text-gray-500 underline underline-offset-4">Manage category</h3>
      {loading && (
        <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>
      )}
      <div className="flex space-x-3 my-20">
        <Link to={`/admin/category/create`}>
          <button className="btn btn-primary">Add category</button>
        </Link>
        <button onClick={refreshPage} className="btn btn-warning">
          <MdAutorenew size={28} />
        </button>
      </div>

      <div className="overflow-x-auto my-10 h-96">
        <table className="table table-pin-row bg-gradient-to-r from-slate-200 to-gray-300">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>date / time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx}</td>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td className="flex space-x-3">
                    <MdDeleteForever
                      className="text-red-600"
                      role="button"
                      size={28}
                      onClick={() => handleRemove(item.id)}
                    />
                    <Link to={`/admin/category/${item.id}`}>
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
              <p className="text-center">No, Data category..</p>
            )}
          </tbody>
        </table>
      </div>

      <Outlet />
    </div>
  );
}

export default ManageCategory;
