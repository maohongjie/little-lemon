# Little Lemon — Table Booking App 🍋

A responsive React web application that lets customers reserve a table at the
fictional **Little Lemon** Mediterranean restaurant. Built as the capstone
project for the **Meta Front-End Developer Professional Certificate** on Coursera.

## Features

- **Table reservation form** — choose a date, an available time slot, party size
  and occasion.
- **Dynamic time slots** — available times update automatically when the date
  changes (via `useReducer` + a simulated `fetchAPI`).
- **Client-side validation** — meaningful, accessible error messages for every
  required field.
- **Accessibility** — semantic HTML, `label`/`htmlFor` pairing, ARIA attributes,
  and keyboard-friendly controls.
- **Responsive design** — layout adapts to mobile, tablet and desktop.
- **Unit tests** — Jest + React Testing Library cover rendering, validation and
  the booking reducer.

## Tech Stack

| Purpose          | Technology                       |
| ---------------- | -------------------------------- |
| UI library       | React 18                         |
| Routing          | React Router v6                  |
| State management | Hooks (`useReducer`, `useState`) |
| Testing          | Jest, React Testing Library      |
| Styling          | CSS                              |

## Project Structure