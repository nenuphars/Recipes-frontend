import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import "./RecipeDetailsPage.css";
// import ErrorPage from "./ErrorPage";
import recipesService from "../services/recipes.services";

function RecipeDetailsPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  // const [fakeRecipe, setFakeRecipe] =useState(false)

  useEffect(() => {
    recipesService.getRecipe(id)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
        // setFakeRecipe(true)
      });
  }, [id]);
  

  return (
    <div id="backgroundDetails">
      {/* {!recipe && fakeRecipe && <ErrorPage></ErrorPage>} */}
      {!recipe  && <CircularProgress id="spiner-detailsPage" size={100} color="success"></CircularProgress>}
      {recipe && (
        <div>
          <div id="recipeContainer">
            <div id="first-recipe-bloq">
              <img
                id="PhotoDetails"
                src={recipe.photo_url}
                alt="Photo of this dish"
              />
              <div id="first-recipe-bloq-text">
                <h1>{recipe.name}<br></br><br></br></h1>
                <h3>
                  ⏱️{recipe.duration} mins
                  <br></br>
                  <br></br>
                  <br></br>
                  {recipe.tags.map((eachTag) => {
                    return `${eachTag}    `;
                  })}
                </h3>
                <h2>
                  <br></br>
                  <br></br>
                  {recipe.description}
                </h2>
              </div>
            </div>
            <h2 className="subtitles2">Ingredients and preparation for {recipe.servings} servings:</h2>
            <ul id="ingredientListDetails">
              {recipe.ingredientsList.map((eachObject) => (
                <li key={recipe.id}>
                  {eachObject.ingredient_name} : {eachObject.ingredient_amount} {eachObject.ingredient_measuring}
                </li>
              ))}
            </ul>

            <h3 className="subtitles2">
              Preparation: <h4 id="preparation">{recipe.preparation}</h4>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailsPage;
