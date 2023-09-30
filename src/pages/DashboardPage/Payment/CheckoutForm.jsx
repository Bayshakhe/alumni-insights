import { Box, Button, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import {
  useCreatePaymentMutation,
  useGivePaymentMutation,
} from "../../../redux/services/paymentService";
import useLoggedUser from "../../../hooks/useLoggedUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ event }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState();
  const [succeed, setSucceed] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [createPayment] = useCreatePaymentMutation();
  const [givePayment] = useGivePaymentMutation();
  const { loggedUser } = useLoggedUser();
  const navigate = useNavigate();

  // console.log(parseInt(event?.ticketPrice));

  // get clientSecret
  useEffect(() => {
    if (parseInt(event?.ticketPrice) > 0) {
      (async () => {
        try {
          const response = await createPayment({
            price: parseInt(event?.ticketPrice),
          });
          console.log(response.data?.clientSecret);
          setClientSecret(response.data?.clientSecret);
        } catch (err) {
          console.log("Error occured when fetching books");
        }
      })();
    }
  }, [event?.ticketPrice, createPayment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setCardError(error?.message);
    } else {
      // console.log("PaymentMethod", paymentMethod);
      setCardError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: loggedUser?.firstName,
            email: loggedUser?.email,
            phone: loggedUser?.phone,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    if (paymentIntent.status === "succeeded") {
      console.log({ paymentIntent });
      const payment = {
        name: loggedUser?.firstName,
        email: loggedUser?.email,
        phone: loggedUser?.phone,
        eventName: event?.name,
        eventId: event?._id,
        location: event?.location,
        time: event?.time,
        date: event?.heldOn,
        ticketPrice: event?.ticketPrice,
      };
      const response = await givePayment(payment);
      // console.log(response);
      if (response?.data?.acknowledged) {
        toast.success("Payment Succesfull");
        setTransactionId(paymentIntent.id);
        setSucceed(true);
        navigate("/dashboard/paymentHistory");
      }
    }
  };
  // console.log(event);
  return (
    <Box width="100%" height="100%" margin="auto">
      <Box
        maxWidth={500}
        margin="auto"
        component="form"
        onSubmit={handleSubmit}
      >
        <Box border="1px solid #309576" p="8px" mb={1}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
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
        </Box>
        {cardError && <Typography color="error">{cardError}</Typography>}
        {succeed && (
          <Typography sx={{ color: "#309576" }}>
            Successfull payment with TransactionId:{transactionId}
          </Typography>
        )}
        <Button
          type="submit"
          disabled={!stripe || !clientSecret}
          variant="contained"
          sx={{
            backgroundColor: "#309576",
            marginTop: "10px",
            "&:hover": {
              background: "white",
              color: "#309576",
              border: "1px solid #309576",
            },
          }}
        >
          Pay
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
