import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './RecipeDetailsPage.css';
// import ErrorPage from "./ErrorPage";
import recipesService from '../services/recipes.services';
import { Box, Container, Stack, Typography } from '@mui/material';

function RecipeDetailsPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    recipesService
      .getRecipe(id)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div id="RecipeDetailsPage" className="page-wrapper">
      {!recipe && (
        <CircularProgress
          id="spiner-detailsPage"
          size={100}
          color="success"
        ></CircularProgress>
      )}
      {recipe && (
        <div>
          <Container maxWidth="lg">
            <Stack spacing={2} sx={{ l: { flexDirection: 'row' } }}>
              <Stack
                spacing={1}
                sx={{ alignItems: 'center', maxWidth: '70vw' }}
              >
                <Typography variant="h2">{recipe.name}</Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  {recipe.tags.map((eachTag) => {
                    return (
                      <Typography key={eachTag} variant="h6">
                        {eachTag}
                      </Typography>
                    );
                  })}
                </Stack>
                <Typography variant="h5">⏱️{recipe.duration} mins</Typography>

                <Typography
                  variant="h4"
                  sx={{ textAlign: 'center', width: '80%' }}
                >
                  {recipe.description}
                </Typography>
              </Stack>
              <Box
                sx={{
                  width: '70vw',
                  height: '70vw',
                  display: 'flex',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  id="recipe-details-photo"
                  src={recipe.photo_url}
                  alt={`Photo of ${recipe.name}`}
                />
              </Box>

              <Stack>
                <Typography variant="h4">
                  Ingredients for {recipe.servings} servings:
                </Typography>
                <ul id="recipe-details-ingredient-list">
                  {recipe.ingredientsList.map((eachObject) => (
                    <li key={recipe.id}>
                      <Typography variant="h6">
                        {eachObject.ingredient_name} :{' '}
                        {eachObject.ingredient_amount}{' '}
                        {eachObject.ingredient_measuring}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Stack>

              <div className="recipe-details-preparation-container">
                <Typography variant="h4">Preparation:</Typography>
                <Typography variant="h6">{recipe.preparation}</Typography>
              </div>
            </Stack>
          </Container>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailsPage;
