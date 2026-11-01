// src/components/BookingPage.test.js
import { initializeTimes, updateTimes } from "./BookingPage";

describe("booking times reducer", () => {
  it("initializeTimes returns a non-empty array of time slots", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  it("updateTimes returns the times for the given date", () => {
    const action = { type: "UPDATE_TIMES", date: "2030-05-01" };
    const result = updateTimes([], action);
    expect(Array.isArray(result)).toBe(true);
  });

  it("updateTimes returns the same state for an unknown action", () => {
    const state = ["17:00"];
    expect(updateTimes(state, { type: "UNKNOWN" })).toBe(state);
  });
});