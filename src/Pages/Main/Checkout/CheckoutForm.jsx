import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useCheckoutData } from "../../../context/CheckoutProvider";
import Swal from "sweetalert2";

const CheckoutForm = ({
  amount,
  clientSecret,
  first_name,
  last_name,
  company,
  address,
  apartment,
  post_code,
  city,
  phone,
  mobile_number

}) => {
  const { axiosSecure } = useAxiosSecure();
  const { checkoutData } = useCheckoutData()
  const stripe = useStripe();
  const elements = useElements();
  console.log(10, checkoutData?.duration)
  const isDisabled = !first_name || !last_name || !company || !address || !apartment || !post_code || !city || !phone || !mobile_number
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (isDisabled) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Please fill all * mark required fill",
    //     footer: '<a href="#">Why do I have this issue?</a>'
    //   });

    // }
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
          name: "babu",
          email: "babubhaiya@gmail.com",
          paymentMethod: paymentMethod.id,
          amount,
        });

        console.log(response)

      } else {
        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: "babu",
                email: "babubhaiya@gmail.com",
              },
            },
          });

        if (confirmError) {
          console.error("Error confirming card payment:", confirmError);
          return;
        }

        console.log("PaymentIntent:", paymentIntent);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <button className={` bg-[#FF4500] text-white transition-all ease-in-out duration-500 hover:text-[#FF4500] hover:bg-black md:px-14 md:text-xl px-10 font-semibold py-3 rounded-[50px] cursor-pointer`} type="submit">
          {checkoutData?.duration === "subscription" ? "Subscribe" : "Pay"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;