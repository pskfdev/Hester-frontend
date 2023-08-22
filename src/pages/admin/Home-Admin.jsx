import React from "react";
import NavbarAdmin from "../../components/admin/navbar/Navbar-Admin";
import MenuAdmin from "../../components/admin/navbar/Menu-Admin";
import { Route, Link, useLocation, Outlet } from "react-router-dom";
import { FcLibrary } from "react-icons/fc";

function HomeAdmin() {
  let location = useLocation();
  let pathName = location.pathname;

  return (
    <div>
      <NavbarAdmin />

      <div className="flex">
        <MenuAdmin />

        <div className="w-full bg-slate-200 h-screen">
          {pathName === "/admin" && (
            <div className="text-center container mx-auto my-20 space-y-4">
              <FcLibrary size={76} className="mx-auto" />
              <p className="text-4xl font-bold">
                Welcome to admin page
              </p>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
