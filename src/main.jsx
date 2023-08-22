import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import About from "../src/pages/About.jsx";
import Blog from "../src/pages/Blog.jsx";
import Shop from "../src/pages/Shop.jsx";
import HomeAdmin from "./pages/admin/Home-Admin.jsx";
import ManageProduct from "../src/pages/admin/Manage-Product.jsx";
import ManageUser from "../src/pages/admin/Manage-User.jsx";
import ManageCategory from "../src/pages/admin/Manage-Category.jsx";
import ManageBlog from "../src/pages/admin/Manage-Blog.jsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: (
      <div className="text-center h-100">
        <p>There's nothing here: 404!</p>
        <Link to="/" className="btn btn-primary">Go to home page</Link>
      </div>
    ),
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
    path: "blog",
    element: <Blog />,
  },
  {
    path: "blog/:id",
    element: <BlogDetail />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
