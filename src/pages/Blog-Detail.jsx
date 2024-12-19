import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
//Components
import { readBlog } from "../functions/blog";
import { FiArrowLeft } from "react-icons/fi";

function BlogDetail() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const fetchData = () => {
    setLoading(true);

    readBlog(id)
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
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full container mx-auto py-32 grow text-slate-600">
        <div className="mt-32 space-y-36 px-5 lg:px-0">
          {loading && (
            <span className="loading loading-ring text-error opacity-40 w-1/4 fixed inset-x-1/3 z-10"></span>
          )}

          {/* Header */}
          <div className="space-y-2">
            <h1 className="uppercase tracking-wider">{data?.name}</h1>
            <p className="text-sm font-semibold tracking-wide text-rose-600">
              {moment(data?.createdAt).format("LL")}
            </p>
          </div>

          {/* Image */}
          <div className="w-full">
            <img src={`${import.meta.env.VITE_APP_IMAGE}/${data?.image}`} alt={data?.name} className="w-full rounded-md" />
          </div>

          <div>
            <h3 className="first-letter:uppercase tracking-wide text-slate-500">{data?.description}</h3>
          </div>
        </div>

        <Link to="/blog" className="btn mt-32 tracking-wide">
          <FiArrowLeft />Back
        </Link>
      </div>
    </div>
  );
}

export default BlogDetail;
