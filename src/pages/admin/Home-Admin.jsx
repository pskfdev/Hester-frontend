import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/admin/navbar/Navbar-Admin";
import MenuAdmin from "../../components/admin/navbar/Menu-Admin";
import { Link, useLocation, Outlet } from "react-router-dom";
import { FiUsers, FiBox, FiBookmark } from "react-icons/fi";

function HomeAdmin() {
  let location = useLocation();
  let pathName = location.pathname;

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/users/list.php`)
      .then((res) => {
        setUsers(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProducts = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/products/list.php`)
      .then((res) => {
        setProducts(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBlogs = () => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_APP_API}/blog/list.php`)
      .then((res) => {
        setBlogs(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col flex-grow bg-slate-200">
      <NavbarAdmin />

      <div className="flex h-full flex-grow">
        <MenuAdmin />

        <div className="w-full">
          {pathName === "/admin" && (
            <div className="w-full container mx-auto py-20 px-5">
              <h3 className="text-4xl text-center font-bold mb-10 text-gray-500 underline underline-offset-4">
                Dashboard
              </h3>

              {/* For Loading */}
              {loading && (
                <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-gradient-to-r from-orange-200 to-pink-200 rounded-lg p-5 flex justify-between text-slate-600">
                  <div className="">
                    <p className="text-lg font-bold">Users</p>
                    <h2 className="text-2xl my-5">
                      {users ? `${users.length} users` : `0 users`}
                    </h2>
                  </div>
                  <FiUsers size={25} />
                </div>
                <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-lg p-5 flex justify-between text-slate-600">
                  <div className="">
                    <p className="text-lg font-bold">Products</p>
                    <h2 className="text-2xl my-5">
                      {products ? `${products.length} ea` : `0 ea`}
                    </h2>
                  </div>
                  <FiBox size={25} />
                </div>
                <div className="bg-gradient-to-r from-teal-200 to-emerald-200 rounded-lg p-5 flex justify-between text-slate-600">
                  <div className="">
                    <p className="text-lg font-bold">Blogs</p>
                    <h2 className="text-2xl my-5">
                      {blogs ? `${blogs.length} posts` : `0 posts`}
                    </h2>
                  </div>
                  <FiBookmark size={25} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-lg p-5 text-slate-600">
                  <p className="text-lg text-center font-bold">Products</p>
                  <div className="overflow-x-auto h-64 mt-5">
                    <table className="table table-xs table-pin-rows">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products ? (
                          products.map((item, idx) => (
                            <tr key={item.id} className="hover">
                              <td>{idx}</td>
                              <td>{item.title}</td>
                              <td>{item.category}</td>
                              <td>{`$ ${item.price}`}</td>
                            </tr>
                          ))
                        ) : (
                          <p className="text-center">No, Data product..</p>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 text-slate-600">
                  <p className="text-lg text-center font-bold">Blogs</p>
                  <div className="overflow-x-auto h-64 mt-5">
                    <table className="table table-xs table-pin-rows">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Name</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs ? (
                          blogs.map((item, idx) => (
                            <tr key={item.id} className="hover">
                              <td>{idx}</td>
                              <td>{item.name}</td>
                              <td>{item.description.slice(0, 40) + " ...."}</td>
                            </tr>
                          ))
                        ) : (
                          <p className="text-center">No, Data blog..</p>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
