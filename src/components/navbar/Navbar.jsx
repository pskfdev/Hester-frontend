import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { FiShoppingCart, FiAlignLeft, FiChevronDown } from "react-icons/fi";

function Navbar() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [bgNav, setBgNav] = useState(false);
  const username = localStorage.getItem("username");
  /* let cart = []; */
  let cart = JSON.parse(localStorage.getItem("cart"));
  let location = useLocation();
  let path = location.pathname;

  /* //scoll Navbar change bg  */
  const changColorNav = () => {
    if (window.scrollY >= 80) {
      setBgNav(true);
    } else {
      setBgNav(false);
    }
  };
  window.addEventListener("scroll", changColorNav);

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload(false);
  };

  const handleLogin = () => {
    setLogin(true);
    setRegister(false);
  };

  const handleRegis = () => {
    setLogin(false);
    setRegister(true);
  };

  const handleClose = () => {
    setLogin(false);
    setRegister(false);
  };

  useEffect(() => {
  }, []);

  return (
    <nav
      className={`navbar z-40 py-10 px-10 lg:px-20 fixed top-0 ${
        path == "/" ? "text-white" : "text-black"
      } flex justify-between ${bgNav ? "bg-red-400 bg-opacity-70" : "bg-tranparent"}`}
    >
      <div className="text-lg hidden lg:block">
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/about" className="mx-7">
          Our story
        </NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </div>

      <div className="space-x-5">
        {/* humberger responsive */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <FiAlignLeft size={30} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-red-300 bg-opacity-80 rounded-box w-52"
          >
            <li>
              <NavLink to="/shop" className="text-xl">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-xl">
                Our story
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="text-xl">
                Blog
              </NavLink>
            </li>
            <li>
              <Link
                to="/cart"
                tabIndex={0}
                className="btn btn-ghost btn-circle mt-4 ms-2"
              >
                <div className="indicator">
                  <FiShoppingCart size={30} />
                  <span className="badge badge-sm indicator-item bg-red-700">
                    {cart? cart.length : ""}
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        {/* END humberger responsive */}

        <Link to="/" className="normal-case font-bold text-4xl">
          Hester
        </Link>
      </div>

      {/* Login/Logout */}
      <div className="">
        {username ? (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-link">
              {username}<span><FiChevronDown /></span>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] shadow bg-red-300 bg-opacity-80 rounded-box w-32"
            >
              <li className="cursor-pointer text-lg text-center" onClick={Logout}>
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            className={`btn btn-link text-lg no-underline ${
              path == "/" ? "text-white" : "text-black"
            }`}
            onClick={handleLogin}
          >
            Login
          </button>
        )}
        {/* END Login/Logout */}

        <Link
          to="/cart"
          tabIndex={0}
          className="btn btn-ghost btn-circle hidden lg:flex"
        >
          <div className="indicator">
            <FiShoppingCart size={30} />
            <span className="badge badge-sm indicator-item bg-red-700">
              {cart? cart.length : ""}
            </span>
          </div>
        </Link>
      </div>

      {/* Modal */}
      {login && <Login handleRegis={handleRegis} handleClose={handleClose} />}

      {register && (
        <Register handleClose={handleClose} handleLogin={handleLogin} />
      )}
    </nav>
  );
}

export default Navbar;
