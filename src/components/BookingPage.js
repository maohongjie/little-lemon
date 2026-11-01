// src/components/BookingPage.js
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import { fetchAPI, submitAPI } from "../utils/api";

/**
 * Reducer that owns the list of available times.
 * Kept outside the component so it stays pure and easy to test.
 */
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return fetchAPI(new Date(action.date));
    default:
      return state;
  }
};

/** Lazily initialise the times for today's date. */
export const initializeTimes = () => fetchAPI(new Date());

const BookingPage = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const navigate = useNavigate();

  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) navigate("/confirmed");
  };

  return (
    <section className="booking-page" aria-labelledby="booking-heading">
      <h1 id="booking-heading">Reserve a table</h1>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
};

export default BookingPage;