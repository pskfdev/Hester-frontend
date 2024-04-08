import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { routers } from "./routers.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  </React.StrictMode>
);
