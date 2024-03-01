import { Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "../Photos/wtf.png";
import { useState } from "react";

function Navbar() {
  const [currentPage, setCurrentPage] = useState('home')
  return (
    <header>
      
        <nav id="nav-links-wrapper">
          <Link
            to="/"
            style={{ color: "mediumspringgreen", textDecoration: "none" }}
            onClick={() => setCurrentPage('/')}
          >
            <img
            id="logo"
              src={Logo}
              alt="What the fridge logo"
              className="nav-element"
            />
          </Link>

          <Link
            to="/Allrecipes"
            style={{ color: "black", textDecoration: "none" }}
            onClick={() => setCurrentPage('Allrecipes')}
          >
            <h4  className={currentPage === "Allrecipes" ? "selected-element" : 'nav-element' }>All Recipes</h4>
          </Link>
        </nav>
    </header>
  );
}

export default Navbar;
