import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import moment from "moment";
//Functions
import { listBlog } from "../functions/blog";

function Blog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    listBlog()
      .then((res) => {
        setData(res.data);
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="w-100 my-20 grow">
        <div className="w-full container mx-auto pt-40 px-10 lg:px-0 relative">
          {loading && (
            <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>
          )}

          {/* Header */}
          <div className=" flex flex-col items-center mb-20 relative">
            <h1 className="text-center uppercase">
              My <span className="text-rose-500">Blog</span>
            </h1>
            <div className="w-[80px] mt-5 border-b-4 border-rose-400"></div>

            <input type="search" placeholder="Search here" className="input input-bordered w-[200px] absolute top-20 lg:top-0 lg:right-20" />
          </div>


          {data ? (
            data.map((item, idx) => (
              <div
                key={item?.id}
                className="mt-10 lg:mx-20 flex flex-col lg:flex-row rounded-[20px] overflow-hidden bg-white drop-shadow-md"
              >
                <div className="w-full lg:w-96 my-auto">
                  <img
                    src={`${import.meta.env.VITE_APP_IMAGE}${item?.image}`}
                    alt={item?.title}
                    className="w-full h-72 lg:h-56 object-cover"
                  />
                </div>

                <div className="w-full py-10 px-8 rounded-lg space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs text-rose-500 flex items-center space-x-1">
                      <FiClock /> <p>{moment(item?.updatedAt).format("LL")}</p>
                    </span>
                    <h2 className="text-gray-700">{item.name}</h2>
                  </div>

                  <p>{item.description.slice(0, 200)} </p>

                  <div className="flex justify-end">
                    <Link
                      to={`/blog/${item.id}`}
                      className="font-bold text-slate-500"
                    >
                      Read More ..
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No, Data blog..</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
