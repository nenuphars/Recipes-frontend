import { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchBar from '../Components/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Card,
  Stack,
  Typography,
  CardContent,
  Container,
  Button,
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

  const [spinner, setSpinner] = useState([]);

  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log('user id', user._id);
      recipesService
        .getRecipeQuery({ creator: user._id })
        .then((recipes) => {
          setDataLoaded(recipes.data);
          setAllRecipes(recipes.data);
          setSpinner(recipes.data);
          console.log(recipes.data);
          if (!recipes.data) {
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
      <div id="Dashboard" className="page-wrapper">
        <SearchBar setPropsRecipes={setAllRecipes}></SearchBar>
        {allRecipes.length === 0 && spinner.length > 0 && (
          <Container className="no-recipe-match-container">
            <Typography variant="h2">No recipe matches your search</Typography>
            <Button
              id="button-see-all"
              onClick={() => {
                location.reload();
              }}
            >
              See all recipes
            </Button>
          </Container>
        )}

        {spinner.length === 0 && allRecipes.length === 0 && (
          <CircularProgress
            id="circular-progress-allRecipes"
            size={100}
            color="success"
          ></CircularProgress>
        )}

        {!isLoggedIn && (
          <>
            <NoAccess></NoAccess>
          </>
        )}
        {isLoggedIn && !dataLoaded && !hasRecipes && (
          <CircularProgress
            id="circular-progress-dashboard"
            size={100}
            color="success"
          ></CircularProgress>
        )}
        {isLoggedIn && (
          <Container id="dashboard-container">
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
          </Container>
        )}
      </div>
    </>
  );
}

export default Dashboard;
