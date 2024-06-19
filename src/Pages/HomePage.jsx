import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import CircularProgress from '@mui/material/CircularProgress';
import recipesService from "../services/recipes.services";
import RecipeCard from "../Components/RecipeCard";
// import Logo from "../Photos/Logo_fridge.png";

function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    recipesService.getAllRecipes()
      .then((recipesFromAPI) => {
        const recipeIds = recipesFromAPI.data.filter((oneRecipe)=>oneRecipe._id)
        setAllRecipes(recipeIds);
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
          
        <p className="homepage-description">
          Karela is a vegetable that has a special taste and look.<br/>
          Not everyone will like it for it&apos;s bitterness, but for some it&apos;s a favourite.
          On </p>
          <h1 className="homepage-heading">
          Karela
        </h1>
        <p className="homepage-description">
           I want to share recipes in an organised
          and aesthetic way with friends and family.
        </p>
        <h2 className="homepage-description">Don&apos;t know what you&apos;re looking for?</h2>
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
            to={`/Allrecipes/${randomRecipe._id}`}
            key={randomRecipe._id}
            style={{ textDecoration: "none" }}
          >
            <RecipeCard recipe={randomRecipe} currentPage="home"></RecipeCard>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;
