import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AiOutlineClose } from "react-icons/ai";

const UpdateProductModal = ({ updatedProduct, setControl, control }) => {
  const { _id, product_image, product_name, quantity, price, discount } =
    updatedProduct || {};
  const { axiosSecure } = useAxiosSecure();
  const handleUpdate = (e) => {
    e.preventDefault();

    const from = e.target;
    const name = from?.product_name?.value;
    const quantity = from?.quantity?.value;
    const price = from?.price?.value;
    const discount = from?.discount?.value;
    const description = from?.description?.value;

    // updated Product
    const obj = {
      product_name: name,
      quantity,
      price,
      discount,
      description,
    };
    axiosSecure
      .put(`/update-product/${_id}`, obj)
      .then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            title: "Update!",
            text: "Your product has been Updated successful.",
            icon: "success",
          });
          setControl(!control);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box !relative">
          <h2 className="text-center my-5 bg-black text-white py-2">
            Please Update and Save this product.
          </h2>
          <form onSubmit={handleUpdate}>
            <img src={product_image} alt="" />
            <div className="flex flex-col justify-start items-start gap-1">
              <label htmlFor="product_name">Name</label>
              <input
                type="text"
                defaultValue={product_name}
                name="product_name"
                className="border-2 rounded-lg w-full p-2 outline-none text-[15px]"
                placeholder="Update Product Name"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 my-2">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                defaultValue={quantity}
                name="quantity"
                className="border-2 rounded-lg w-full p-2 outline-none text-[15px]"
                placeholder="Update Product quantity"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 my-2">
              <label htmlFor="price">price</label>
              <input
                type="text"
                defaultValue={price}
                name="price"
                className="border-2 rounded-lg w-full p-2 outline-none text-[15px]"
                placeholder="Update Product price"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 my-2">
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                defaultValue={discount}
                name="discount"
                className="border-2 rounded-lg w-full p-2 outline-none text-[15px]"
                placeholder="Update Product discount"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 my-2">
              <label htmlFor="description">Description</label>

              <textarea
                name="description"
                id="description"
                placeholder="Update description price"
                className="border-2 rounded-lg w-full p-2 outline-none text-[15px]"
              ></textarea>
            </div>
            <input
              type="submit"
              className="cursor-pointer brand-btn px-4 py-1"
              value="value"
            />
          </form>
          <div className="modal-action justify-start ">
            <label
              htmlFor="my_modal_6"
              className="cursor-pointer !absolute top-2 right-2"
            >
              <AiOutlineClose></AiOutlineClose>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
