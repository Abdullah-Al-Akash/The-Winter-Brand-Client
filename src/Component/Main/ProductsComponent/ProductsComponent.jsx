import React, { useContext, useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import { BsArrowRightCircleFill, BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductsSlider from "./ProductsSlider";
import "./Products.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Messenger from "../Messenger/Messenger";

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const { handleTop } = useContext(AuthContext);
  useEffect(() => {
    fetch("./products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="md:text-3xl text-xl text-center font-semibold brand-color py-8">
        See Our Beanie Bundle
      </h2>
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
      <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-4 md:py-14 px-8 hidden lg:px-24">
        {location.pathname === "/"
          ? products
            .slice(0, 6)
            ?.map((product) => (
              <ProductsCard key={product.id} product={product}></ProductsCard>
            ))
          : products?.map((product) => (
            <ProductsCard key={product.id} product={product}></ProductsCard>
          ))}
      </div>
      <div className="py-8 block md:hidden ">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products?.map((product) => {
            const { name, sale_price, regular_price, img } = product || {};
            return (
              <SwiperSlide>
                <div className="flex justify-center lg:w-96 lg:mx-auto  border relative mt-5 mx-5">
                  <span className="absolute top-0 left-0 px-2 brand-bg">
                    For Sell
                  </span>
                  <div className="border-none shadow-xl flex flex-col justify-between w-full">
                    <div className="flex justify-center">
                      <img
                        style={{
                          height: "300px",
                          width: "350px",
                        }}
                        className="px-8 w-full"
                        src={img}
                        alt="Beanie"
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="text-[16px] font-semibold">{name}</h2>
                      <div className="flex justify-end my-2">
                        <p>
                          Regular Price: <strike>{regular_price}</strike>{" "}
                        </p>
                        <p className="text-end brand-color">
                          Offer Price: {sale_price}{" "}
                        </p>
                      </div>
                    </div>
                    <button className="bg-black text-white py-2 flex justify-center items-center gap-2">
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
    </div>
  );
};

export default ProductsComponent;
