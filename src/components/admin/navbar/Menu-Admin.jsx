import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//Redux
import { logout } from "../../../store/userSlice";
import { clearProductId } from "../../../store/wishlistSlice";

function MenuAdmin() {
  const user = useSelector((state) => state.userStore.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(clearProductId());
  };
  return (
    <div className="menu rounded-r-lg bg-gradient-to-r from-teal-700 to-emerald-500 w-64 text-xl text-white sticky top-0 hidden lg:block">
      <div className="mt-10 ps-5">
        <Link to="/admin" className="text-3xl font-bold">
          Hester
        </Link>
      </div>

      <div className="mt-10">
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
      </div>

      <div className="absolute font-bold uppercase bottom-0 w-full py-5 text-center space-y-2">
        <h3>{user?.username}</h3>
        <button className="btn btn-outline btn-error" onClick={Logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default MenuAdmin;
