import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Functions
import { listProduct } from "../../functions/product";

function Fruit() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    listProduct()
      .then((res) => {
        setData(res.data);
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
          .filter((data) => data?.category?.name == "fruit")
          .slice(0, 5)
          .map((item) => {
            return (
              <div className="text-center" key={item.id}>
                <Link to={`/shop/${item.id}`}>
                  <img
                    src={`${import.meta.env.VITE_APP_IMAGE}${item?.image}`}
                    alt={item?.title}
                    className="w-full h-[400px] object-cover rounded-3xl drop-shadow-md"
                  />
                  <br />
                  <p className="text-lg font-semibold first-letter:uppercase">{item?.title}</p>
                  <p>{item?.price} ฿</p>
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
