import { useEffect, useState } from 'react';
import './HomePage.css';
import CircularProgress from '@mui/material/CircularProgress';
import recipesService from '../services/recipes.services';
import RecipeCard from '../Components/RecipeCard';
import { Button, Container, Stack, Typography, Box } from '@mui/material';
// import Logo from "../Photos/Logo_fridge.png";

function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    recipesService
      .getAllRecipes()
      .then((recipesFromAPI) => {
        const recipeIds = recipesFromAPI.data.filter(
          (oneRecipe) => oneRecipe._id
        );
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
    <div className="page-wrapper">
      <Container id="homepage-container">
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Stack
            direction="column"
            spacing={2}
            id="description-wrapper"
            sx={{ width: '50%', textAlign: 'center' }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: 'Edu AU VIC WA NT', fontWeight: 500 }}
            >
              KARELA
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '4rem' }}>
              also called Bitter Melon or Bitter Gourd, is a vegetable that has
              a special taste and look.
              <br />
              Not everyone will like it, but for some it&apos;s a favourite.
              Here you can share your family classics or discover your
              friend&apos;s comfort food.
              <br />
              Cooking healthy and delicious food isn&apos;t always easy. But
              Karela is here to give you a place to share the recipe&apos;s that
              you love and know and always come back to them.
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Edu AU VIC WA NT', fontWeight: 300 }}
            >
              Don&apos;t know what you&apos;re looking for?
            </Typography>
            <Button
              id="random-button"
              size="large"
              variant="contained"
              sx={{ width: '40%', alignSelf: 'center' }}
              onClick={() => {
                setRandomRecipe(
                  allRecipes[Math.floor(Math.random() * allRecipes.length)]
                );
              }}
            >
              Get a random recipe
            </Button>
          </Stack>
          <Stack className="homepage-wrapper" direction={'column'}>
            {!randomRecipe && (
              <p>
                <CircularProgress color="success" size={70}></CircularProgress>
              </p>
            )}
            {randomRecipe && (
              <RecipeCard recipe={randomRecipe} currentPage="home" />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default HomePage;
