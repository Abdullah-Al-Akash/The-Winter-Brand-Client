import React from "react";
import logo from "../../../assets/Navlogo.png";
import Swal from "sweetalert2";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateProductModal from "../../../Component/Dashboard/UpdateProductModal/UpdateProductModal";
import Loading from "../../../Sheard/Loading/Loading";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(false);
  const { axiosSecure } = useAxiosSecure();
  const [control, setControl] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axiosSecure
      .get("/get-all-products")
      .then((res) => {
        setProducts(res?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [control]);

  // const products = [
  //   {
  //     _id: 1,
  //     Image: "https://i.ibb.co/c6sjtJ5/12.jpg",
  //     product_name: "12 Month Prepaid Sock Subscription",
  //     size: ["large", "medium", "xl", "kid's large", "kid's medium"],
  //     style: ["graphic socks", "pattern socks", "1 of each"],
  //     available_quantity: 20,
  //     already_sell: 10,
  //     previous_price: 98,
  //     price: 58,
  //     discount: 10,
  //     in_stock: true,
  //   },
  //   {
  //     _id: 2,
  //     Image: "https://i.ibb.co/c6sjtJ5/12.jpg",
  //     product_name: "12 Month Prepaid Sock Subscription",
  //     size: ["large", "medium", "xl", "kid's large", "kid's medium"],
  //     style: ["graphic socks", "pattern socks", "1 of each"],
  //     available_quantity: 0,
  //     already_sell: 10,
  //     previous_price: 98,
  //     price: 58,
  //     discount: 10,
  //     in_stock: false,
  //   },
  // ];

  // delete function
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-product/${id}`)
          .then((res) => {
            console.log(res);
            if (res?.data?.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted successful.",
                icon: "success",
              });
              setControl(!control);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something is wrong`,
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };
  // update function
  const handleUpdateProduct = (id) => {
    const product = products.find((p) => p?._id == id);
    setUpdatedProduct(product);
  };

  // TODO SET LOADING
  if (isLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

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

              <th className="text-center ">Price</th>
              <th className="text-center ">Discount Price</th>
              <th className="text-center ">Available quantity</th>
              <th className="text-center">Already Sell</th>
              <th className="text-center">Product States</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {products &&
            products.map((product, i) => {
              const {
                _id,
                product_image,
                product_name,
                quantity,
                already_sell,
                price,
                discount,
              } = product || {};
              return (
                <tr key={i} className="text-center">
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product_image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product_name} </td>
                  <td>{price} </td>
                  <td>{discount} </td>
                  <td>{quantity}</td>
                  <td>{already_sell}</td>
                  <td>
                    {quantity <= 0 ? (
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
                      <label
                        htmlFor="my_modal_6"
                        onClick={() => handleUpdateProduct(_id)}
                        className="cursor-pointer"
                      >
                        <HiPencil></HiPencil>
                      </label>
                      <span
                        onClick={() => handleDeleteProduct(_id)}
                        className="cursor-pointer"
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <UpdateProductModal
        updatedProduct={updatedProduct}
        setControl={setControl}
        control={control}
      ></UpdateProductModal>
    </div>
  );
};

export default AllProducts;
