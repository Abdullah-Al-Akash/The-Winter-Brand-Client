import React from "react";

const MyOrder = () => {
  return <div className="">
    <h1 className="text-center text-xl font-extrabold p-3">
      Your All Products
    </h1>

    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead className="">
          <tr className="">
            <th className="text-center">#</th>
            <th className="text-center">Product Image</th>
            <th className="text-center">Product Name</th>

            <th className="text-center ">Price</th>
            <th className="text-center ">Discount Price</th>
            <th className="text-center ">Available quantity</th>
            <th className="text-center">Already Sell</th>
            <th className="text-center">Product States</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>


        <tr className="text-center">
          <th></th>
          <td>

          </td>
          <td>product_name </td>
          <td>price </td>
          <td>discount </td>
          <td>quantity</td>
          <td>already_sell</td>
          <td>

          </td>
        </tr>

      </table>
    </div>
  </div>;
};

export default MyOrder;
