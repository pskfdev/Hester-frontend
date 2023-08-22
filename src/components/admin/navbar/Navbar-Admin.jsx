import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDensityMedium } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

function NavbarAdmin() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate()

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="navbar bg-emerald-700 p-8 d-flex justify-between">
      <div className="lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <MdDensityMedium size={36} className="text-white" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-emerald-600 rounded-box w-52 text-white"
          >
            <li>
              <Link to="/admin/user">Manage user</Link>
            </li>
            <li>
              <Link to="/admin/category">Manage category</Link>
            </li>
            <li>
              <Link to="/admin/product">Manage product</Link>
            </li>
            <li>
              <Link to="/admin/blog">Manage blog</Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <Link to="/admin" className="text-3xl font-bold text-white">
          Hester
        </Link>
      </div>

      <div className="">
        {username && (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-link">
              {username}<span><FiChevronDown /></span>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] shadow bg-emerald-600 rounded-box w-28"
            >
              <li
                className="cursor-pointer text-lg text-center text-white"
                onClick={Logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarAdmin;
