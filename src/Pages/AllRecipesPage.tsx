import { useEffect } from 'react';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Container, Stack, Typography } from '@mui/material';
import { getAllRecipes } from '../services/recipes.services.js';
import SearchBar from '../Components/SearchBar.js';
import RecipeCard from '../Components/RecipeCard.js';
import './AllRecipesPage.css';
import type { Recipe } from '../types/recipe.types.js';

function AllRecipesPage() {
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    getAllRecipes()
      .then((recipes) => {
        setAllRecipes(recipes);
        if (allRecipes.length >= 1) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [isFiltering]);

  return (
    <>
      <Container className="page-wrapper" sx={{ p: '40px', maxWidth: '100vw' }}>
        <Container id="AllRecipes" sx={{ minWidth: '100vw', margin: '0' }}>
          <Stack direction={'column'} gap={2} sx={{ width: '100%' }}>
            <SearchBar
              setAllRecipes={setAllRecipes}
              setIsFiltering={setIsFiltering}
            ></SearchBar>
            {allRecipes.length === 0 && !loading && isFiltering && (
              <div className="no-recipe-match-container">
                <Typography variant="h2">
                  No recipe matches your search
                </Typography>
                <Button
                  id="button-see-all"
                  onClick={() => {
                    setIsFiltering(false);
                  }}
                >
                  See all recipes
                </Button>
              </div>
            )}

            {!allRecipes && loading && (
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
              {allRecipes &&
                allRecipes.map((eachRecipe, index) => {
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
