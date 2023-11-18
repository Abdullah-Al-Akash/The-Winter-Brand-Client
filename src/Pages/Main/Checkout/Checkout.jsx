import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSmartphone } from "react-icons/fi";
import { PiWarningCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useCheckoutData } from "../../../context/CheckoutProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { cookies, useAuth } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../../../Sheard/Loading/Loading";
import moment from "moment";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key);

const Checkout = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user, toggleDrawer, handleTop } = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(0);
  const { checkoutData } = useCheckoutData();
  const [carts, setCarts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(true);
  if (!cookies.get("data")) {
    navigate("/");
    handleTop();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "First select your packages or add to cart",
        text: "please select any one",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Select packages",
        cancelButtonText: "go to add to cart",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/");
          toggleDrawer();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/all-product");
          handleTop();
        }
      });
  }

  useEffect(() => {
    if (checkoutData?.price) {
      const amount = (checkoutData.price * 100).toFixed(2);
      setAmount(amount);
    }
  }, [checkoutData]);

  useEffect(() => {
    if (
      checkoutData?.duration !== "subscription" &&
      checkoutData?.duration !== "cart"
    ) {
      axiosSecure
        .post("/payment", {
          amount,
        })
        .then((res) => {
          setClientSecret(res?.data?.data?.client_secret);
        });
    }

    if (checkoutData?.duration === "cart") {
      axiosSecure.get(`/get-cart/${user?.email}`).then((res) => {
        if (res?.data?.success) {
          const totalPrice = res?.data?.data?.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setAmount(totalPrice * 100);
          if (amount) {
            axiosSecure
              .post("/payment", {
                amount,
              })
              .then((res) => {
                setClientSecret(res?.data?.data?.client_secret);
              });
          }
        }
      });
    }
  }, [amount, checkoutData]);

  useEffect(() => {
    if (checkoutData?.duration === "cart") {
      axiosSecure
        .get(`get-cart/${user?.email}`)
        .then((res) => {
          setCarts(res?.data?.data);
          const initialValue = 0;
          const cartTotalPrice = res?.data?.data?.reduce(
            (accumulator, currentValue) => {
              return (
                accumulator +
                (currentValue?.price || 0) * (currentValue?.quantity || 1)
              );
            },
            initialValue
          );
          setCartPrice(cartTotalPrice);
          setLoading(false);
        })
        .catch((err) => {
          setCarts([]);
        });
    }
  }, [checkoutData]);
  console.log(checkoutData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="bcheckoutData-t bcheckoutData-r bcheckoutData-gray-500">
        <div className="max-w-[600px] ms-auto p-5 md:pe-20">
          <p className="text-sm text-gray-400 text-center">Express checkout</p>
          <div className="divider">OR</div>
          <div className="contactFrom">
            <div className="flex flex-col w-full gap-5 mt-[30px]">
              <div className="p-4 text-center">
                {stripePromise && (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm amount={amount} clientSecret={clientSecret} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F5F5F5] bcheckoutData-t bcheckoutData-gray-500 sticky top-[50px] z-10">
        <div className="max-w-[600px] me-auto p-5 ">
          {checkoutData?.duration === "cart" && (
            <div>
              <div className="overflow-x-auto">
                {loading ? (
                  <Loading></Loading>
                ) : (
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr className="text-center">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts?.map((cart, i) => {
                        console.log(cart);
                        return (
                          <tr className="bg-base-200 text-center">
                            <th>
                              {" "}
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img
                                    src={cart?.product_image}
                                    alt={cart?.product_name}
                                  />
                                </div>
                              </div>
                            </th>
                            <td>{cart?.product_name}</td>
                            <td>{cart?.quantity}</td>
                            <td>
                              {(cart?.quantity * cart?.price).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-base-200 text-center">
                        <th></th>
                        <td></td>

                        <td className="bg-black text-white">Total Price: </td>
                        <td className="bg-black text-white">
                          {cartPrice.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
          <div>
            {(checkoutData?.duration === "payment" ||
              checkoutData?.duration == "subscription") && (
                <div className="flex flex-col gap-2 me-auto">
                  {" "}
                  <h1 className="font-bold capitalize">
                    For {checkoutData?.type}
                  </h1>
                  <p>
                    {" "}
                    Gender: {checkoutData?.gender == "male" ? "Male" : "Female"}
                  </p>
                  <p> Price: {checkoutData?.price}</p>
                  <p>
                    {" "}
                    package:{" "}
                    {checkoutData?.package == "bundle_one"
                      ? "Bundle One"
                      : "Bundle Two"}
                  </p>
                  <div className="flex items-center gap-1">
                    <span>selected: </span>
                    {checkoutData?.selected?.map((select, i) => {
                      return (
                        <p
                          key={i}
                          className="badge badge-secondary badge-outline mx-1"
                        >
                          {select}
                        </p>
                      );
                    })}
                  </div>
                  <p> Size: {checkoutData?.size}</p>
                </div>
              )}
            {checkoutData?.type === "gift" && (
              <>
                <hr className="my-5" />
                <div className="mt-5 overflow-x-auto">
                  <div className="">
                    <h4 className="font-bold">Gift Info</h4>
                    <p className="md:grid md:grid-cols-3 gap-4 my-3">
                      <span>Gift Message</span>
                      <span className="col-span-2">
                        {checkoutData?.gift_message}
                      </span>
                    </p>
                    <p className="md:grid md:grid-cols-3 gap-4 my-3">
                      <span>Gift Recipient Email</span>
                      <span className="col-span-2">
                        {checkoutData?.gift_recipient_email}
                      </span>
                    </p>
                    <p className="md:grid md:grid-cols-3 gap-4 my-3">
                      <span>Gift Message Date</span>
                      <span className="col-span-2">
                        {moment(checkoutData?.gift_message_date).format(
                          "D MMM YYYY"
                        )}
                      </span>
                    </p>
                    <p className="md:grid md:grid-cols-3 gap-4 my-3">
                      <span>Gift Shipping Date</span>
                      <span className="col-span-2">
                        {moment(checkoutData?.shipping_date).format(
                          "D MMM YYYY"
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
