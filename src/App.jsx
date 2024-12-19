import { useEffect } from "react";
import { Outlet, useLocation  } from "react-router-dom";
//Components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
//Functions
import { currentUser } from "./functions/auth";
//Redux
import { useDispatch } from "react-redux";
import { signin } from "./store/userSlice";
import { updateWishlist } from "./store/wishlistSlice";
import { updateCart } from "./store/cartSlice";


function App() {

  const { pathname } = useLocation();
  const token = localStorage.token;
  const dispatch = useDispatch();

  const checkUser = () => {
    if (token) {
      currentUser(token)
        .then((res) => {
          dispatch(signin(res.data));
          dispatch(updateCart(res.data.cart));
          dispatch(updateWishlist(res.data.wishlists));
        })
        .catch((err) => {
          console.log("fetch user error!" + err);
        });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    checkUser();
  }, [token, pathname]);

  return (
    <div className="static bg-slate-50">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
