// src/components/BookingForm.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

const times = ["17:00", "18:00", "19:30"];

describe("BookingForm", () => {
  it("renders the reservation form with all fields", () => {
    render(
      <BookingForm availableTimes={times} dispatch={jest.fn()} submitForm={jest.fn()} />
    );

    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /make your reservation/i })
    ).toBeInTheDocument();
  });

  it("populates the time select with the available times", () => {
    render(
      <BookingForm availableTimes={times} dispatch={jest.fn()} submitForm={jest.fn()} />
    );
    times.forEach((t) => {
      expect(screen.getByRole("option", { name: t })).toBeInTheDocument();
    });
  });

  it("shows a validation error when submitting without a date", () => {
    const submitForm = jest.fn();
    render(
      <BookingForm availableTimes={times} dispatch={jest.fn()} submitForm={submitForm} />
    );

    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(screen.getByText(/please choose a date/i)).toBeInTheDocument();
    expect(submitForm).not.toHaveBeenCalled();
  });

  it("dispatches UPDATE_TIMES when the date changes", () => {
    const dispatch = jest.fn();
    render(
      <BookingForm availableTimes={times} dispatch={dispatch} submitForm={jest.fn()} />
    );

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2030-05-01" },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATE_TIMES",
      date: "2030-05-01",
    });
  });

  it("calls submitForm with the form data when valid", () => {
    const submitForm = jest.fn();
    render(
      <BookingForm availableTimes={times} dispatch={jest.fn()} submitForm={submitForm} />
    );

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2030-05-01" },
    });
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenCalledWith(
      expect.objectContaining({ date: "2030-05-01" })
    );
  });
});