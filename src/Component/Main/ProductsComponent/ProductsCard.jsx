import React from "react";
import { BsCartPlus } from "react-icons/bs";
import useUserRole from "../../../hooks/useUserRole";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthProvider/AuthProvider";

const ProductsCard = ({ product, handleAddToCard }) => {
  const {
    product_name,
    discount,
    price,
    regular_price,
    product_image,
    _id,
    quantity,
  } = product;
  const { handleTop } = useAuth();
  const { role } = useUserRole();
  return (
    <div className="flex flex-col justify-center xxl:w-96 w-full lg:mx-auto  border relative">
      <Link onClick={handleTop} to={`/product-details/${_id}`}>
        <span
          className={`absolute top-0 left-0 px-2  ${quantity <= 0 ? "bg-red-500 text-white" : "brand-bg"
            }`}
        >
          {quantity <= 0 ? "Out of Stock" : "In stock"}
        </span>
        <div className="border-none shadow-xl flex flex-col justify-between w-full">
          <div className="flex justify-center">
            <img
              style={{ height: "300px", width: "350px" }}
              className="px-8"
              src={product_image}
              alt="Beanie"
            />
          </div>
          <div className="card-body">
            <h2 className="text-[16px] font-semibold">{product_name?.length > 30 ? `${product_name?.slice(0, 30)}...` : product_name}</h2>
            <div className="flex justify-end my-2">
              <p>
                Regular Price:
                <span className={discount && "line-through"}>
                  {" "}
                  {regular_price || price}{" "}
                </span>
              </p>
              {discount > 0 && (
                <p className="text-end brand-color">Offer Price: {price} </p>
              )}
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() => handleAddToCard(product)}
        className={`bg-black border ${role == "admin" ? "cursor-not-allowed" : "cursor-pointer"
          } text-white py-2 flex justify-center items-center gap-2`}
        disabled={role == "admin"}
        title={
          role == "admin" &&
          "You ar Login admin account. That's why yor are not add cart your cart"
        }
      >
        <BsCartPlus></BsCartPlus> <span className="mt-1">Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductsCard;
