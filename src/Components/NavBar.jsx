import { Link } from "react-router-dom";
import './NavBar.css'


function Navbar() {
  return (
    <header>
      <div id="navbar-container">
      <nav id="nav-links-wrapper">
                <Link to="/" style={{ color: "mediumspringgreen", textDecoration: "none" }}>
                <h4 className="nav-element">Home</h4>
  
                </Link>

                <Link
                  to="/Allrecipes"
                  style={{ color: "black", textDecoration: "none" }}
                >
                <h4 className="nav-element">All Recipes</h4>
                </Link>

      </nav>


      </div>

    </header>
  );
}

export default Navbar;
