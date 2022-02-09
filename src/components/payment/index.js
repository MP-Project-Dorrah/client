import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const state = useSelector((state) => {
    return state;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    let now2 = new Date();
    let now = new Date();
    console.log(now, "startDate");

    if (!error) {
      try {
        const { id } = paymentMethod;

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/subscribe/payment`,
          {
            amount: 1000,
            id,
            userId: state.signIn.userID,
            startDate: now2,
            endDate: now.setDate(now.getDate() + 30),
            paymentMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          props.getOneUser();
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="cardElement">
      {!success && (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement />
            </div>
          </fieldset>
          <button className="subscribeBtnn"> Subscribe </button>
        </form>
      )}
    </div>
  );
}
