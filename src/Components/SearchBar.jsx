import axios from 'axios';
import './searchBar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function SearchBar(props) {
const [allRecipes, setAllRecipes] = useState([]);
const [filteredRecipes, setFilteredRecipes] = useState([]);
const [searchType, setSearchType] = useState('name')

// search query state
const [activeQuery, setActiveQuery] = useState("")
const [queriesArray, setQueriesArray] = useState([])

// gets data once
useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
      .then((recipes) => {
        setAllRecipes(recipes.data);
        props.setPropsRecipes(recipes.data)
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

  }

  function ingredientsSearch(e){
    e.preventDefault()
    setSearchType('ingredients')

  }

  function tagsSearch(e){
    e.preventDefault()
    setSearchType('tags')
  }

  // useEffect that keeps track of the search queries when they are typed
  useEffect(()=>{

    // resets the recipes list when the search is empty
    if(activeQuery === ''){
      setFilteredRecipes(allRecipes);
      props.setPropsRecipes(allRecipes)
    }


    // handles the search for name
    else if(searchType === 'name'){
      // setactiveQuery(query)
      let filteredByName = allRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(activeQuery.toLowerCase());
      });
      setFilteredRecipes(filteredByName)
      props.setPropsRecipes(filteredByName)

    }


    // handles the search for ingredients
    else if(searchType === 'ingredients'){

      // filter the recipes into a new array
      let filteredByIngredient = allRecipes.filter((oneRecipe)=>{
          // Check if any ingredient in the recipe matches the search term
          return oneRecipe.ingredientsList.some((ingredientObj) =>
          {
            return ingredientObj.ingredient.toLowerCase().includes(activeQuery.toLowerCase())

          }
          )
        }
        );
        setFilteredRecipes(filteredByIngredient)
        props.setPropsRecipes(filteredByIngredient)
      }

      // handles the search for tags
    else if(searchType === 'tags'){
      let filteredByTags = allRecipes.filter((oneRecipe)=>{
        // Check if any tag matches the search term
        return oneRecipe.tags.some((oneTag) =>
        {
          return oneTag.toLowerCase().includes(activeQuery.toLowerCase())

        }
        )
      }
      );
      setFilteredRecipes(filteredByTags)
      props.setPropsRecipes(filteredByTags)
    }
  },[activeQuery, searchType])

  


function filterSearchbar(){
  setFilteredRecipes(allRecipes)
  setActiveQuery("")
}


  return (
    <>
        <form id="search-form">
        <div id='search-type-wrapper'>
          <div className='search-by-name-wrapper'><button className='search-selection-box' onClick={e => nameSearch(e)}>Search by Name</button></div>
          <div className='search-by-ingredient-wrapper'><button className='search-selection-box' onClick={e => ingredientsSearch(e)}>Search by Ingredient</button></div>
          <div className='search-by-tag-wrapper'><button className='search-selection-box' onClick={e => tagsSearch(e)}>Search by Tag</button></div>
        </div>
          <div id="search-bar" >
        
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
           {filteredRecipes.length <30  &&<CloseIcon onClick={filterSearchbar}></CloseIcon>}

          </div>
        </form>
        {filteredRecipes.length < 30 && (
      <div className="eachObjectContainer">
        {filteredRecipes.map((eachRecipe) => {
          return <Link to={`/Allrecipes/${eachRecipe.id}`} key={eachRecipe.id} style={{ color: "black", textDecoration: "none" }} ><p  id="eachObject">
            <img src={eachRecipe.photo_URL} alt={eachRecipe.name} />
            {eachRecipe.name}</p></Link>;
        })}
      </div>
    )}
      </>
  );
}

export default SearchBar;
