import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { MdDensityMedium } from "react-icons/md";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
/* Redux */
import { useSelector, useDispatch } from "react-redux";
import { signin, logout } from "../../../store/userSlice";
import { clearProductId } from "../../../store/wishlistSlice";
/* Functions */
import { currentUser } from "../../../functions/auth";

function NavbarAdmin() {
  const user = useSelector((state) => state.userStore.user);
  const idtoken = localStorage.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(clearProductId());
  };

  const fetchUser = () => {
    if (idtoken) {
      currentUser(idtoken)
        .then(function (res) {
          dispatch(signin(res.data));
        })
        .catch((err) => {
          console.log("fetchUser error!" + err);
        });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [idtoken]);

  return (
    <div className="navbar bg-gradient-to-r from-teal-700 to-emerald-500 p-8 d-flex justify-between lg:hidden ">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <MdDensityMedium size={36} className="text-white" />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-emerald-600 rounded-box w-52 text-white"
        >
          <li>
            <NavLink to="/admin/user">Manage user</NavLink>
          </li>
          <li>
            <NavLink to="/admin/category">Manage category</NavLink>
          </li>
          <li>
            <NavLink to="/admin/product">Manage product</NavLink>
          </li>
          <li>
            <NavLink to="/admin/blog">Manage blog</NavLink>
          </li>
        </ul>
      </div>

      <div>
        <Link to="/admin" className="text-3xl font-bold text-white">
          Hester
        </Link>
      </div>

      <div className="">
        {user?.username && (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-link">
              {user?.username}
              <span>
                <FiChevronDown />
              </span>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] shadow bg-emerald-600 rounded-box w-28"
            >
              <li
                /* className="cursor-pointer text-lg text-center text-white" */
                onClick={Logout}
              >
                <a className="text-white hover:text-rose-500 font-semibold">
                  <span>
                    <FiLogOut />
                  </span>{" "}
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarAdmin;
