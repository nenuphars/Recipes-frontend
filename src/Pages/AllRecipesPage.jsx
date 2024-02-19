import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../App.css";
function AllRecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
      .then((recipes) => {
        setAllRecipes(recipes.data);
        console.log(recipes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h1>All recipes Page</h1>
      <div id="eachRecipeContainer">
        {allRecipes.map((eachRecipe) => {
          return (
            <div id="eachRecipe" className="eachRecipeItem" key={eachRecipe.id}>
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllRecipesPage;
