import { useEffect, useState } from 'react';
import './HomePage.css';
import CircularProgress from '@mui/material/CircularProgress';
import recipesService from '../services/recipes.services';
import {
  Button,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';

function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  const navigate = useNavigate();

  // const smallScreen = useMediaQuery(
  //   json2mq({
  //     maxWidth: 720,
  //   })
  // );

  const mediumScreen = useMediaQuery(
    json2mq({
      maxWidth: 1100,
    })
  );

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
    <div className="base-wrapper">
      <Container id="homepage-container">
        <Stack
          direction={mediumScreen ? 'column' : 'row'}
          sx={{ alignItems: 'center' }}
        >
          <Stack
            direction="column"
            spacing={2}
            id="description-wrapper"
            sx={{
              width: { xs: '100%', sm: '80%', md: '75%', lg: '50%' },
              textAlign: 'center',
            }}
          >
            <Card
              variant="outlined"
              sx={{
                width: '100%',
                height: { md: 'auto', lg: '520px' },
                borderRadius: {
                  md: '8px 8px 40px 40px',
                  lg: '8px 40px 40px 8px',
                },
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Stack
                  spacing={2}
                  direction={'column'}
                  // sx={{ justifyContent: 'space-around' }}
                >
                  <Typography variant="h3">Welcome to Karela</Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Gowun Batang',
                      fontStyle: 'italic',
                      marginBottom: '4rem',
                    }}
                  >
                    The eternal question: &quot;What shall we eat today?&quot;
                    <br />
                    Here you can store your family classics or discover your
                    friend&apos;s comfort food.
                    <br />
                    We offer a place for you to share the recipes that you love
                    and know and be able to always come back to them.
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: 'Edu AU VIC WA NT', fontWeight: 500 }}
                  >
                    Don&apos;t know what you&apos;re looking for?
                  </Typography>
                  <Button
                    id="random-button"
                    size="large"
                    variant="contained"
                    sx={{
                      width: '40%',
                      alignSelf: 'center',
                      marginTop: '2rem',
                    }}
                    onClick={() => {
                      setRandomRecipe(
                        allRecipes[
                          Math.floor(Math.random() * allRecipes.length)
                        ]
                      );
                    }}
                  >
                    Get a random recipe
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
          <Stack
            className="homepage-wrapper"
            direction={'column'}
            sx={{ width: { xs: '100%', sm: '80%', md: '75%', lg: '50%' } }}
          >
            {!randomRecipe && (
              <p>
                <CircularProgress color="success" size={70}></CircularProgress>
              </p>
            )}
            {randomRecipe && (
              <Card
                variant="outlined"
                sx={{
                  width: '100%',
                  height: { md: 'auto', lg: '520px' },
                  borderRadius: {
                    md: '40px 40px 8px 8px',
                    lg: '40px 8px 8px 40px',
                  },
                  padding: '4rem',
                  textAlign: 'center',
                }}
              >
                <CardContent>
                  <Stack
                    spacing={2}
                    direction={'column'}
                    sx={{
                      justifyContent: 'space-around',
                      height: { xs: 'auto', lg: '300px' },
                    }}
                  >
                    <Typography variant="h4">{randomRecipe.name}</Typography>

                    <Stack
                      direction={'row'}
                      sx={{ justifyContent: 'center' }}
                      className="homepage-recipe-tag-container"
                    >
                      {randomRecipe.tags.map((eachTag) => {
                        return (
                          <div className="tag-wrapper" key={eachTag}>
                            <Typography variant="body2">{eachTag}</Typography>
                          </div>
                        );
                      })}
                    </Stack>
                    <Typography variant="body2">
                      ⏱️ {randomRecipe.duration} mins
                    </Typography>

                    <Typography variant="body2">
                      Author: {randomRecipe.creator.user_name}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontStyle: 'italic', fontFamily: 'Gowun Batang' }}
                    >
                      {randomRecipe.description}
                    </Typography>
                  </Stack>
                  <Button
                    variant="outlined"
                    sx={{ width: '200px', marginTop: '2rem' }}
                    onClick={() => navigate(`/recipes/${randomRecipe._id}`)}
                  >
                    <Typography variant="subtitle1">Go to recipe</Typography>
                  </Button>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default HomePage;
