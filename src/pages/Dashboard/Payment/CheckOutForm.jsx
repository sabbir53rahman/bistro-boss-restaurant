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
    // Get the token from localStorage
    const token = localStorage.getItem("access-token");
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  
    // Log values for debugging
    console.log("Total Price:", totalPrice);
    console.log("Authorization Token:", token);
  
    // Convert the price to cents (if it's in dollars)
    const amountInCents = totalPrice * 100;
  
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: amountInCents }), // Send amount in cents
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || "Failed to create PaymentIntent");
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Payment Intent Created: ", data);
        setClientSecret(data.clientSecret); // Update state with client secret
      })
      .catch((err) => {
        console.error("Error creating PaymentIntent:", err);
      });
  }, [cart]); // Ensure that the effect runs when `cart` changes
  
  

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


        // now savce the payment info in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js
          cartIds: cart.map(item => item._id),
          menuItems: cart.map(item => item.itemId),
          status: 'panding'
        }

        try {
          const response = await fetch("http://localhost:5000/payments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payment),
          });
  
          const data = await response.json();
          if (response.ok) {
            console.log("Payment saved successfully:", data);
          } else {
            console.error("Error saving payment:", data.message);
          }
        } catch (error) {
          console.error("Error posting payment:", error);
        }
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
