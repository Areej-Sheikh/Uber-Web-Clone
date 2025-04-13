"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe loadStripe
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import CheckoutForm from "./../../components/Home/CheckoutForm";

const Payment = () => {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount");
  const [stripePromise, setStripePromise] = useState(null); // Use state to store Stripe instance

  // Ensuring the amount is a valid number
  const amount = amountParam ? parseFloat(amountParam) : null;

  useEffect(() => {
    // Only load Stripe if the amount is valid
    if (amount) {
      const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
      setStripePromise(stripe);
    }
  }, [amount]);

  // If amount is invalid or Stripe is not loaded yet, you can return a loading message or fallback UI
  if (!amount || !stripePromise) {
    return <div>Loading...</div>;
  }

  const options = {
    mode: "payment",
    amount: Math.round(amount * 100), // Multiply by 100 for Stripe's smallest unit (cents)
    currency: "inr",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default Payment;
