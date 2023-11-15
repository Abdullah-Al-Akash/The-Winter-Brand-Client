import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSmartphone } from "react-icons/fi";
import { PiWarningCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useCheckoutData } from "../../../context/CheckoutProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key);

const Checkout = () => {
  const { axiosSecure } = useAxiosSecure();

  // const [selectedCountry, setSelectedCountry] = useState("United States");
  // const [selectedState, setSelectedState] = useState("");
  // const [offer, setOffer] = useState(false);
  // const [numberMassage, setNumberMassage] = useState(false);
  // const [emailMassage, setEmailMassage] = useState(false);
  // const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(0);
  const { checkoutData } = useCheckoutData();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [post_code, setPost_code] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile_number, setMobile_number] = useState("");

  // first_name, last_name, company, address, apartment, post_code, city, phone, mobile_number

  useEffect(() => {
    if (checkoutData?.price) {
      const amount = Math.round(checkoutData.price * 100);
      setAmount(amount);
    }
  }, [checkoutData]);

  useEffect(() => {
    if (checkoutData?.duration !== "subscription") {
      axiosSecure
        .post("/payment", {
          amount,
        })
        .then((res) => {
          setClientSecret(res?.data?.data?.client_secret);
        });
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
                      first_name={first_name}
                      last_name={last_name}
                      company={company}
                      address={address}
                      apartment={apartment}
                      post_code={post_code}
                      city={city}
                      phone={phone}
                      mobile_number={mobile_number}
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
