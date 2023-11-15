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

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key)

const Checkout = () => {
  const { axiosSecure } = useAxiosSecure()
  const [stripe, setStripe] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [selectedState, setSelectedState] = useState("");
  const [offer, setOffer] = useState(false);
  const [numberMassage, setNumberMassage] = useState(false);
  const [emailMassage, setEmailMassage] = useState(false);
  // const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)
  const [amount, setAmount] = useState(0)
  const { checkoutData } = useCheckoutData()

  console.log(checkoutData)
  useEffect(() => {
    // setStripePromise()
    if (checkoutData) {
      const amount = Math.round(checkoutData.price * 100)
      setAmount(amount)
    }
  }, [checkoutData])

  useEffect(() => {
    axiosSecure.post("/payment", {
      amount
    })
      .then(res => {
        setClientSecret(res?.data?.data?.client_secret)
      })
  }, [amount, checkoutData])

  const countries = {
    "United States": [
      [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District Of Columbia",
        "Federated States Of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    ],
    Canada: [
      [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon Territory",
      ],
    ],
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const first_name = from.first_name.value;
    const last_name = from.last_name.value;
    const company = from.company.value || "";
    const address = from.address.value;
    const apartment = from?.apartment?.value || "";
    const post_code = from.post_code.value;
    const city = from.city.value;
    const phone = from?.phone?.value || "";
    const mobile_number = from?.mobile_number?.value || "";
    const obj = {
      email: email,
      country: selectedCountry,
      state: selectedState,
      first_name: first_name,
      last_name: last_name,
      company: company,
      address: address,
      apartment: apartment,
      post_code: post_code,
      city: city,
      phone: phone,
      mobile_number: mobile_number,
      numberMassage: numberMassage,
      emailMassage: emailMassage,
    };


    axiosSecure.post("/create-order")
      .then(res => {
        if (res.data?.success) {

        }
      })
    console.log(obj);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="border-t border-r border-gray-500">
        <div className="max-w-[600px] ms-auto p-5 pe-20">
          <p className="text-sm text-gray-400 text-center">Express checkout</p>
          <div className="divider">OR</div>
          <div className="contactFrom">
            <form onSubmit={(e) => handleSubmit(e)} className="mt-[50px]">
              <div>
                <div className="flex justify-between items-center w-full my-2">
                  <h2 className="text-xl font-semibold">Contact</h2>
                  <span className="text-[12px] text-gray-500">
                    Have an account?{" "}
                    <Link className="border-b" to="/login">
                      Login
                    </Link>
                  </span>
                </div>
                <input
                  type="email"
                  required
                  className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                  name="email"
                  placeholder="Email"
                />
                <div className="flex justify-start items-center gap-3 mt-3 text-xs text-gray-500">
                  <input
                    onClick={(e) => setEmailMassage(e.target.checked)}
                    type="checkbox"
                    name="massage_email"
                  />
                  <span>Email me with news and offers</span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-5 mt-[30px]">
                <div>
                  <label className="text-xl font-semibold ">Delivery :</label>
                  <div className="border mt-5 py-3 pt-5  rounded-lg relative">
                    <label
                      htmlFor="Country"
                      className="text-[10px] absolute top-[6px] left-5 z-50"
                    >
                      Country/Region
                    </label>
                    <select
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      name="to"
                      id="Country"
                      className="w-full px-4 outline-none text-[14px]  focus:border-orange-600 relative bg-transparent"
                    >
                      {Object.keys(countries).map((division, index) => {
                        return (
                          <option key={index} value={division}>
                            {division}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="border py-3 pt-5  rounded-lg relative">
                    <label className="text-[11px] absolute top-[6px] left-5 z-50">
                      Select State:
                    </label>
                    <select
                      onChange={(e) => setSelectedState(e.target.value)}
                      name=""
                      className="w-full px-4 outline-none text-[14px]  focus:border-orange-600 relative bg-transparent"
                    >
                      {countries[selectedCountry][0]?.map((state, index) => {
                        return (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    required
                    className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                  />
                  <input
                    className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <input
                  className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                  type="text"
                  name="company"
                  placeholder="Company (Optional)"
                />
                <input
                  className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                  required
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                {offer ? (
                  <input
                    className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                    type="text"
                    name="apartment"
                    placeholder="Apartment, Suite, etc. (Optional)"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span
                      onClick={() => setOffer(true)}
                      className="font-bold cursor-pointer"
                    >
                      {" "}
                      <AiOutlinePlus></AiOutlinePlus>
                    </span>
                    <span className="text-[12px]">
                      Add apartment, suite, etc.
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="post_code"
                    required
                    placeholder="Post Code"
                    className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                  />
                  <input
                    className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                    type=""
                    name="city"
                    required
                    placeholder="City"
                  />
                </div>
                <input
                  className="px-4 py-3 w-full outline-none border rounded-lg focus:border-orange-600"
                  type="number"
                  name="phone"
                  placeholder="Phone (optional)"
                />
                <div className="flex justify-start items-center gap-3 mt-3 text-xs text-gray-500">
                  <input
                    onClick={(e) => setNumberMassage(e.target.checked)}
                    type="checkbox"
                    defaultValue={numberMassage}
                    name="massage_number"
                  />
                  <span>Text me with news and offers</span>
                </div>
                {numberMassage == true && (
                  <div>
                    <div className="flex ps-2 items-center gap-1 py-3 border rounded-lg focus:border-orange-600 relative">
                      <FiSmartphone></FiSmartphone>
                      <input
                        className="w-full outline-none pt-2"
                        type="number"
                        name="mobile_number"
                      />
                      <span className="absolute top-[6px] left-[28px] text-[10px]">
                        Mobile Phone Number
                      </span>
                    </div>
                    <span className="text-[12px] text-justify ">
                      By signing up via text, you agree to receive recurring
                      automated marketing messages, including cart reminders, at
                      the phone number provided. Consent is not a condition of
                      purchase. Reply STOP to unsubscribe. Reply HELP for help.
                      Message frequency varies. Msg & data rates may apply
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-semibold">Shipping method</h2>
                <div className="bg-[#FEF6F6] border-[#fbe1e1] p-3 flex gap-2 items-start">
                  <span className="text-red-500 mt-[4px]">
                    <PiWarningCircle></PiWarningCircle>
                  </span>
                  <div className="flex flex-col gap-2">
                    <h1>Shipping not available</h1>
                    <p className="text-[12px]">
                      Your order cannot be shipped to the selected address.
                      Review your address to ensure it's correct and try again,
                      or select a different address.
                    </p>
                  </div>
                </div>
                <h2 className="text-xl font-semibold">Payment</h2>
                {
                  clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm setStripe={setStripe} />
                    </Elements>)

                }

                {/* TODO  */}
              </div>
              <input
                type="submit"
                value="Summit"
                disabled={!stripe}
                className={`${!stripe && "cursor-not-allowed"} bg-[#FF4500] text-white transition-all ease-in-out duration-500 hover:text-[#FF4500] hover:bg-black md:px-14 md:text-xl px-10 font-semibold py-3 rounded-[50px] cursor-pointer`}
              />
            </form>
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
