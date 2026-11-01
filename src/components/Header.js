// src/components/Header.js
import { Link } from "react-router-dom";

const Header = () => (
  <header className="site-header">
    <nav aria-label="Main navigation">
      <Link to="/">Little Lemon</Link>
      <Link to="/booking">Reserve a table</Link>
    </nav>
  </header>
);

export default Header;