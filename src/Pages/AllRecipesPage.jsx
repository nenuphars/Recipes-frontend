import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar";

function AllRecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);
 
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
      .then((recipes) => {
        setAllRecipes(recipes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
    <SearchBar setPropsRecipes={setAllRecipes}></SearchBar>
     
      <div id="eachRecipeContainer">
        {allRecipes.map((eachRecipe) => {
          return (
            <Link
              to={`/Allrecipes/${eachRecipe.id}`}
              key={eachRecipe.id}
              style={{ textDecoration: "none" }}
            >
              <Card id="eachCard">
                <img
                  id="eachPhoto"
                  src={eachRecipe.photo_URL}
                  alt={`${eachRecipe.name} dish`}
                />
                <h2>{eachRecipe.name}</h2>

                <h4>⏱️ {eachRecipe.duration}</h4>
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
