import { useEffect } from 'react';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Button, Container, Stack, Typography } from '@mui/material';
import recipesService from '../services/recipes.services.js';
import SearchBar from '../Components/SearchBar.js';
import RecipeCard from '../Components/RecipeCard.js';
import './AllRecipesPage.css';

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
      <Container className="page-wrapper" sx={{ p: '40px', maxWidth: '100vw' }}>
        <Container id="AllRecipes" sx={{ minWidth: '100vw', margin: '0' }}>
          <Stack direction={'column'} gap={2} sx={{ width: '100%' }}>
            <SearchBar setPropsRecipes={setAllRecipes}></SearchBar>
            {allRecipes.length === 0 && spinner.length > 0 && (
              <div className="no-recipe-match-container">
                <Typography variant="h2">
                  No recipe matches your search
                </Typography>
                <Button
                  id="button-see-all"
                  onClick={() => {
                    location.reload();
                  }}
                >
                  See all recipes
                </Button>
              </div>
            )}

            {spinner.length === 0 && allRecipes.length === 0 && (
              <CircularProgress
                id="circular-progress-allRecipes"
                size={100}
                color="success"
              ></CircularProgress>
            )}
            <Stack
              direction={'row'}
              gap={2}
              sx={{ width: '100%', flexFlow: 'wrap' }}
            >
              {allRecipes.map((eachRecipe, index) => {
                return (
                  <RecipeCard
                    recipe={eachRecipe}
                    currentPage="recipes"
                    key={index}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Container>
      </Container>
    </>
  );
}

export default AllRecipesPage;
