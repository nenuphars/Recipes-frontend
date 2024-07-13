import { Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "../assets/KARELA(1).png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const [currentPage, setCurrentPage] = useState("home");

  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <header>
      <nav id="nav-links-wrapper">
        <Link to="/" id="home-wrapper" className="nav-element" onClick={() => setCurrentPage("/")}>
          <div id="home-link-logo-wrapper">
            <img
              id="logo"
              src={Logo}
              alt="Karela Logo"
            />
          </div>
            <h2 id="home-name">KARELA</h2>
        </Link>

        <Link to="/recipes" className="nav-element" onClick={() => setCurrentPage("recipes")}>
          <h4
            className={
              currentPage === "recipes"
                ? "nav-heading selected-element"
                : "nav-heading"
            }
          >
            All Recipes
          </h4>
        </Link>

        <Link to="/FAQ" className="nav-element" onClick={() => setCurrentPage("FAQ")}>
          <h4
            className={
              currentPage === "FAQ"
                ? "nav-heading selected-element"
                : "nav-heading"
            }
          >
            FAQ
          </h4>
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" className="nav-element" onClick={() => setCurrentPage("login")}>
              <h4
                className={
                  currentPage === "login"
                    ? "nav-heading selected-element"
                    : "nav-heading"
                }
              >
                Login
              </h4>
            </Link>

            <Link to="/signup" className="nav-element" onClick={() => setCurrentPage("signup")}>
              <h4
                className={
                  currentPage === "signup"
                    ? "nav-heading selected-element"
                    : "nav-heading"
                }
              >
                Sign Up
              </h4>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/favorites" className="nav-element" onClick={() => setCurrentPage("favorites")}>
              <h4
                className={
                  currentPage === "favorites"
                    ? "nav-heading selected-element"
                    : "nav-heading"
                }
              >
                Favorites
              </h4>
            </Link>

            <Link
              to="/"
              className="nav-alement"
              onClick={() => {
                logOutUser();
                setCurrentPage("home");
              }}
            >
              <h4 className="nav-heading">Logout</h4>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
