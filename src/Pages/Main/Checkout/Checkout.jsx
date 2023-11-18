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

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key);

const Checkout = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user, toggleDrawer, handleTop } = useAuth()
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(0);
  const { checkoutData } = useCheckoutData();
  const navigate = useNavigate("")

  if (!cookies.get("data")) {
    navigate("/")
    handleTop()
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "First select your packages or add to cart",
      text: "please select any one",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Select packages",
      cancelButtonText: "go to add to cart",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/")
        toggleDrawer()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        navigate("/all-product")
        handleTop()
      }
    });

  }

  useEffect(() => {
    if (checkoutData?.price) {
      const amount = Math.round(checkoutData.price * 100);
      setAmount(amount);
    }
  }, [checkoutData]);

  useEffect(() => {
    if (checkoutData?.duration !== "subscription" && checkoutData?.duration !== "cart") {
      axiosSecure
        .post("/payment", {
          amount,
        })
        .then((res) => {
          setClientSecret(res?.data?.data?.client_secret);
        });
    }

    if (checkoutData?.duration === "cart") {
      axiosSecure.get(`/get-cart/${user?.email}`)
        .then(res => {
          if (res?.data?.success) {
            const totalPrice = res?.data?.data?.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            );
            setAmount(Math.round(totalPrice * 100))
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
        })

    }
  }, [amount, checkoutData]);


  const handleUnsubscribe = async () => {
    const response = await axiosSecure.post("/unsubscribe", {
      subscriptionId: "sub_1OCdv0Iq0mLIaueHQJBG2bjn",
    });
    console.log(response);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="border-t border-r border-gray-500">
        <div className="max-w-[600px] ms-auto p-5 md:pe-20">
          <p className="text-sm text-gray-400 text-center">Express checkout</p>
          <div className="divider">OR</div>
          <div className="contactFrom">
            <div className="flex flex-col w-full gap-5 mt-[30px]">
              <div className="p-4 text-center">
                {stripePromise && (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      amount={amount}
                      clientSecret={clientSecret}
                    />
                  </Elements>
                )}
              </div>
            </div>

            <button onClick={handleUnsubscribe}>Unsubscribe</button>
          </div>
        </div>
      </div>
      <div className="bg-[#F5F5F5] border-t border-gray-500 sticky top-[50px] z-10">
        <div className="max-w-[600px] me-auto p-5 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nostrum
          dignissimos officia eos delectus? Sunt, ullam consequatur maiores
          officiis minima eos sit reprehenderit ex earum inventore accusamus
          iure veritatis maxime
        </div>
      </div>
    </div>
  );
};

export default Checkout;
