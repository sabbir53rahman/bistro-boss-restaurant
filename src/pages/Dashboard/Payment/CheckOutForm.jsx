import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";

function CheckOutForm() {
  const [paymentState, setPaymentState] = useState({
    loading: false,
    error: null,
    transactionId: null,
  });
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cart] = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      const token = localStorage.getItem("access-token");
    const amountInCents = totalPrice * 100;

    // Create PaymentIntent
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: amountInCents }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.error("Error creating PaymentIntent:", err);
      });
    }

    
  }, [cart, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    setPaymentState({ ...paymentState, loading: true, error: null });

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentState({ ...paymentState, loading: false, error: error.message });
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous@example.com",
          name: user?.displayName || "Anonymous User",
        },
      },
    });

    if (confirmError) {
      Swal.fire({
        title: "Payment Failed!",
        text: confirmError.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
      setPaymentState({ ...paymentState, loading: false });
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setPaymentState({ ...paymentState, loading: false, transactionId: paymentIntent.id });

      Swal.fire({
        title: "Payment Successful!",
        text: `Transaction ID: ${paymentIntent.id}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.itemId),
        status: "pending",
      };

      const token = localStorage.getItem("access-token");

      try {
        const response = await fetch("http://localhost:5000/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        className={`bg-hotel-primary text-white px-6 py-2 rounded-md hover:bg-hotel-secondary transition-all mt-[30px] ${
          paymentState.loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!stripe || !clientSecret || paymentState.loading}
      >
        {paymentState.loading ? "Processing..." : "Pay"}
      </button>
      {paymentState.error && <p className="text-red-600">{paymentState.error}</p>}
      {paymentState.transactionId && (
        <p className="text-green-600">Your transaction ID: {paymentState.transactionId}</p>
      )}
    </form>
  );
}

export default CheckOutForm;
