import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { price } = useParams();
  // console.log(price);
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} />
      </Elements>
    </>
  );
};

export default Payment;
