import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './RecipeDetailsPage.css';
// import ErrorPage from "./ErrorPage";
import recipesService from '../services/recipes.services';
import { Container, Stack, Typography } from '@mui/material';

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
        <Container
          sx={{
            zIndex: 0,
            fontFamily: 'Gowun Batang',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            id="recipe-details-outer-stack"
            spacing={6}
            direction="column"
            sx={{
              width: '60%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack
              id="recipe-details-stack"
              direction="column"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                {recipe.name}
              </Typography>
              <Stack id="recipe-tags-stack" direction="row">
                {recipe.tags.map((eachTag) => {
                  return (
                    <Typography
                      key={eachTag}
                      variant="h6"
                      sx={{ fontFamily: 'Gowun Batang' }}
                    >
                      {eachTag}
                    </Typography>
                  );
                })}
              </Stack>
              <Typography variant="h5" sx={{ fontFamily: 'Gowun Batang' }}>
                ⏱️{recipe.duration} mins
              </Typography>
            </Stack>

            <Stack id="recipe-details-responsive-stack" direction="row">
              <Stack
                id="recipe-details-info-wrapper"
                direction="column"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '5vh',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontFamily: 'Gowun Batang',
                  }}
                >
                  {recipe.description}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              id="recipe-details-ingredients-preparation-stack"
              direction={{ md: 'column', lg: 'row' }}
              sx={{ width: '80vw' }}
            >
              <Stack
                id="recipe-details-ingredients-stack"
                sx={{
                  width: { lg: '50%', md: '100%' },
                  display: 'flex',
                  alignItems: 'center',
                  margin: '12px auto',
                }}
              >
                <Typography variant="h5">
                  Ingredients for {recipe.servings} servings:
                </Typography>
                <ul id="recipe-details-ingredient-list">
                  {recipe.ingredientsList.map((eachObject, index) => (
                    <li key={index}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: 'Gowun Batang' }}
                      >
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
                  width: { lg: '50%', md: '100%' },
                  display: 'flex',
                  alignItems: 'center',
                  margin: '12px auto',
                  padding: '0 24px',
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: '30px' }}>
                  Preparation:
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: 'Gowun Batang' }}>
                  {recipe.preparation}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </div>
  );
}

export default RecipeDetailsPage;
