import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import HelmetSeo from "../../../Component/shared/Helmet";
const img_hosting_Token = import.meta.env.VITE_IMAGE_UPLOAD;

const AddProduct = () => {
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${img_hosting_Token}`;
  const [loadImage, setLoadImage] = useState(false);
  const { register, watch } = useForm();
  const { axiosSecure } = useAxiosSecure();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handelAddProduct = (e) => {
    e.preventDefault();
    const from = e.target;
    const selectedFile = watch("image") && watch("image")[0];
    const product_name = from?.product_name?.value;
    const price = parseFloat(from?.price?.value);
    const quantity = parseFloat(from?.quantity?.value);
    const discount = parseFloat(from?.discount?.value);
    const product_description = from?.product_description?.value;
    console.log({
      product_name,
      price,
      quantity,
      discount,
      product_description
    })
    if (!selectedFile) {
      console.log("You haven't selected an image.");
      return;
    }

    // Handle image submission
    const formData = new FormData();
    formData.append("image", selectedFile);
    setLoadImage(true);

    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.url;
          console.log(imgURL);
          const updateImageFile = {
            product_name,
            product_description,
            price: parseFloat(price).toFixed(2),
            product_image: imgURL,
            quantity,
            discount: parseFloat(discount).toFixed(2),
          };
          console.log(imgURL);
          axiosSecure
            .post("/create-product", updateImageFile)
            .then((res) => {
              if (res?.data?.success) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Upload successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                from.reset();
                setLoadImage(false);
                navigate("/dashboard/all-products");
                setError("");
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Warning",
                  text: "Something went wrong!",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              setLoadImage(false);
            });
        }
      })
      .catch(() => {
        console.log("Error uploading image.");
        setLoadImage(false);
      });
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <HelmetSeo
        title="Add product"
        canonical={"dashboard/add-product"}
        description=""
      />
      <h1 className="text-center my-5 md:text-5xl text-xl">Add Product</h1>
      <form onSubmit={handelAddProduct}>
        <div
          className={`${"relative mx-auto h-full border-2 border-gray-400 bg-gray-200 border-dashed rounded-[20px] text-gray-500 flex items-center justify-center"}`}
        >
          {watch("image") ? (
            <img
              src={URL.createObjectURL(watch("image")[0])}
              alt="Product Preview"
              className="flex justify-center items-center rounded-[20px]"
            />
          ) : (
            <>
              <label
                htmlFor="file-upload"
                className="h-[50vh] cursor-pointer  flex justify-center items-center flex-col"
              >
                <span className="text-3xl flex items-center gap-1">
                  + <BsFillImageFill></BsFillImageFill>
                </span>
                <span className="mt-2">Add Product Image</span>
              </label>
              <input
                id="file-upload"
                {...register("image", { required: true })}
                type="file"
                className="custom-file-input"
              />{" "}
            </>
          )}
        </div>
        <div className="mt-5">
          <h1 className="my-5 md:text-1xl text-xl">Add Info</h1>
          <div className="md:flex justify-between items-center gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="product_name">Name</label>
              <input
                id="product_name"
                type="text"
                required
                autoComplete="off"
                className="border outline-none px-2 py-3 mt-1 bg-gray-200"
                placeholder="Enter Product Name"
                name="product_name"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="price">price</label>
              <input
                id="price"
                min={0}
                type="text"
                required
                autoComplete="off"
                placeholder="Enter Product Price"
                className="border outline-none px-2 py-3 mt-1 bg-gray-200"
                name="price"
              />
            </div>
          </div>
          <div className="md:flex justify-between items-center gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                required
                min={0}
                autoComplete="off"
                className="border outline-none px-2 py-3 mt-1 bg-gray-200"
                name="quantity"
                placeholder="Enter Product Quantity"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="discount">Discount</label>
              <input
                id="discount"
                type="text"
                min={0}
                max={100}
                autoComplete="off"
                placeholder="Enter Product Discount"
                className="border outline-none px-2 py-3 mt-1 bg-gray-200"
                name="discount"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="product_description">Description</label>
            <textarea
              name="product_description"
              id="product_description"
              autoComplete="off"
              cols="30"
              required
              className="border outline-none px-2 py-3 mt-1 bg-gray-200"
              rows="10"
              placeholder="Enter Product Details"
            ></textarea>
            <span className="text-red-600">{error}</span>
          </div>

          <input
            type="submit"
            value="Uplaod Product"
            className="brand-btn px-7 mt-5 py-2 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
