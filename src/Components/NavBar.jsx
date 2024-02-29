import { Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "../Photos/wtf.png";

function Navbar() {
  return (
    <header>
      
        <nav id="nav-links-wrapper">
          <Link
            to="/"
            style={{ color: "mediumspringgreen", textDecoration: "none" }}
          >
            <img
            id="logo"
              src={Logo}
              alt="What the fridge logo"
              className="nav-element"
            />
          </Link>
          <Link
            to="/"
            style={{ color: "black", textDecoration: "none" }}
          >
            <h4 className="nav-element">Home</h4>
          </Link>

          <Link
            to="/Allrecipes"
            style={{ color: "black", textDecoration: "none" }}
          >
            <h4 className="nav-element">All Recipes</h4>
          </Link>
        </nav>
    </header>
  );
}

export default Navbar;
