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
            onClick={() => setCurrentPage('Allrecipes')}
          >
            <h4  className={currentPage === "Allrecipes" ? "selected-element" : 'nav-element' }>All Recipes</h4>
          </Link>
          <Link
            to="/FAQ"
            onClick={() => setCurrentPage('FAQ')}
          >
            <h4  className={currentPage === "FAQ" ? "selected-element" : 'nav-element' }>FAQ</h4>
          </Link>
        </nav>
    </header>
  );
}

export default Navbar;
