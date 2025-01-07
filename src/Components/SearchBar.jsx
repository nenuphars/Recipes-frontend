import './searchBar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import recipesService from '../services/recipes.services';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
// import { use } from 'react';
import { appTheme } from '../themes/theme';

function SearchBar({ setPropsRecipes }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  // const [searchType, setSearchType] = useState('name');

  const smallScreen = useMediaQuery(
    json2mq({
      maxWidth: 720,
    })
  );

  // search query state
  const [activeQuery, setActiveQuery] = useState('');

  const [selectedSearchType, setSelectedSearchType] = useState('name');

  // gets data once
  useEffect(() => {
    recipesService
      .getAllRecipes()
      .then((recipes) => {
        setAllRecipes(recipes.data);
        setFilteredRecipes(recipes.data);
        console.log(recipes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (activeQuery === '') {
      setFilteredRecipes(allRecipes);
      setPropsRecipes(allRecipes);
    } else {
      let filtered;
      const searchTerm = activeQuery.toLowerCase();

      if (selectedSearchType === 'name') {
        filtered = allRecipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchTerm)
        );
      } else if (selectedSearchType === 'ingredient') {
        filtered = allRecipes.filter((oneRecipe) =>
          oneRecipe.ingredientsList.some((ingredientObj) =>
            ingredientObj.ingredient_name.toLowerCase().includes(searchTerm)
          )
        );
      } else if (selectedSearchType === 'tag') {
        filtered = allRecipes.filter((oneRecipe) =>
          oneRecipe.tags.some((oneTag) =>
            oneTag.toLowerCase().includes(searchTerm)
          )
        );
      }
      setFilteredRecipes(filtered);
      setPropsRecipes(filtered);
    }
  }, [activeQuery, selectedSearchType, allRecipes, setPropsRecipes]);

  const handleSearchTypeChange = (newType) => {
    setSelectedSearchType(newType);
  };

  const handleSearchQuery = (e) => {
    setActiveQuery(e.target.value);
  };

  function clearSearch() {
    setFilteredRecipes(allRecipes);
    setActiveQuery('');
  }

  return (
    <div id="search-bar-container">
      <Stack sx={{ width: '70vw' }} gap={2}>
        <ButtonGroup variant="text" aria-label="Basic button group">
          <Button
            variant={selectedSearchType === 'name' ? 'contained' : 'outlined'}
            sx={{
              color: appTheme.palette.offwhite.main,
              backgroundColor:
                selectedSearchType === 'name'
                  ? appTheme.palette.secondary.main
                  : appTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: appTheme.palette.secondary.main,
              },
            }}
            onClick={() => {
              handleSearchTypeChange('name');
            }}
          >
            Title
          </Button>
          <Button
            variant={
              selectedSearchType === 'ingredient' ? 'contained' : 'outlined'
            }
            sx={{
              color: appTheme.palette.offwhite.main,
              backgroundColor:
                selectedSearchType === 'ingredient'
                  ? appTheme.palette.secondary.main
                  : appTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: appTheme.palette.secondary.main,
              },
            }}
            onClick={() => {
              handleSearchTypeChange('ingredient');
            }}
          >
            Ingredient
          </Button>
          <Button
            variant={selectedSearchType === 'tag' ? 'contained' : 'outlined'}
            sx={{
              color: appTheme.palette.offwhite.main,
              backgroundColor:
                selectedSearchType === 'tag'
                  ? appTheme.palette.secondary.main
                  : appTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: appTheme.palette.secondary.main,
              },
            }}
            onClick={() => {
              handleSearchTypeChange('tag');
            }}
          >
            Tag
          </Button>
        </ButtonGroup>

        <TextField
          label="Search"
          value={activeQuery}
          onChange={(e) => handleSearchQuery(e)}
          InputProps={{
            input: {
              startAdornment: <SearchIcon />,
            },
            endAdornment: (
              <Button onClick={clearSearch}>
                <CloseIcon />
              </Button>
            ),
          }}
        />
      </Stack>

      {activeQuery && (
        <div>
          <Stack
            spacing={0}
            sx={{ width: '30%', position: 'absolute', zIndex: 100 }}
          >
            {filteredRecipes.map((eachRecipe) => {
              return (
                <Link
                  to={`/recipes/${eachRecipe._id}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                  key={eachRecipe._id}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '40px',
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2">{eachRecipe.name}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </Stack>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
