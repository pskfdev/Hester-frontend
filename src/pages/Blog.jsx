import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Blog() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_APP_API}/blog/list.php`)
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

      <div className="w-100 my-20 grow">
        <div className="w-100 container mx-auto pt-40 px-10 lg:px-0 relative">
        {loading && <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>}
          <h1 className="text-4xl font-bold text-center">Our Blog</h1>
          {data ? (
            data.map((item, idx) => (
              <div key={item.id} className="border border-warning py-10 px-10 mt-10 rounded-lg">
                <h2 className="text-3xl font-bold">{item.name}</h2><br />
                <p>{item.description.slice(0, 200)} <Link to={`/blog/${item.id}`} className="font-bold text-slate-500">Readmore..</Link></p>
              </div>
            ))
          ) : (
            <p className="text-center">No, Data blog..</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
