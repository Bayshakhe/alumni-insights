import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useGetSingleUpcomingEventQuery } from "../../../redux/services/eventService";

const Payment = () => {
  const { id } = useParams();
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK);
  const { data } = useGetSingleUpcomingEventQuery(id);
  // console.log(data);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm event={data} />
      </Elements>
    </>
  );
};

export default Payment;
