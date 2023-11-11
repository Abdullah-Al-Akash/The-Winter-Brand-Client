import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState()
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!stripe || !elements) return;
        setIsLoading(true)
        const { error, paymentIntent } = stripe.createPaymentMethod({
            elements,
            type: "card",
            redirect: "if_required"
        })

        console.log(paymentIntent)
        if (error) {
            setMessage(error.message)
            setIsLoading(false)

        }
        else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false)
            console.log("create order")
            // TODO create order
        }
    }
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element"
            // Access the email value like so:
            // onChange={(event) => {
            //  setEmail(event.value.email);
            // }}
            //
            // Prefill the email field like so:
            // options={{defaultValues: {email: 'foo@bar.com'}}}
            />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className='brand-btn p-4 my-5'>
                    {isLoading ? <div className="spinner" id="spinner">Paying...</div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;



// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect } from "react";
// import { useState } from "react";


// import Swal from "sweetalert2";

// import { useCheckoutData } from "../../../context/CheckoutProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useAuth } from "../../../AuthProvider/AuthProvider";


// const CheckoutForm = () => {
//     const { checkoutData } = useCheckoutData()
//     const stripe = useStripe();
//     const elements = useElements();
//     const { user } = useAuth();
//     const { axiosSecure } = useAxiosSecure()
//     const [cardError, setCardError] = useState('');
//     const [clientSecret, setClientSecret] = useState('');
//     const [processing, setProcessing] = useState(false);
//     const [transactionId, setTransactionId] = useState('');

//     useEffect(() => {
//         if (checkoutData.price > 0) {
//             axiosSecure.post('/payment', { price: Math.round(checkoutData.price * 100) })
//                 .then(res => {
//                     setClientSecret(res.data.clientSecret);
//                 })
//         }
//     }, [checkoutData, axiosSecure])


//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return
//         }

//         const card = elements.getElement(CardElement);
//         if (card === null) {
//             return
//         }

//         const { error } = await stripe.createPaymentMethod({
//             type: 'card',
//             card
//         })

//         if (error) {
//             setCardError(error.message);
//         }
//         else {
//             setCardError('');
//         }

//         setProcessing(true)

//         const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
//             clientSecret,
//             {
//                 payment_method: {
//                     card: card,
//                     billing_details: {
//                         email: user?.email || 'unknown',
//                         name: user?.displayName || 'anonymous'
//                     },
//                 },
//             },
//         );

//         if (confirmError) {
//             setCardError(confirmError);
//         }


//         setProcessing(false)
//         if (paymentIntent.status === 'succeeded') {
//             alert("payment successfull")
//             //     const payment = {
//             //         email: user?.email,
//             //         transactionId: paymentIntent.id,
//             //         price,
//             //         date: new Date(),
//             //         quantity: selectedClasses.length,
//             //         selectedClasses: selectedClasses.map(item => item._id),
//             //         classes: selectedClasses.map(item => item.class_id),
//             //         status: 'pending',
//             //         itemNames: selectedClasses.map(item => item.class_name)
//             //     }
//             //     axiosSecure.post('/payments', payment)
//             //         .then(res => {
//             //             if (res.data.insertResult.insertedId) {
//             //                 Swal.fire({
//             //                     position: 'center',
//             //                     icon: 'success',
//             //                     title: 'Payment successfull',
//             //                     showConfirmButton: false,
//             //                     timer: 1000
//             //                 })
//             //             }
//             //         })
//         }


//     }

//     return (
//         <>
//             <form className="w-2/3 m-8" onSubmit={handleSubmit}>
//                 <CardElement
//                     options={{
//                         style: {
//                             base: {
//                                 fontSize: '16px',
//                                 color: '#424770',
//                                 '::placeholder': {
//                                     color: '#aab7c4',
//                                 },
//                             },
//                             invalid: {
//                                 color: '#9e2146',
//                             },
//                         },
//                     }}
//                 />
//                 <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
//                     Pay
//                 </button>
//             </form>
//             {cardError && <p className="text-red-600 ml-8">{cardError}</p>}

//         </>
//     );
// };

// export default CheckoutForm;