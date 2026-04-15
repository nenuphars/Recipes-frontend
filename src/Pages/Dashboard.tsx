import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import SearchBar from '../Components/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import { Card, Stack, Typography, CardContent, Container } from '@mui/material';
import { useAuth } from '../context/auth.context.jsx';
import recipesService from '../services/recipes.services.js';
import NoAccess from '../Components/NoAccess.jsx';
import { appTheme } from '../themes/theme.js';
import RecipeCard from '../Components/RecipeCard.jsx';
import { AddRounded } from '@mui/icons-material';

function Dashboard() {
  const [allRecipes, setAllRecipes] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(null);
  const [hasRecipes, setHasRecipes] = useState(true);

  // const [spinner, setSpinner] = useState([]);

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('user id', user._id);
      recipesService
        .getRecipeQuery(user._id)
        .then((recipes) => {
          setDataLoaded(recipes.data);
          setAllRecipes(recipes.data);
          console.log(recipes.data);
          if (recipes.data.length === 0) {
            setHasRecipes(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <div className="page-wrapper">
        <Container id="Dashboard" sx={{ minWidth: '100vw', margin: '0' }}>
          <Stack direction={'column'} gap={2} sx={{ width: '100%' }}>
            {!isLoggedIn && (
              <>
                <NoAccess></NoAccess>
              </>
            )}

            {isLoggedIn && !dataLoaded && hasRecipes && (
              <CircularProgress
                id="circular-progress-dashboard"
                size={100}
                color="success"
              ></CircularProgress>
            )}
            {isLoggedIn && (
              <Stack
                direction={'row'}
                gap={2}
                sx={{ width: '100%', flexFlow: 'wrap' }}
              >
                <Link
                  to={'/dashboard/CreateRecipe'}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    id="add-recipe-card"
                    variant="outlined"
                    sx={{
                      width: '300px',
                      height: '520px',
                      borderRadius: '8px',
                    }}
                  >
                    <Stack spacing={2}>
                      <div id="add-recipe-plus-icon">
                        <AddRounded
                          color="primary"
                          style={{ fontSize: 175 }}
                        ></AddRounded>
                      </div>
                      <CardContent>
                        <Typography
                          variant="h4"
                          sx={{ color: appTheme.palette.primary.main }}
                        >
                          Add a new recipe
                        </Typography>
                      </CardContent>
                    </Stack>
                  </Card>
                </Link>

                {dataLoaded && hasRecipes && (
                  <>
                    {allRecipes.map((eachRecipe) => {
                      return (
                        <RecipeCard
                          key={eachRecipe._id}
                          recipe={eachRecipe}
                          currentPage="dashboard"
                        ></RecipeCard>
                      );
                    })}
                  </>
                )}
              </Stack>
            )}
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
