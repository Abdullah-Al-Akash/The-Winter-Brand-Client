import React from "react";
import logo from "../../../assets/Navlogo.png";
import Swal from "sweetalert2";
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
    <div className="md:mx-auto w-full overflow-x-auto bg-orange-50">
      <div className="p-4">
        <h1 className="text-center text-xl font-extrabold p-3">
          Your All Products
        </h1>
        <div className="flex items-center justify-center">
          <img className="h-10 ms-1 rounded-sm -me-1" src={logo} alt="" />
        </div>
      </div>
      <div className="flex w-full justify-center overflow-x-auto">
        <table className="table w-[1700px] my-2 ">
          {/* head */}
          <thead className="">
            <tr className="!text-[18px] md:text-2xl text-white bg-[#FF4500]">
              <th className="text-center">Product Image</th>
              <th className="text-center">Product Name</th>
              <th className="text-center">Size</th>
              <th className="text-center ">Style</th>
              <th className="text-center ">Available quantity</th>
              <th className="text-center">Already Sell</th>
              <th className="text-center">Product States</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {products.map((product, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "text-orange-800 bg-slate-300"
                    : "text-black bg-red-300"
                } my-auto`}
              >
                <div className="h-[100px] mb-1 my-auto flex justify-center items-center mt-1">
                  <img src={product?.Image} className="h-full" alt="" />
                </div>
                <td className="">{product.product_name}</td>
                <td className="">
                  {product.size.map((a) => {
                    return (
                      <span key={a} className="border mx-1 p-1 rounded">
                        {a}
                      </span>
                    );
                  })}
                </td>
                <td className="">
                  {product.style.map((a) => {
                    return (
                      <p key={a} className="border mx-1 p-1 rounded mb-1">
                        {a}
                      </p>
                    );
                  })}
                </td>
                <td className="text-center">{product.available_quantity}</td>
                <td className="text-center">{product.previous_price}</td>
                <td className={`text-center`}>
                  <span
                    className={`${
                      product.in_stock == true
                        ? "bg-black text-white"
                        : "bg-red-700 text-white"
                    }  px-2 py-1 rounded`}
                  >
                    {product.in_stock == true ? "in stock" : "stock out"}
                  </span>
                </td>
                <td>
                  <select
                    onChange={(e) =>
                      updateOrderStatus(e.target.value, product?._id)
                    }
                    className="px-4 py-2 border bg-none"
                    name=""
                    id=""
                  >
                    {options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
