import React from "react";
import logo from "../../../assets/Navlogo.png";
import Swal from "sweetalert2";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
const AllProducts = () => {
  const products = [
    {
      _id: 1,
      Image: "https://i.ibb.co/c6sjtJ5/12.jpg",
      product_name: "12 Month Prepaid Sock Subscription",
      size: ["large", "medium", "xl", "kid's large", "kid's medium"],
      style: ["graphic socks", "pattern socks", "1 of each"],
      available_quantity: 20,
      already_sell: 10,
      previous_price: 98,
      price: 58,
      in_stock: true,
    },
    {
      _id: 2,
      Image: "https://i.ibb.co/c6sjtJ5/12.jpg",
      product_name: "12 Month Prepaid Sock Subscription",
      size: ["large", "medium", "xl", "kid's large", "kid's medium"],
      style: ["graphic socks", "pattern socks", "1 of each"],
      available_quantity: 0,
      already_sell: 10,
      previous_price: 98,
      price: 58,
      in_stock: false,
    },
  ];
  const updateOrderStatus = (status, productId) => {
    console.log(status);
    Swal.fire({
      title: "Are you sure?",
      text: `${
        status == "update"
          ? "You are Update Product Status"
          : "Are you sure Delete This Product"
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        status == "update" ? "Yes Update it" : "Yes Delete it"
      }`,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          status,
          productId,
        };
        // console.log(data);
      }
    });
  };
  const options = [
    { value: "update", label: "Update" },
    { value: "delete", label: "Delete" },
  ];
  return (
    <div className="">
      <h1 className="text-center text-xl font-extrabold p-3">
        Your All Products
      </h1>
      <div className="relative mx-auto w-[80%] flex justify-center my-8">
        <input
          type="text"
          name="search_text"
          placeholder="search here..."
          className="bg-white py-3 w-full pl-14 border-2 rounded-full outline-none border-stone-300 text-black"
        />
        <button
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 left-5 text-stone-300"
        >
          <FaSearch></FaSearch>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="">
              <th className="text-center">#</th>
              <th className="text-center">Product Image</th>
              <th className="text-center">Product Name</th>

              <th className="text-center ">Available quantity</th>
              <th className="text-center">Already Sell</th>
              <th className="text-center">Product States</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {products.map((product, i) => {
            const {
              _id,
              Image,
              product_name,
              size,
              style,
              available_quantity,
              already_sell,
              previous_price,
              price,
              in_stock,
            } = product;
            return (
              <tr key={i} className="text-center">
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={Image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product_name} </td>

                <td>{available_quantity}</td>
                <td>{already_sell}</td>
                <td>
                  {available_quantity <= 0 ? (
                    <span className="bg-red-400 p-1 rounded-lg text-white">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="bg-green-500 p-1 rounded-lg text-white">
                      in Stock
                    </span>
                  )}
                </td>
                <td className="">
                  <div className="flex justify-center items-center gap-5 text-xl">
                    <span className="cursor-pointer">
                      <HiPencil></HiPencil>
                    </span>
                    <span className="cursor-pointer">
                      <FaTrashAlt></FaTrashAlt>
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
