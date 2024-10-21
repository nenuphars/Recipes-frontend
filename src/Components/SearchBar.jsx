import './searchBar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import recipesService from '../services/recipes.services';

function SearchBar({ setPropsRecipes }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchType, setSearchType] = useState('name');

  // search query state
  const [activeQuery, setActiveQuery] = useState('');

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

  // useEffect that keeps track of the search queries when they are typed
  useEffect(() => {
    // resets the recipes list when the search is empty
    if (activeQuery === '') {
      setFilteredRecipes(allRecipes);
      setPropsRecipes(allRecipes);
    }

    // handles the search for name
    else if (searchType === 'name') {
      // setactiveQuery(query)
      let filteredByName = allRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(activeQuery.toLowerCase());
      });
      setFilteredRecipes(filteredByName);
      setPropsRecipes(filteredByName);
    }

    // handles the search for ingredients
    else if (searchType === 'ingredient') {
      // filter the recipes into a new array
      let filteredByIngredient = allRecipes.filter((oneRecipe) => {
        // Check if any ingredient in the recipe matches the search term
        return oneRecipe.ingredientsList.some((ingredientObj) => {
          return ingredientObj.ingredient_name
            .toLowerCase()
            .includes(activeQuery.toLowerCase());
        });
      });
      setFilteredRecipes(filteredByIngredient);
      setPropsRecipes(filteredByIngredient);
    }

    // handles the search for tags
    else if (searchType === 'tags') {
      let filteredByTags = allRecipes.filter((oneRecipe) => {
        // Check if any tag matches the search term
        return oneRecipe.tags.some((oneTag) => {
          return oneTag.toLowerCase().includes(activeQuery.toLowerCase());
        });
      });
      setFilteredRecipes(filteredByTags);
      setPropsRecipes(filteredByTags);
    }
  }, [activeQuery, searchType, allRecipes, setPropsRecipes]);

  function filterSearchbar() {
    setFilteredRecipes(allRecipes);
    setActiveQuery('');
  }

  return (
    <div id="search-bar-container">
      <div id="search-form">
        <div id="search-type-wrapper">
          <div className="search-type-wrapper">
            <button
              id="search-by-name-wrapper"
              onClick={(e) => {
                e.preventDefault();
                setSearchType('name');
              }}
              className={
                searchType === 'name'
                  ? 'search-selection-box selected'
                  : 'search-selection-box'
              }
            >
              Search by Name
            </button>
          </div>
          <div className="search-type-wrapper">
            <button
              id="search-by-ingredient-wrapper"
              onClick={(e) => {
                e.preventDefault();
                setSearchType('ingredient');
              }}
              className={
                searchType === 'ingredient'
                  ? 'search-selection-box selected'
                  : 'search-selection-box'
              }
            >
              Search by Ingredient
            </button>
          </div>
          <div className="search-type-wrapper">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSearchType('tags');
              }}
              id="search-by-tag-wrapper"
              className={
                searchType === 'tags'
                  ? 'search-selection-box selected'
                  : 'search-selection-box'
              }
            >
              Search by Tag
            </button>
          </div>
        </div>
        <div id="search-bar">
          <SearchIcon id="search-bar-icon"></SearchIcon>
          <input
            value={activeQuery}
            id="search-bar-text"
            placeholder="Search recipe"
            type="text"
            name="search"
            onChange={(e) => {
              setActiveQuery(e.target.value);
            }}
          />
          {filteredRecipes.length < allRecipes.length && (
            <CloseIcon onClick={filterSearchbar}></CloseIcon>
          )}
        </div>
      </div>
      {filteredRecipes.length < allRecipes.length && (
        <Stack spacing={0} sx={{ width: '30%', position: 'absolute' }}>
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
                  <CardMedia
                    component="img"
                    sx={{ height: '40px', width: '40px' }}
                    image={eachRecipe.photo_url}
                    alt=""
                  />
                  <CardContent>
                    <Typography variant="body2">{eachRecipe.name}</Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Stack>
      )}
    </div>
  );
}

export default SearchBar;
