import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";

function CheckOutForm() {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransectionId] = useState('');
  const {user} = useContext(AuthContext)
  const stripe = useStripe();
  const elements = useElements();
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret); // Update state with client secret
        setDpmCheckerLink(data.dpmCheckerLink); // [DEV] For demo purposes only
      })
      .catch((err) => {
        console.error("Error creating PaymentIntent:", err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confrimError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method:{
        card: card,
        billing_details:{
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    })
    if(confrimError){
      console.log('confirm error')
    }else{
      console.log('payment intent', paymentIntent)
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransectionId(paymentIntent.id)
      }
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
      <button
        type="submit"
        className="bg-hotel-primary text-white px-6 py-2 rounded-md hover:bg-hotel-secondary transition-all mt-[30px]"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Your transection id: {transactionId}</p>}
    </form>
  );
}

export default CheckOutForm;
