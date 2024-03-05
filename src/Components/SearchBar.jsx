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
  const [queryArray, setQueryArray] = useState([]);

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
  function nameSearch(e) {
    e.preventDefault();
    setSearchType("name");
    setQueryArray([]);
    setFilteredRecipes(allRecipes);
    setPropsRecipes(allRecipes);
  }

  function ingredientsSearch(e) {
    e.preventDefault();
    setSearchType("ingredients");
    setQueryArray([]);
    setFilteredRecipes(allRecipes);
    setPropsRecipes(allRecipes);
  }

  function tagsSearch(e) {
    e.preventDefault();
    setSearchType("tags");
    setQueryArray([]);
    setFilteredRecipes(allRecipes);
    setPropsRecipes(allRecipes);
  }

  useEffect(()=>{
    console.log("content of query array: ", queryArray)

  }, [queryArray])

  // search function that keeps track of the search queries and handles the filters
  function handleSearch(e) {
    // set the value for search input
    setActiveQuery(e.target.value);

    // handles the search for name
    if (searchType === "name") {
      // setactiveQuery(query)
      let filteredByName = allRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(activeQuery.toLowerCase());
      });
      setFilteredRecipes(filteredByName);
      setPropsRecipes(filteredByName);
    }

    // handles the search for ingredients
    else if (searchType === "ingredients") {
      let filteredByOneIngredient;
      let filteredByTwoIngredients;

      //  if there is something in the query array
      if (queryArray.length >= 1) {
        // filter the previously filtered array again
        filteredByTwoIngredients = queryArray.forEach((oneQuery, index) => {
            filteredRecipes.some((ingredientObj) => {
              return ingredientObj.ingredient
                .toLowerCase()
                .includes(oneQuery[index].toLowerCase());
            });
          
        });

        console.log(`filtered by ingredients ${activeQuery}`, filteredByTwoIngredients);
        setFilteredRecipes(filteredByTwoIngredients);
        setPropsRecipes(filteredByTwoIngredients);
      }
     
        // filter by active query
        filteredByOneIngredient = filteredRecipes.filter((oneRecipe) => {
          // Check if any ingredient in the recipe matches the search term
          return oneRecipe.ingredientsList.some((ingredientObj) => {
            return ingredientObj.ingredient
              .toLowerCase()
              .includes(activeQuery.toLowerCase());
          });
        });
        console.log("filtered by active query ingredient: ",filteredByOneIngredient)
        setFilteredRecipes(filteredByOneIngredient);
        setPropsRecipes(filteredByOneIngredient);
      

      // resets the recipes list when the search is empty and there is nothing in the query array
      if (!queryArray) {
        setFilteredRecipes(allRecipes);
        setPropsRecipes(allRecipes);
      }
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
  }

  function clearSearchbar() {
    setFilteredRecipes(allRecipes);
    setActiveQuery("");
  }

  // handles the enter key press
  function addQuery(event) {
    if (event.key === "Enter") {
      console.log("the array before: ", queryArray);
      
      setQueryArray([...queryArray, ...activeQuery]);
      console.log("new content ", activeQuery);

      setActiveQuery("");
    }
  }

  // removes a query from the search bar and query array
  function removeQuery(index) {
    let data = [...queryArray];
    data.splice(index, 1);
    setQueryArray(data);
  }

  return (
    <>
      <form id="search-form">
        <div id="search-type-wrapper">
          <div className="search-by-name-wrapper">
            <button
              className="search-selection-box"
              onClick={(e) => nameSearch(e)}
            >
              Search by Name
            </button>
          </div>
          <div className="search-by-ingredient-wrapper">
            <button
              className="search-selection-box"
              onClick={(e) => ingredientsSearch(e)}
            >
              Search by Ingredient
            </button>
          </div>
          <div className="search-by-tag-wrapper">
            <button
              className="search-selection-box"
              onClick={(e) => tagsSearch(e)}
            >
              Search by Tag
            </button>
          </div>
        </div>
        <div id="search-bar">
          <SearchIcon id="search-bar-icon"></SearchIcon>
          <input
            onKeyUp={(e) => {
              addQuery(e);
            }}
            value={activeQuery}
            id="search-bar-text"
            placeholder="Search recipe"
            type="text"
            name="search"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          {queryArray && (
            <div className="queryBubble">
              {queryArray.map((oneQuery, index) => {
                return (
                  <div key={index}>
                    <p>{oneQuery}</p>
                    <CloseIcon
                      onClick={() => {
                        removeQuery(index);
                      }}
                    ></CloseIcon>
                  </div>
                );
              })}
            </div>
          )}
          {filteredRecipes.length < 30 && (
            <CloseIcon onClick={clearSearchbar}></CloseIcon>
          )}
        </div>
      </form>
      {/* show thumbnails of recipes below search input while typing */}
      {filteredRecipes.length < 30 && (
        <div className="eachObjectContainer">
          {activeQuery &&
            filteredRecipes.map((eachRecipe) => {
              return (
                <Link
                  to={`/Allrecipes/${eachRecipe.id}`}
                  key={eachRecipe.id}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <p id="eachObject">
                    <img src={eachRecipe.photo_URL} alt={eachRecipe.name} />
                    {eachRecipe.name}
                  </p>
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
}

export default SearchBar;
