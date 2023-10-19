import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Shop() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_APP_API}/products/list.php`)
      .then((res) => {
        setData(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto w-100 my-20 relative grow">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-44 px-10">
          {data ? (
            data.map((item, idx) => (
              <Link to={`/shop/${item.id}`} key={item.id} className="">
                <img
                  src={`${import.meta.env.VITE_APP_IMAGE}${item.img}`}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                  }}
                />
                <div className="text-center mt-5">
                  <h3 className="text-3xl">{item.title}</h3>
                  <p className="mt-3 text-lg">${item.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center">No, Data product..</p>
          )}
          {loading && <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>}
        </div>
        
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
