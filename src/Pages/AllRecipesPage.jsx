import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";


function AllRecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);


console.log(filteredRecipes)
  useEffect(() => {
        axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
      .then((recipes) => {
        setAllRecipes(recipes.data);
        setFilteredRecipes(recipes.data)
        console.log(recipes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function searchByName(nameImput) {
    if (nameImput === ""){
      setFilteredRecipes(allRecipes)
    }
    let resultFiltered = allRecipes.filter(recipe =>{
     return recipe.name.toLowerCase().includes(nameImput)
    
    }) ;
   
    setFilteredRecipes(resultFiltered)
    
   }
   
  return (
    <>

<div>
      <form >
        <input id="search-bar" placeholder="Search recipe"type="text" name="search" onChange={(e)=>{searchByName(e.target.value)}}/>
        <span id="clear-search" className="clear-search-icon" onclick="">✕</span>
      </form>
    </div>

      <div id="eachRecipeContainer">
        {filteredRecipes.map((eachRecipe) => {
    
          return (
            <Link to={`/Allrecipes/${eachRecipe.id}`}  key={eachRecipe.id} style={{textDecoration:"none"}}>
            <Card id="eachCard" >
            
              <img
                id="eachPhoto"
                src={eachRecipe.photo_URL}
                alt={`${eachRecipe.name} dish`}
              />
              <h2>{eachRecipe.name}</h2>

              <h4 >⏱️ {eachRecipe.duration}</h4>
              <div id="tagContainer">
                {eachRecipe.tags.map((eachTag) => {
                  return <div key={eachTag}>{eachTag}</div>;
                })}
              </div>
            </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default AllRecipesPage;
