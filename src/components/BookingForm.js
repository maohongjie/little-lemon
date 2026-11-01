// src/components/BookingForm.js
import { useState } from "react";
import "./BookingForm.css";

/**
 * Controlled booking form for Little Lemon.
 * Owns its field state and performs client-side validation.
 *
 * @param {Object}   props
 * @param {string[]} props.availableTimes  Time slots for the selected date.
 * @param {Function} props.dispatch        Dispatches "UPDATE_TIMES" to the page reducer.
 * @param {Function} props.submitForm      Receives validated data on submit.
 */
const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState(availableTimes[0] || "");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("Birthday");
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const next = {};

    if (!values.date) {
      next.date = "Please choose a date for your reservation.";
    } else {
      const chosen = new Date(values.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) next.date = "Reservation date cannot be in the past.";
    }

    if (!values.time) next.time = "Please select an available time slot.";

    const guestCount = Number(values.guests);
    if (!Number.isInteger(guestCount) || guestCount < 1) {
      next.guests = "Please enter the number of guests (at least 1).";
    } else if (guestCount > 10) {
      next.guests = "For parties larger than 10, please call the restaurant.";
    }

    if (!values.occasion) next.occasion = "Please select an occasion.";

    return next;
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    dispatch({ type: "UPDATE_TIMES", date: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = { date, time, guests, occasion };
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) submitForm(values);
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-label="Table reservation form"
      noValidate
    >
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={handleDateChange}
        aria-describedby={errors.date ? "date-error" : undefined}
        aria-invalid={!!errors.date}
        required
      />
      {errors.date && (
        <span id="date-error" className="error" role="alert">
          {errors.date}
        </span>
      )}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        aria-describedby={errors.time ? "time-error" : undefined}
        aria-invalid={!!errors.time}
        required
      >
        <option value="" disabled>
          Select a time
        </option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      {errors.time && (
        <span id="time-error" className="error" role="alert">
          {errors.time}
        </span>
      )}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        aria-describedby={errors.guests ? "guests-error" : undefined}
        aria-invalid={!!errors.guests}
        required
      />
      {errors.guests && (
        <span id="guests-error" className="error" role="alert">
          {errors.guests}
        </span>
      )}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Engagement">Engagement</option>
      </select>

      <input type="submit" value="Make Your Reservation" />
    </form>
  );
};

export default BookingForm;