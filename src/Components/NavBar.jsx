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
        <Link to="/" onClick={() => setCurrentPage("/")}>
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

        <Link to="/recipes" onClick={() => setCurrentPage("recipes")}>
          <h4
            className={
              currentPage === "recipes"
                ? "nav-element selected-element"
                : "nav-element"
            }
          >
            All Recipes
          </h4>
        </Link>

        <Link to="/FAQ" onClick={() => setCurrentPage("FAQ")}>
          <h4
            className={
              currentPage === "FAQ"
                ? "nav-element selected-element"
                : "nav-element"
            }
          >
            FAQ
          </h4>
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" onClick={() => setCurrentPage("login")}>
              <h4
                className={
                  currentPage === "login"
                    ? "nav-element selected-element"
                    : "nav-element"
                }
              >
                Login
              </h4>
            </Link>

            <Link to="/signup" onClick={() => setCurrentPage("signup")}>
              <h4
                className={
                  currentPage === "signup"
                    ? "nav-element selected-element"
                    : "nav-element"
                }
              >
                Sign Up
              </h4>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/favorites" onClick={() => setCurrentPage("favorites")}>
              <h4
                className={
                  currentPage === "favorites"
                    ? "nav-element selected-element"
                    : "nav-element"
                }
              >
                Favorites
              </h4>
            </Link>

            <Link
              to="/"
              onClick={() => {
                logOutUser();
                setCurrentPage("home");
              }}
            >
              <h4 className="nav-element">Logout</h4>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
