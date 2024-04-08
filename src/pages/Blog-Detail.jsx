import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readBlog } from "../functions/blog";

function BlogDetail() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const fetchData = () => {
    setLoading(true);

    readBlog(id)
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

      <div className="w-100 container mx-auto py-32 grow">
        <div className="mt-32 px-5 lg:px-0">
          {loading && <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>}
          <p className="text-center">{data.created}</p>
          <h1 className="text-4xl font-bold text-center my-14">{data.name}</h1>
          <p className="text-lg">{data.description}</p>
        </div>
        <Link to="/blog" className="btn mt-20">Back to blog</Link>
      </div>

    </div>
  );
}

export default BlogDetail;
