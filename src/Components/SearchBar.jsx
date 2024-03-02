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
  function searchByName(nameImput) {
    if (nameImput === "") {
      setFilteredRecipes(allRecipes);
    }
    let resultFiltered = allRecipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(nameImput);
    });
setValueEntered(nameImput)
    setFilteredRecipes(resultFiltered);
    console.log(resultFiltered)
  }
function filterSearchbar(){
  setFilteredRecipes(allRecipes)
  setValueEntered("")
}
  return (
    <div id="searchbar-container">
        <form>
        
          <div id="search-bar" >
          <SearchIcon id="search-bar-icon"></SearchIcon>
            <input
            value={valueEntered}
              id="search-bar-text"
              placeholder="Search recipe"
              type="text"
              name="search"
              onChange={(e) => {
                searchByName(e.target.value);
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
      </div>
  );
}

export default SearchBar;
