import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function RecipeDetailsPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes/${id}`)
      .then((recipe) => {
        setRecipe(recipe.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log(recipe);



  return (
    <div id="backgroundDetails">
      {!recipe && <p>loading...</p>}
      {recipe && (
        <div>
      
          <div id="recipeContainer">
            <div id="first-recipe-bloq">
              <img
                id="PhotoDetails"
                src={recipe.photo_URL}
                alt="Photo of this dish"
              />
              <div id="first-recipe-bloq-text">
                <h1>{recipe.name}</h1>
                <h3>
                  ⏱️{recipe.duration}
                  <br></br>
                  <br></br>
                  <br></br>
                  {recipe.tags.map((eachTag) => {
                    return `${eachTag}    `;
                  })}
                </h3>
                <h2><br></br><br></br>{recipe.description}</h2>
              </div>
            </div>
            <h2>Ingredients and preparation for {recipe.servings} servings:</h2>
            <ul id="ingredientListDetails">
              {recipe.ingredientsList.map((eachObject) => (
                <li key={recipe.id}>{eachObject.ingredient} {eachObject.amount}</li>
              ))}
            </ul>

            <h3>Preparation: <h4>{recipe.preparation}</h4></h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailsPage;
