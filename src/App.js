// src/App.js
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookingPage from "./components/BookingPage";
import ConfirmedBooking from "./components/ConfirmedBooking";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;