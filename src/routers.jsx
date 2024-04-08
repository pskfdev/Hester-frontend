import { createBrowserRouter, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Shop from "./pages/Shop.jsx";
import HomeAdmin from "./pages/admin/Home-Admin.jsx";
import ManageProduct from "./pages/admin/Manage-Product.jsx";
import ManageUser from "./pages/admin/Manage-User.jsx";
import ManageCategory from "./pages/admin/Manage-Category.jsx";
import ManageBlog from "./pages/admin/Manage-Blog.jsx";
import Editproduct from "./components/admin/product/Edit-product.jsx";
import Createproduct from "./components/admin/product/Create-product.jsx";
import Createcategory from "./components/admin/category/Create-category.jsx";
import Editcategory from "./components/admin/category/Edit-category.jsx";
import Createblog from "./components/admin/blog/Create-blog.jsx";
import Editblog from "./components/admin/blog/Edit-blog.jsx";
import AdminRoute from "./pages/protect routes/AdminRoute.jsx";
import ProductDetail from "./pages/Product-Detail.jsx";
import Cart from "./pages/Cart.jsx";
import BlogDetail from "./pages/Blog-Detail.jsx";
import Wishlist from "./pages/wishlist.jsx";
import App from "./App.jsx";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <HomeAdmin />
      </AdminRoute>
    ),
    children: [
      {
        path: "product",
        element: <ManageProduct />,
        children: [
          {
            path: "create",
            element: <Createproduct />,
          },
          {
            path: ":id",
            element: <Editproduct />,
          },
        ],
      },
      {
        path: "user",
        element: <ManageUser />,
      },
      {
        path: "blog",
        element: <ManageBlog />,
        children: [
          {
            path: "create",
            element: <Createblog />,
          },
          {
            path: ":id",
            element: <Editblog />,
          },
        ],
      },
      {
        path: "category",
        element: <ManageCategory />,
        children: [
          {
            path: "create",
            element: <Createcategory />,
          },
          {
            path: ":id",
            element: <Editcategory />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="text-center h-100">
        <p>There's nothing here: 404!</p>
        <Link to="/" className="btn btn-primary">
          Go to home page
        </Link>
      </div>
    ),
  },
]);
