import React from "react";
import { BsFillImageFill } from "react-icons/bs";

const AddProduct = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-center my-5 md:text-5xl text-xl">Add Product</h1>
      <form>
        <div className="relative mx-auto h-full border-2 border-gray-400 bg-gray-200 border-dashed rounded-[20px]  text-gray-500 ">
          <label
            htmlFor="file-upload"
            className="py-[80px] cursor-pointer  flex justify-center items-center flex-col"
          >
            <span className="text-3xl">
              <BsFillImageFill></BsFillImageFill>
            </span>
            <span className="mt-2">Add Product Image</span>
          </label>
          <input
            id="file-upload"
            type="file"
            className="custom-file-input"
            name="image"
          />
        </div>
        <div className="mt-5">
          <h1 className="my-5 md:text-1xl text-xl">Add Info</h1>
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="product_name">Name</label>
              <input
                id="product_name"
                type="text"
                className="border outline-none px-2 py-3 mt-1 bg-gray-200"
                placeholder="Enter Product Name"
                name="product_name"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="price">price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter Product Price"
                className="border outline-none px-2 py-3 mt-1 bg-gray-200"
                name="price"
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="text"
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
              cols="30"
              className="border outline-none px-2 py-3 mt-1 bg-gray-200"
              rows="10"
              placeholder="Enter Product Details"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Uplaod Product"
            className="brand-btn px-7 mt-5 py-2"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
