import React from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

const MyOrder = () => {
  // Todo When My Order Zero Handle You have no order yet!
  return (
    <div className="">
      <h1 className="text-center text-xl font-extrabold p-3 my-4">My Order</h1>

      <div className="overflow-x-auto">
        <table className="table w-[1280px] mx-auto">
          {/* head */}
          <thead className="">
            <tr className="">
              <th className="text-center">Order Id</th>
              <th className="text-center">Name</th>
              <th className="text-center">email</th>
              <th className="text-center">Address</th>
              <th className="text-center">Order Date</th>
              <th className="text-center ">Order Status</th>
              <th className="text-center ">Review</th>
              <th className="text-center ">Invoice</th>
            </tr>
          </thead>

          <tr className="text-center">
            <td>Order Id</td>
            <td>User Name</td>
            <td>email</td>
            <td>Mymensingh</td>
            <td>Order Status </td>
            <td>Transaction Id</td>
            <td>
              {" "}
              <button className="rounded btn-sm bg-black text-white flex items-center mx-auto">
                Add Review
                <span className="ps-1">
                  <IoIosStar></IoIosStar>
                </span>{" "}
              </button>
            </td>
            <td className="">
              <Link to="/invoice-details">
                <button className="rounded btn-sm bg-black text-white flex items-center mx-auto">
                  See invoice{" "}
                  <span className="ps-1">
                    <FaEye />
                  </span>{" "}
                </button>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
