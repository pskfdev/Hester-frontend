import React from "react";
import { Route, Link } from "react-router-dom";

function MenuAdmin() {
  return (
    <ul className="menu bg-emerald-600 w-64 text-xl space-y-3 pt-20 text-white sticky top-0 hidden lg:block">
      <li >
        <Link to="/admin/user">Manage user</Link>
      </li>
      <li >
        <Link to="/admin/category">Manage category</Link>
      </li>
      <li >
        <Link to="/admin/product">Manage product</Link>
      </li>
      <li >
        <Link to="/admin/blog">Manage blog</Link>
      </li>
    </ul>
  );
}

export default MenuAdmin;
