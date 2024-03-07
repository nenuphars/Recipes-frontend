import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card,} from "@mui/material";
import "./HomePage.css";
import CircularProgress from '@mui/material/CircularProgress';
// import Logo from "../Photos/Logo_fridge.png";

function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
      .then((recipesFromAPI) => {
        console.log(recipesFromAPI.data);
        setAllRecipes(recipesFromAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setRandomRecipe(allRecipes[Math.floor(Math.random() * allRecipes.length)]);
    console.log(randomRecipe);
  }, [allRecipes, randomRecipe]);

  return (
    <div id="homepage-container">
      <div className="homepage-wrapper">
      <div id="description-wrapper">
        <h1 className="homepage-description">
          When you look into your fridge, you have no inspiration? <br></br>
        </h1>
          
        {/* <img src={Logo} id="logo-homepage" alt="logo what the fridge" /> */}
          <span id="homepage-description-cursive-animated">
            What the Fridge
          </span>
        <h2 className="homepage-description">
          wants to help you get out of this misery and prevent any hangriness
          due to not being able to decide what to cook.
        </h2>
        <div className="squiggly" />
        <h2 className="homepage-description">Feeling insecure?</h2>
        <button
          id="random-button"
          size="large"
          onClick={() => {
            setRandomRecipe(
              allRecipes[Math.floor(Math.random() * allRecipes.length)]
            );
          }}
        >
          Get a random recipe
        </button>

      </div>
      </div>
      <div className="homepage-wrapper">
        {!randomRecipe && <p><CircularProgress color="success" size={70} ></CircularProgress></p>}
        {randomRecipe && (
          <Link
            to={`/Allrecipes/${randomRecipe.id}`}
            key={randomRecipe.id}
            style={{ textDecoration: "none" }}
          >
            <Card id="recipeCard">
              <img
                id="random-recipe-img"
                src={randomRecipe.photo_URL}
                alt={`${randomRecipe.name} dish`}
              />
              <h2>{randomRecipe.name}</h2>

              <h4>⏱️ {randomRecipe.duration}</h4>
              <div id="tagContainer">
                {randomRecipe.tags.map((eachTag) => {
                  return <div key={eachTag}>{eachTag}</div>;
                })}
              </div>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;
