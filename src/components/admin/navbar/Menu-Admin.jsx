import React from "react";
import { NavLink, Link } from "react-router-dom";

function MenuAdmin() {
  return (
    <ul className="menu bg-emerald-600 w-64 text-xl space-y-3 pt-20 text-white sticky top-0 hidden lg:block">
      <li >
        <NavLink to="/admin/user">Manage user</NavLink>
      </li>
      <li >
        <NavLink to="/admin/category">Manage category</NavLink>
      </li>
      <li >
        <NavLink to="/admin/product">Manage product</NavLink>
      </li>
      <li >
        <NavLink to="/admin/blog">Manage blog</NavLink>
      </li>
    </ul>
  );
}

export default MenuAdmin;
