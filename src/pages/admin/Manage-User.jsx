import React, { useState, useEffect } from "react";
import { MdDeleteForever, MdAutorenew } from "react-icons/md";
//Functions
import { listUser, DeleteUser, changeRole } from "../../functions/user";

function ManageUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const roleData = ["admin", "user"];
  const token = localStorage.token;

  const handleChangeRole = (role, id) => {

    changeRole(token, id, role)
      .then((res) => {
        alert(res.data.message);
        
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure delete!")) {

      DeleteUser(token, id)
        .then((res) => {
          alert("Remove user " + res.data.username + " Success!");
          fetchData();
        })
        .catch((err) => {
          console.log(err);
          alert("Remove Product fail!");
        });
    }
  };

  const fetchData = () => {
    setLoading(true);

    listUser(token)
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
  }, []);
  return (
    <div className="w-full container mx-auto py-20 px-5">
      <h1 className="text-center font-bold uppercase underline underline-offset-4 decoration-emerald-500">Manage user</h1>
      {loading && (
        <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>
      )}
      <div className="flex space-x-3 my-20">
        <button onClick={refreshPage} className="btn btn-warning">
          <MdAutorenew size={28} />
        </button>
      </div>

      <div className="overflow-x-auto my-10 h-96">
        <table className="table table-pin-row bg-gradient-to-b from-emerald-100 to-gray-200">
          <thead className="bg-emerald-200">
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx}</td>
                  <td>{item?.name}</td>
                  <td>{item?.username}</td>
                  <td>
                    <select
                      className="select  max-w-xs"
                      value={item?.role}
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
                  <td>
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
