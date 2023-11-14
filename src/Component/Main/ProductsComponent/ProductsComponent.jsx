import React, { useContext, useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import { BsArrowRightCircleFill, BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ProductsSlider from "./ProductsSlider";
import "./Products.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const ProductsComponent = () => {
  const { axiosSecure } = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const { handleTop, user } = useContext(AuthContext);
  // TODO products api 
  useEffect(() => {
    axiosSecure.get("/get-all-products")
      .then(res => {
        setProducts(res?.data?.data || [])
      })
  }, []);

  const navigate = useNavigate();
  const handleAddToCard = product => {
    if (!user) {
      Swal.fire({
        title: "Please Login First!",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      });

    }
    console.log(product);
    const { product_name, _id, price, discount, regular_price, product_image } = product;
    const newProduct = {
      product_name: product_name,
      product_id: _id,
      price: price,
      product_image: product_image,
      email: user?.email
    };
    axiosSecure.post('/create-cart', newProduct)
      .then(res => {
        if (res?.data?.success) {
          toast(`Product Added in cart!`)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="container mx-auto">
      <h2 className="md:text-3xl text-xl text-center font-semibold brand-color py-8">
        See Our Beanie Bundle
      </h2>

      <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-4 md:py-14 px-8 hidden lg:px-24">
        {location.pathname === "/"
          ? products
            .slice(0, 6)
            ?.map((product) => (
              <ProductsCard key={product.id} product={product}
                handleAddToCard={handleAddToCard}
              ></ProductsCard>
            ))
          : products?.map((product) => (
            <ProductsCard key={product.id} product={product}
              handleAddToCard={handleAddToCard}
            ></ProductsCard>
          ))}
      </div>
      {location.pathname === "/" ? (
        <Link onClick={handleTop} to="/all-product">
          <div className="flex items-center justify-end px-8 md:pe-24 mb-4">
            <p className="brand-color hover:cursor-pointer">
              See All Products{" "}
            </p>
            <p className="ms-2 text-xl brand-color hover:cursor-pointer">
              <BsArrowRightCircleFill></BsArrowRightCircleFill>
            </p>
          </div>
        </Link>
      ) : (
        ""
      )}
      <div className="py-8 block md:hidden ">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products?.map((product, i) => {
            const { product_name, price, discount, regular_price, product_image } = product || {};
            return (
              <SwiperSlide key={i}>
                <div className="flex justify-center lg:w-96 lg:mx-auto  border relative mt-5 mx-5">
                  <span className="absolute top-0 left-0 px-2 brand-bg">
                    For Sell
                  </span>
                  <div className="border-none shadow-xl flex flex-col justify-between w-full">
                    <div className="flex justify-center">
                      <img

                        className="px-8 w-full"
                        src={product_image}
                        alt="Beanie"
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="text-[16px] font-semibold">{product_name}</h2>
                      <div className="flex justify-end my-2">
                        <p >
                          Regular Price:
                          <span className={regular_price && 'line-through'}> {regular_price || price}{" "}</span>
                        </p>
                        {
                          discount && <p className="text-end brand-color">Offer Price: {price} </p>
                        }
                      </div>
                    </div>
                    <button onClick={() => handleAddToCard(product)} className="bg-black text-white py-2 flex justify-center items-center gap-2">
                      <BsCartPlus></BsCartPlus>{" "}
                      <span className="mt-1">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductsComponent;
