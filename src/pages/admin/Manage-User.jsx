import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteForever, MdAutorenew } from "react-icons/md";
import { Link, useLocation, Outlet } from "react-router-dom";

function ManageUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const roleData = ["admin", "user"];

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };

    axios
      .post(`${import.meta.env.VITE_APP_API}/users/change-role.php/?id=${id}`, values)
      .then((res) => {
        console.log(res);
        alert(`Change role ${res.data.response.role} success!`);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure delete!")) {
      axios
        .delete(`${import.meta.env.VITE_APP_API}/users/delete.php/?id=${id}`)
        .then((res) => {
          console.log(res.data);
          alert("Remove user " + res.data.response.username + " Success!!!");
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
      .get(`${import.meta.env.VITE_APP_API}/users/list.php`)
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
      <h3 className="text-4xl text-center font-bold">Manage user</h3>
      {loading && <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>}
      <div className="flex space-x-3 my-20">
        <button onClick={refreshPage} className="btn btn-warning">
          <MdAutorenew size={28} />
        </button>
      </div>

      <div className="overflow-x-auto my-10 h-96">
        <table className="table table-pin-row">
          <thead>
            <tr>
              <th>Number</th>
              <th>Username</th>
              <th>Role</th>
              <th>date / time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx}</td>
                  <td>{item.username}</td>
                  <td>
                    <select
                      className="select  max-w-xs"
                      value={item.role}
                      onChange={(e) =>
                        handleChangeRole(e.target.value, item.id)
                      }
                    >
                      {roleData.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{item.created}</td>
                  <td className="">
                    <MdDeleteForever
                      className="text-red-600"
                      role="button"
                      size={28}
                      onClick={() => handleRemove(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <p className="text-center">No, Data user..</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUser;
