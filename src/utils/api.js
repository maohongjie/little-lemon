// src/utils/api.js
// Simulated API layer for the Little Lemon booking app.
// Mirrors the interface the course provides: fetchAPI(date) / submitAPI(formData).

const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => (s = (s * a) % m) / m;
};

/**
 * Returns available booking times (e.g. "17:00") for a given date.
 * Deterministic per date thanks to the seeded generator.
 * @param {Date} date
 * @returns {string[]}
 */
export function fetchAPI(date) {
  const result = [];
  const random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) result.push(`${i}:00`);
    if (random() < 0.5) result.push(`${i}:30`);
  }
  return result;
}

/**
 * Simulates submitting a booking.
 * @param {Object} formData
 * @returns {boolean} true when the booking is accepted
 */
export function submitAPI(formData) {
  // Always succeeds in the mock; swap for a real POST in production.
  return true;
}