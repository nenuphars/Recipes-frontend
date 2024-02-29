import axios from 'axios';
import './searchBar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function SearchBar() {
const [allRecipes, setAllRecipes] = useState([]);
const [filteredRecipes, setFilteredRecipes] = useState([]);
const [searchType, setSearchType] = useState('name')

// search query state
const [valueEntered,setValueEntered] = useState("")


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

  function nameSearch(e){
    e.preventDefault()
    setSearchType('name')
  }

  function ingredientsSearch(e){
    e.preventDefault()
    setSearchType('ingredients')
  }

  function searchFunction(query) {
    console.log(searchType)
   
    if (query === "") {
      setFilteredRecipes(allRecipes);
    }
    if(searchType === 'name'){
      setValueEntered(query)
      let filteredByName = allRecipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredRecipes(filteredByName)

    }
    if(searchType === 'ingredients'){
      setValueEntered(query)
      // map through all recipes
      let filteredByIngredient = allRecipes.filter((oneRecipe)=>{
          // Check if any ingredient in the recipe matches the search ingredient
          return oneRecipe.ingredientsList.some((ingredientObj) =>
          {
            console.log(ingredientObj)
            return ingredientObj.ingredient.toLowerCase().includes(query.toLowerCase())

          }
          )
        }
        );
        setFilteredRecipes(filteredByIngredient)
      }
    


  }


function filterSearchbar(){
  setFilteredRecipes(allRecipes)
  setValueEntered("")
}


  return (
    <>
        <form id="search-form">
        <div id='search-type-wrapper'>
          <div className='search-by-name-wrapper'><button className='search-selection-box' onClick={e => nameSearch(e)}>Search by Name</button></div>
          <div className='search-by-ingredient-wrapper'><button className='search-selection-box' onClick={e => ingredientsSearch(e)}>Search by Ingredient</button></div>
        </div>
          <div id="search-bar" >
        
          <SearchIcon id="search-bar-icon"></SearchIcon>
            <input
            value={valueEntered}
              id="search-bar-text"
              placeholder="Search recipe"
              type="text"
              name="search"
              onChange={(e) => {
                searchFunction(e.target.value);
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
