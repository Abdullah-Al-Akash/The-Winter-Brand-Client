import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Sheard/Loading/Loading";
import useUserRole from "../../../hooks/useUserRole";
import { BsCartPlus } from "react-icons/bs";
import Swal from "sweetalert2";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HelmetSeo from "../../../Component/shared/Helmet";
const ProductDetails = () => {
  const { id } = useParams();
  const { user, handleTop, controlCart, setControlCart } = useAuth();
  const { role } = useUserRole();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { axiosSecure } = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`get-product/${id}`)
      .then((res) => {
        setProduct(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, [id]);
  const handleAddToCard = (product) => {
    if (!user) {
      Swal.fire({
        title: "Please Login First!",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }

    const { product_name, _id, price, discount, regular_price, product_image } =
      product;
    const newProduct = {
      product_name: product_name,
      product_id: _id,
      price: price,
      product_image: product_image,
      email: user?.email,
    };
    axiosSecure
      .post("/create-cart", newProduct)
      .then((res) => {
        if (res?.data?.success) {
          toast(`Product Added in cart!`);
          setControlCart(!controlCart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-[1200px] md:mx-auto m-5">
      <HelmetSeo
        title={product.product_name}
        canonical={"product-details/" + id}
        description={product.product_description}
      />
      <div className="md:grid grid-cols-1 md:grid-cols-2 md:mt-10 gap-5 !h-[100%]">
        <div className="h-full border rounded-lg">
          <img
            className="md:h-[500px]  mx-auto"
            src={product?.product_image}
            alt=""
          />
          {product?.discount > 0 && (
            <span className="bg-black text-white px-4 py-2 absolute top-0">
              {product?.discount}% OFF
            </span>
          )}
        </div>
        <div className="!h-[100%]">
          <div className="flex flex-col justify-between items-start !h-[100%]">
            <div>
              <div className=" items-end gap-2">
                <h3 className="md:text-3xl text-xl text-justify">
                  {product?.product_name}
                </h3>
              </div>
              {/* TODO Price */}
              {product?.quantity > 0 ? (
                <p className="badge badge-accent badge-outline mt-2">
                  In Stock
                </p>
              ) : (
                <p className="badge badge-accent badge-outline mt-2 !border-red-600 !text-red-600">
                  Out off stock
                </p>
              )}
              <div className="flex flex-col gap-2 my-2 text">
                <p>
                  Regular Price:
                  <span className={product?.discount && "line-through"}>
                    {" "}
                    ${product?.regular_price || product?.price}{" "}
                  </span>
                </p>
                {product?.discount > 0 && (
                  <p className="brand-color !text-red-500 font-semibold">
                    Offer Price: ${product?.price}{" "}
                  </p>
                )}
                <p className="text-justify">{product?.product_description}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleAddToCard(product)}
                className={`${role == "admin" ? "cursor-not-allowed" : "cursor-pointer"
                  } brand-btn transition-all ease-in-out flex items-center gap-2 px-4 py-2`}
                disabled={role == "admin"}
                title={
                  role == "admin" &&
                  "You ar Login admin account. That's why yor are not add cart your cart"
                }
              >
                <BsCartPlus></BsCartPlus> <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
