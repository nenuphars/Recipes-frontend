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
        <Container sx={{ zIndex: 0, fontFamily: 'Gowun Batang' }}>
          <Stack id="recipe-details-outer-stack" spacing={6} direction="column">
            <Stack
              id="recipe-details-stack"
              direction="column"
              sx={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h2"
                sx={{ textAlign: 'center', fontFamily: 'Edu AU VIC WA NT' }}
              >
                {recipe.name}
              </Typography>
              <Stack id="recipe-tags-stack" direction="row">
                {recipe.tags.map((eachTag) => {
                  return (
                    <Typography key={eachTag} variant="h6">
                      {eachTag}
                    </Typography>
                  );
                })}
              </Stack>
              <Typography variant="h5">⏱️{recipe.duration} mins</Typography>
            </Stack>

            <Stack
              id="recipe-details-responsive-stack"
              direction={{ xs: 'column', md: 'row' }}
            >
              <Stack
                id="recipe-details-info-wrapper"
                direction="column"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { md: '50%', sx: '100%' },
                  marginBottom: '5vh',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    width: '80%',
                  }}
                >
                  {recipe.description}
                </Typography>
              </Stack>

              <Stack
                id="recipe-details-image-stack"
                spacing={2}
                sx={{
                  width: { md: '50%', xs: '70%' },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '12px auto',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '10px',
                    width: { md: '40vw', xs: '70vw' },
                    height: { md: '40vw', xs: '70vw' },
                  }}
                >
                  <img
                    id="recipe-details-photo"
                    src={recipe.photo_url}
                    alt={`Photo of ${recipe.name}`}
                  />
                </Box>
              </Stack>
            </Stack>

            <Stack
              id="recipe-details-ingredients-preparation-stack"
              direction={{ xs: 'column', md: 'row' }}
            >
              <Stack
                id="recipe-details-ingredients-stack"
                sx={{
                  width: { md: '50%', sx: '100%' },
                  display: 'flex',
                  alignItems: 'center',
                  margin: '12px auto',
                }}
              >
                <Typography variant="h4">
                  Ingredients for {recipe.servings} servings:
                </Typography>
                <ul id="recipe-details-ingredient-list">
                  {recipe.ingredientsList.map((eachObject, index) => (
                    <li key={index}>
                      <Typography variant="h6">
                        {eachObject.ingredient_name} :{' '}
                        {eachObject.ingredient_amount}{' '}
                        {eachObject.ingredient_measuring}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Stack>
              <Stack
                id="recipe-details-preparation-stack"
                sx={{
                  width: { md: '50%', sx: '100%' },
                  display: 'flex',
                  alignItems: 'center',
                  margin: '12px auto',
                  padding: '0 24px',
                }}
              >
                <Typography variant="h4">Preparation:</Typography>
                <Typography variant="h6">{recipe.preparation}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </div>
  );
}

export default RecipeDetailsPage;
