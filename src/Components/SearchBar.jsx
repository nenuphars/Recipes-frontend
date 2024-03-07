import axios from "axios";
import "./searchBar.css";
import { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function SearchBar({ setPropsRecipes }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchType, setSearchType] = useState("name");

  // search query state
  const [activeQuery, setActiveQuery] = useState("");


  // gets data once
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
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
  function nameSearch(e){
    e.preventDefault()
    setSearchType('name')
    document.getElementById('search-by-name-wrapper').style.backgroundColor = '#dd596b'
    document.getElementById('search-by-tag-wrapper').style.backgroundColor = '#5971dd'
    document.getElementById('search-by-ingredient-wrapper').style.backgroundColor = '#5971dd'

  }

  function ingredientsSearch(e){
    e.preventDefault()
    setSearchType('ingredients')
    document.getElementById('search-by-ingredient-wrapper').style.backgroundColor = '#dd596b'
    document.getElementById('search-by-tag-wrapper').style.backgroundColor = '#5971dd'
    document.getElementById('search-by-name-wrapper').style.backgroundColor = '#5971dd'
  }

  function tagsSearch(e){
    e.preventDefault()
    setSearchType('tags')
    document.getElementById('search-by-tag-wrapper').style.backgroundColor = '#dd596b'
    document.getElementById('search-by-name-wrapper').style.backgroundColor = '#5971dd'
    document.getElementById('search-by-ingredient-wrapper').style.backgroundColor = '#5971dd'
  }

  // useEffect that keeps track of the search queries when they are typed
  useEffect(() => {
    // resets the recipes list when the search is empty
    if (activeQuery === "") {
      setFilteredRecipes(allRecipes);
      setPropsRecipes(allRecipes);
    }

    // handles the search for name
    else if (searchType === "name") {
      // setactiveQuery(query)
      let filteredByName = allRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(activeQuery.toLowerCase());
      });
      setFilteredRecipes(filteredByName);
      setPropsRecipes(filteredByName);
    }

    // handles the search for ingredients
    else if (searchType === "ingredients") {
      // filter the recipes into a new array
      let filteredByIngredient = allRecipes.filter((oneRecipe) => {
        // Check if any ingredient in the recipe matches the search term
        return oneRecipe.ingredientsList.some((ingredientObj) => {
          return ingredientObj.ingredient
            .toLowerCase()
            .includes(activeQuery.toLowerCase());
        });
      });
      setFilteredRecipes(filteredByIngredient);
      setPropsRecipes(filteredByIngredient);
    }

    // handles the search for tags
    else if (searchType === "tags") {
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
    setActiveQuery("");
  }


  return (
    <div id="search-bar-container">
        <div id="search-form">
        <div id='search-type-wrapper'>
          <div className='search-type-wrapper'><button id='search-by-name-wrapper' style={{backgroundColor:"#dd596b"}} className='search-selection-box' onClick={e => nameSearch(e)}>Search by Name</button></div>
          <div className='search-type-wrapper'><button id='search-by-ingredient-wrapper' className='search-selection-box' onClick={e => ingredientsSearch(e)}>Search by Ingredient</button></div>
          <div className='search-type-wrapper'><button id='search-by-tag-wrapper' className='search-selection-box' onClick={e => tagsSearch(e)}>Search by Tag</button></div>
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
           {filteredRecipes.length < allRecipes.length  &&<CloseIcon onClick={filterSearchbar}></CloseIcon>}

          </div>
        </div>
        {filteredRecipes.length < allRecipes.length && (
      <div className="eachObjectContainer">
        {filteredRecipes.map((eachRecipe) => {
          return <Link to={`/Allrecipes/${eachRecipe.id}`} key={eachRecipe.id} style={{ color: "black", textDecoration: "none" }} ><p  id="eachObject">
            <img src={eachRecipe.photo_URL} alt={eachRecipe.name} />
            {eachRecipe.name}</p></Link>;
        })}
      </div>
    )}
      </div>
  );
}

export default SearchBar;
