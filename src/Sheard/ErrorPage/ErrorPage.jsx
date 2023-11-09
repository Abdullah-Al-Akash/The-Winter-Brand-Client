import React from "react";
import errorImg from "../../assets/images/404.svg";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <img src={errorImg} className="h-[550px]" alt="" />
      <div className="text-center flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Error 404</h2>
        <p>The page you are looking is not available</p>
        <Link to="/" className="brand-bg py-3 rounded-full mt-4">
          Take me Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
