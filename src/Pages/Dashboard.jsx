import { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import SearchBar from '../Components/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Card,
  Stack,
  Typography,
  CardContent,
  Container,
} from '@mui/material';
import recipesService from '../services/recipes.services';
import RecipeCard from '../Components/RecipeCard';
import { AuthContext } from '../context/auth.context';
import NoAccess from '../Components/NoAccess';
import { appTheme } from '../themes/theme';

function Dashboard() {
  const [allRecipes, setAllRecipes] = useState('');
  const [dataLoaded, setDataLoaded] = useState('');
  const [hasRecipes, setHasRecipes] = useState(true);

  // const [spinner, setSpinner] = useState([]);

  const { user, isLoggedIn } = useContext(AuthContext);

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
                        <AddRoundedIcon
                          color="primary"
                          style={{ fontSize: 175 }}
                        ></AddRoundedIcon>
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
