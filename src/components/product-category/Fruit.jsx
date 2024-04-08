import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { listProduct } from "../../functions/product";

function Fruit() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    listProduct()
      .then((res) => {
        setData(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data ? (
        data
          .filter((data) => data.category == "fruits")
          .slice(0, 5)
          .map((item) => {
            return (
              <div className="text-center" key={item.id}>
                <Link to={`/shop/${item.id}`}>
                  <img
                    src={`${import.meta.env.VITE_APP_IMAGE}${item.img}`}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                  <br />
                  <p className="text-lg font-bold">{item.title}</p>
                  <p>${item.price}</p>
                </Link>
              </div>
            );
          })
      ) : (
        <p>No product category fruit..</p>
      )}
    </div>
  );
}

export default Fruit;
