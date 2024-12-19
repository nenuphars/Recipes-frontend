import { useEffect } from 'react';
import { useState } from 'react';
import './AllRecipesPage.css';
// import Card from "@mui/material/Card";
// import { Link } from "react-router-dom";
import SearchBar from '../Components/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import recipesService from '../services/recipes.services';
import RecipeCard from '../Components/RecipeCard';
import { Container, Typography } from '@mui/material';

function AllRecipesPage() {
  const [spinner, setSpinner] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    recipesService
      .getAllRecipes()
      .then((recipes) => {
        setSpinner(recipes.data);
        setAllRecipes(recipes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div id="AllRecipes" className="page-wrapper">
        <SearchBar setPropsRecipes={setAllRecipes}></SearchBar>
        {allRecipes.length === 0 && spinner.length > 0 && (
          <div className="no-recipe-match-container">
            <Typography variant="h2">No recipe matches your search</Typography>
            <button
              id="button-see-all"
              onClick={() => {
                location.reload();
              }}
            >
              See all recipes
            </button>
          </div>
        )}

        {spinner.length === 0 && allRecipes.length === 0 && (
          <CircularProgress
            id="circular-progress-allRecipes"
            size={100}
            color="success"
          ></CircularProgress>
        )}
        <Container id="all-recipes-container">
          {allRecipes.map((eachRecipe, index) => {
            return (
              <RecipeCard
                recipe={eachRecipe}
                currentPage="recipes"
                key={index}
              />
            );
          })}
        </Container>
      </div>
    </>
  );
}

export default AllRecipesPage;
