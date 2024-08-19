import './searchBar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
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

  // functions that change the state of the search type
  function toggleSearchType(e, type) {
    e.preventDefault();
    setSearchType(type);
  }

  // useEffect that keeps track of the search queries when they are typed
  useEffect(() => {
    if (activeQuery === '') {
      setFilteredRecipes(allRecipes);
      setPropsRecipes(allRecipes);
    } else {
      // handles the search for name
      console.log('starting the search process');
      if (searchType === 'name') {
        let filteredByName = allRecipes.filter((oneRecipe) => {
          return oneRecipe.name
            .toLowerCase()
            .includes(activeQuery.toLowerCase());
        });
        setFilteredRecipes(filteredByName);
        setPropsRecipes(filteredByName);
      }

      if (searchType === 'ingredient') {
        let filteredByIngredient = allRecipes.filter((oneRecipe) => {
          return oneRecipe.ingredientsList.some((oneIngredient) => {
            return oneIngredient.ingredient_name
              .toLowerCase()
              .includes(activeQuery.toLowerCase());
          });
        });
        setFilteredRecipes(filteredByIngredient);
        setPropsRecipes(filteredByIngredient);
      }
      if (searchType === 'tags') {
        let filteredByTags = allRecipes.filter((oneRecipe) => {
          return oneRecipe.tags.some((oneTag) => {
            oneTag.toLowerCase().includes(activeQuery.toLowerCase());
          });
        });
        setFilteredRecipes(filteredByTags);
        setPropsRecipes(filteredByTags);
      }
    }
  }, [activeQuery, searchType, allRecipes, setPropsRecipes]);

  function filterSearchbar() {
    setFilteredRecipes(allRecipes);
    setActiveQuery('');
  }

  return (
    <div id="search-bar-container">
      <form id="search-form">
        <div id="search-type-wrapper">
          <div className="search-type-wrapper">
            <button
              id="search-by-name-wrapper"
              className={
                searchType === 'name'
                  ? 'search-selection-box selected-search-type'
                  : 'search-selection-box'
              }
              onClick={(e) => toggleSearchType(e, 'name')}
            >
              Search by Name
            </button>
          </div>
          <div className="search-type-wrapper">
            <button
              id="search-by-ingredient-wrapper"
              className={
                searchType === 'ingredient'
                  ? 'search-selection-box selected-search-type'
                  : 'search-selection-box'
              }
              onClick={(e) => toggleSearchType(e, 'ingredient')}
            >
              Search by Ingredient
            </button>
          </div>
          <div className="search-type-wrapper">
            <button
              id="search-by-tag-wrapper"
              className={
                searchType === 'tag'
                  ? 'search-selection-box selected-search-type'
                  : 'search-selection-box'
              }
              onClick={(e) => toggleSearchType(e, 'tag')}
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
      </form>
      {filteredRecipes.length < allRecipes.length && (
        <div className="eachObjectContainer">
          {filteredRecipes.map((eachRecipe) => {
            return (
              <Link
                to={`/recipes/${eachRecipe._id}`}
                key={eachRecipe._id}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <p id="eachObject">
                  <img src={eachRecipe.photo_url} alt={eachRecipe.name} />
                  {eachRecipe.name}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
