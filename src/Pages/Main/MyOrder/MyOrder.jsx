import React from "react";
import { FaDownload } from "react-icons/fa";


const MyOrder = () => {
  // Todo When My Order Zero Handle You have no order yet!
  return <div className="">
    <h1 className="text-center text-xl font-extrabold p-3 my-4">
      My Order
    </h1>

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
          <td className="">
            <button className="rounded btn-sm bg-black text-white flex items-center mx-auto">Invoice <span className="ps-1"><FaDownload /></span> </button>
          </td>
        </tr>

      </table>
    </div>
  </div>;
};

export default MyOrder;
