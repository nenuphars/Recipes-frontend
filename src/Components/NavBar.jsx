import { Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "../assets/KARELA(1).png";
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
        <div id="logo-name-wrapper">
          
            <img
            id="logo"
              src={Logo}
              alt="What the fridge logo"
              className="nav-element"
            />
            <h2 id="home-name">KARELA</h2>

        </div>
          </Link>

          <Link
            to="/recipes"
            onClick={() => setCurrentPage('recipes')}
          >
            <h4  className={currentPage === "recipes" ? "nav-element selected-element" : 'nav-element' }>All Recipes</h4>
          </Link>
          <Link
            to="/FAQ"
            onClick={() => setCurrentPage('FAQ')}
          >
            <h4  className={currentPage === "FAQ" ? "nav-element selected-element" : 'nav-element' }>FAQ</h4>
          </Link>
        </nav>
    </header>
  );
}

export default Navbar;
