import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ amount, clientSecret, isSubscription }) => {
  const { axiosSecure } = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement == null) {
      return;
    }
    try {
      if (isSubscription) {
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

      <button className="btn btn-info btn-sm mt-5 text-white" type="submit">
        {isSubscription ? "Subscribe" : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;