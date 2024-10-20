import { useEffect } from "react";
import { useState } from "react";
import "./AllRecipesPage.css";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import CircularProgress from '@mui/material/CircularProgress';
import recipesService from "../services/recipes.services";

function AllRecipesPage() {
  const [spiner, setSpinner] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  
  useEffect(() => {
    recipesService.getAllRecipes()
      .then((recipes) => {
        setSpinner(recipes.data)
        setAllRecipes(recipes.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
    <SearchBar setPropsRecipes={setAllRecipes}></SearchBar>
    {allRecipes.length===0 && spiner.length > 0 && 
    <div id="no-recipe-macht-container-allrecipepage">
<h2>No recipe matches your search</h2>
<button id="allrecipesPage-button-see-all" onClick={()=>{location.reload()}}>See all recipes</button>

    </div>
  }

    {spiner.length===0 && allRecipes.length===0 && <CircularProgress id="circular-progress-allRecipes" size={100} color="success"></CircularProgress>}
      <div id="eachRecipeContainer">
        {allRecipes.map((eachRecipe) => {
          return (
            <Link
              to={`/recipes/${eachRecipe._id}`}
              key={eachRecipe._id}
              style={{ textDecoration: "none" }}
            >
              <Card id="eachCard">
                <img
                  id="eachPhoto"
                  src={eachRecipe.photo_url}
                  alt={`${eachRecipe.name} dish`}
                />
                <h2>{eachRecipe.name}</h2>

                <h4>⏱️ {eachRecipe.duration}</h4>
                <div id="tagContainer">
                  {eachRecipe.tags.map((eachTag) => {
                    return <div className="tag-wrapper" key={eachTag}>{eachTag}</div>;
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
