import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import SearchBar from '../Components/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import { Card, Stack, Typography, CardContent, Container } from '@mui/material';
import { useAuth } from '../context/auth.context';
import NoAccess from '../Components/NoAccess.jsx';
import { appTheme } from '../themes/theme.js';
import RecipeCard from '../Components/RecipeCard.jsx';
import { AddRounded } from '@mui/icons-material';
import './Dashboard.css';
import { searchRecipeQuery } from '../services/recipes.services';
import type { Recipe } from '../types/recipe.types.js';

function Dashboard() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  // const [dataLoaded, setDataLoaded] = useState(null);
  const [hasRecipes, setHasRecipes] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (user) {
      searchRecipeQuery(user._id)
        .then((recipes) => {
          setAllRecipes(recipes);
          setIsLoading(false);
          console.log(recipes);
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
      <Container className="page-wrapper" sx={{ p: '40px', maxWidth: '100vw' }}>
        <Container id="Dashboard" sx={{ minWidth: '100vw', margin: '0' }}>
          <Stack direction={'column'} gap={2} sx={{ width: '100%' }}>
            {!isLoggedIn && (
              <>
                <NoAccess></NoAccess>
              </>
            )}

            {isLoggedIn && isLoading && hasRecipes && (
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

                {!isLoading && hasRecipes && allRecipes && (
                  <>
                    {allRecipes.map((eachRecipe: Recipe) => {
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
      </Container>
    </>
  );
}

export default Dashboard;
