import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useCheckoutData } from "../../../context/CheckoutProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSmartphone } from "react-icons/fi";
import { PiWarningCircle } from "react-icons/pi";

import "./checkout.css";

import { cookies, useAuth } from "../../../AuthProvider/AuthProvider";
import CheckoutLoading from "../../../Sheard/checkout/CheckoutLoading";

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

const CheckoutForm = ({ amount, clientSecret }) => {
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [selectedState, setSelectedState] = useState("Alabama");
  const [offer, setOffer] = useState(false);
  const [numberMassage, setNumberMassage] = useState(false);
  const [emailMassage, setEmailMassage] = useState(false);
  const { axiosSecure } = useAxiosSecure();
  const { checkoutData } = useCheckoutData();
  const [paymentLoading, setPaymentLoading] = useState(false)
  const { user, setControlCart, controlCart, handleTop } = useAuth();
  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const from = event.target;
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
    setPaymentLoading(true)
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement == null) {
      return;
    }
    try {
      if (checkoutData?.duration === "subscription") {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          console.error("Error creating payment method:", error);
          return;
        }

        const response = await axiosSecure.post("/subscribe", {
          name: `${first_name + " " + last_name}`,
          email: user?.email || "anonymous",
          paymentMethod: paymentMethod.id,
          amount,
        });

        const order = {
          order_type: checkoutData.duration,
          name: `${first_name + " " + last_name}`,
          subscription_id: response?.data?.subscriptionId,
          products_price: checkoutData?.price,
          company: company,
          email: user.email,
          packages: {
            type: checkoutData?.type,
            gender: checkoutData?.gender,
            size: checkoutData?.size,
            selected: checkoutData?.selected,
            package: checkoutData?.quantity,
          },
          contact_email: email,
          delivery_info: {
            country: selectedCountry,
            state: selectedState,
            address: address,
            postcode: post_code,
            city: city,
            phone: phone,
            apartment: apartment,
          },
          promotions: {
            phone_number: numberMassage ? mobile_number : null,
            email: emailMassage ? email : null,
          }
        }

        if (checkoutData?.type === "gift") {
          order.gift = {
            gift_message: checkoutData?.gift_message,
            gift_recipient_email: checkoutData?.gift_recipient_email,
            gift_message_date: checkoutData?.gift_message_date,
            shipping_date: checkoutData?.shipping_date
          }
        }
        axiosSecure.post("/create-order", order)
          .then((res) => {
            if (res?.data?.success) {
              
              cookies.remove("data")
              from.reset()
              navigate("/my-order")
              handleTop()
              setPaymentLoading(false)
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Order successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => console.log(err.message));
        console.log(response);
      } else {
        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: `${first_name + " " + last_name}`,
                email: user?.email || "anonymous",
              },
            },
          });

        if (paymentIntent?.status === "succeeded") {
          if (checkoutData.duration === "payment") {
            const order = {
              order_type: checkoutData.duration,
              name: `${first_name + " " + last_name}`,
              transaction_id: paymentIntent?.id,
              products_price: checkoutData?.price,
              company: company,
              email: user.email,
              packages: {
                type: checkoutData?.type,
                gender: checkoutData?.gender,
                size: checkoutData?.size,
                selected: checkoutData?.selected,
                package: checkoutData?.quantity,

              },
              contact_email: email,
              delivery_info: {
                country: selectedCountry,
                state: selectedState,
                address: address,
                postcode: post_code,
                city: city,
                phone: phone,
                apartment: apartment,
              },
              promotions: {
                phone_number: numberMassage ? mobile_number : null,
                email: emailMassage ? email : null,
              }
            }

            console.log(order?.delivery_info);

            if (checkoutData?.type === "gift") {
              order.gift = {
                gift_message: checkoutData?.gift_message,
                gift_recipient_email: checkoutData?.gift_recipient_email,
                gift_message_date: checkoutData?.gift_message_date,
                shipping_date: checkoutData?.shipping_date
              }
            }

            axiosSecure.post("/create-order", order)
              .then((res) => {
                if (res?.data?.success) {
                  cookies.remove("data")
                  from.reset()
                  navigate("/my-order")
                  handleTop()
                  setPaymentLoading(false)
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              })
              .catch((err) => console.log(err.message));
          }

          if (checkoutData.duration === "cart") {
            axiosSecure.get(`/get-cart/${user.email}`).then((res) => {
              const order = {
                order_type: checkoutData.duration,
                name: `${first_name + " " + last_name}`,
                transaction_id: paymentIntent.id,
                cart_ids:
                  res?.data?.data && res?.data?.data?.map((item) => item._id),
                products:
                  res?.data?.data &&
                  res?.data?.data?.map((item) => {
                    return {
                      id: item.product_id,
                      product_name: item.product_name,
                      quantity: item.quantity,
                      price: item.price,
                    };
                  }),
                company: company,
                email: user?.email,
                contact_email: email,
                delivery_info: {
                  country: selectedCountry,
                  state: selectedState,
                  address: address,
                  postcode: post_code,
                  city: city,
                  phone: phone,
                  apartment: apartment,
                },
                promotions: {
                  phone_number: numberMassage ? mobile_number : null,
                  email: emailMassage ? email : null,
                },
              };
              axiosSecure
                .post("/create-order", order)
                .then((res) => {
                  if (res?.data?.success) {
                    cookies.remove("data")
                    navigate("/my-order")
                    handleTop()
                    setPaymentLoading(false)
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Order successfully",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    setControlCart(!controlCart);
                  }
                })
                .catch((err) => console.log(err.message));
            });
          }
        }

  

        if (confirmError) {
          setPaymentLoading(false)
          console.error("Error confirming card payment:", confirmError);
          return;
        }

        console.log("PaymentIntent:", paymentIntent);
      }
    } catch (error) {
      setPaymentLoading(false)
      console.error("Payment error:", error);
    }
  };

  // if(paymentLoading) return <CheckoutLoading/>
  

  return (
   <form onSubmit={handleSubmit}>
    {paymentLoading && <CheckoutLoading/>}
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
          <label className="text-xl font-semibold text-start">Delivery :</label>
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
              <option value="" disabled>
                Select your country
              </option>
              {Object?.keys(countries)?.map((division, index) => {
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
              required
              className="w-full px-4 outline-none text-[14px]  focus:border-orange-600 relative bg-transparent"
            >
              <option value="" disabled>
                Select your state
              </option>
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
            <span className="text-[12px]">Add apartment, suite, etc.</span>
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
          type="text"
          name="phone"
          required
          placeholder="Phone "
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
                type="text"
                name="mobile_number"
              />
              <span className="absolute top-[6px] left-[28px] text-[10px]">
                Mobile Phone Number
              </span>
            </div>
            <span className="text-[12px] text-justify ">
              By signing up via text, you agree to receive recurring automated
              marketing messages, including cart reminders, at the phone number
              provided. Consent is not a condition of purchase. Reply STOP to
              unsubscribe. Reply HELP for help. Message frequency varies. Msg &
              data rates may apply
            </span>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold text-left my-4">Payment</h2>

      {/* additional data end */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <div className="flex justify-end my-5">
        <button
          className={` bg-[#FF4500] text-white transition-all ease-in-out duration-500 hover:text-[#FF4500] hover:bg-black md:px-14 md:text-xl px-10 font-semibold py-3 rounded-[50px] cursor-pointer`}
          type="submit"
        >
          {checkoutData?.duration === "subscription" ? "Subscribe" : "Pay"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
