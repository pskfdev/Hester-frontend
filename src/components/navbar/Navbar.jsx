import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
//Components
import Login from "./Login";
import Register from "./Register";
import {
  FiShoppingCart,
  FiAlignLeft,
  FiChevronDown,
  FiHeart,
  FiLogOut,
  FiUserCheck,
} from "react-icons/fi";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { clearProductId } from "../../store/wishlistSlice";

function Navbar() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [bgNav, setBgNav] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { username, role, wishlist } = useSelector(
    (state) => state.userStore.user
  );
  const cart = useSelector((state) => state.cartStore.cart);

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
    dispatch(logout());
    dispatch(clearProductId());
    navigate("/");
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

  return (
    <nav
      className={`navbar z-40 py-10 px-5 lg:px-20 fixed top-0 rounded-b-3xl ${
        path == "/"
          ? "text-white border-0"
          : "text-slate-600 border-b-1 bg-gradient-to-b from-slate-400 to-slate-100"
      } flex justify-between ${
        bgNav
          ? "bg-amber-300 bg-opacity-90 transition ease-in-out duration-500 shadow-lg"
          : "bg-tranparent"
      }`}
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
            className={`menu dropdown-content mt-3 z-[1] p-2 shadow bg-opacity-80 rounded-box w-52 ${
              path == "/"
                ? "bg-amber-300"
                : "text-slate-600 border-b-1 bg-slate-200"
            }`}
          >
            <li>
              <NavLink to="/shop" className="text-lg font-semibold">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-lg font-semibold">
                Our story
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="text-lg font-semibold">
                Blog
              </NavLink>
            </li>

            {username && (
              <div className="flex">
                <Link
                  to="/wishlist"
                  className={`btn btn-ghost btn-circle mt-4 ms-2 hover:bg-rose-600 hover:text-slate-200 ${
                    path == "/wishlist" && "bg-rose-600"
                  }`}
                >
                  <FiHeart size={30} />
                </Link>

                <Link
                  to="/cart"
                  tabIndex={0}
                  className={`btn btn-ghost btn-circle mt-4 ms-2 hover:bg-green-500 hover:text-slate-200 ${
                    path == "/cart" && "bg-green-500"
                  }`}
                >
                  <div className="indicator">
                    <FiShoppingCart size={30} />
                    <span className="badge badge-sm indicator-item bg-rose-600">
                      {cart ? cart.length : ""}
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </ul>
        </div>
        {/* END humberger responsive */}

        {/* Logo */}
        <Link to="/" className="normal-case font-bold text-4xl tracking-wide">
          Hester
        </Link>
      </div>

      {/* Login/Logout */}
      <div className="">
        {username ? (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-link tracking-wider">
              {username}
              <span>
                <FiChevronDown />
              </span>
            </label>
            <ul
              tabIndex={0}
              className={`menu dropdown-content z-[1] shadow bg-opacity-80 rounded-box w-[150px] tracking-wider ${
                path == "/"
                  ? "bg-amber-300"
                  : "text-slate-600 border-b-1 bg-slate-200"
              }`}
            >
              <li>
                <NavLink
                  to="/profile"
                  className="hover:text-green-500 font-semibold"
                >
                  <span>
                    <FiUserCheck />
                  </span>
                  Profile
                </NavLink>
              </li>
              <li onClick={Logout}>
                <a className="hover:text-rose-500 font-semibold">
                  <span>
                    <FiLogOut />
                  </span>{" "}
                  Logout
                </a>
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

        {/* Wishlist and Cart */}
        {username && (
          <div className="hidden lg:flex space-x-4">
            <Link
              to="/wishlist"
              className={`btn btn-ghost btn-circle hover:text-slate-200 hover:bg-rose-500 ${
                path == "/wishlist" && "bg-rose-600 text-slate-200"
              }`}
            >
              <FiHeart size={30} />
            </Link>
            <Link
              to="/cart"
              tabIndex={0}
              className={`btn btn-ghost btn-circle hover:text-slate-200 hover:bg-green-500 ${
                path == "/cart" && "bg-green-600 text-slate-200"
              }`}
            >
              <div className="indicator">
                <FiShoppingCart size={30} />
                <span className="badge badge-sm indicator-item bg-rose-600">
                  {cart && cart.length}
                </span>
              </div>
            </Link>
          </div>
        )}
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
