import { useEffect, useContext, useState } from 'react';
import { Typography } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useNavigate, useParams } from 'react-router-dom';
import './EditRecipe.css';
import recipesService from '../services/recipes.services';
import { AuthContext } from '../context/auth.context';
import { RecipeContext } from '../context/recipe.context';
import RecipeForm from '../Components/RecipeForm';

function EditRecipe() {
  // params to get the id of the recipe
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    validateName,
    validateDuration,
    validateServings,
    validateDescription,
    validateIngredient,
    validateIngredientsList,
    validatePreparation,
    // errors,
    setErrors,
    setName,
    setDuration,
    setServings,
    setDescription,
    setIngredients,
    setPreparation,
    setTags,
    name,
    duration,
    servings,
    description,
    ingredients,
    preparation,
    tags,
  } = useContext(RecipeContext);

  const { user } = useContext(AuthContext);

  const [recipeData, setRecipeData] = useState({});

  // get data for the current recipe to be modified
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        // Get your recipe data somehow (from API, props, etc.)
        const response = await recipesService.getRecipe(id);

        console.log(response.data);

        // Update all the form states with the existing recipe data
        setName(response.data.name);
        setDuration(response.data.duration);
        setServings(response.data.servings);
        setDescription(response.data.description);
        setIngredients(response.data.ingredientsList);
        setPreparation(response.data.preparation);
        setTags(response.data.tags);
        setRecipeData(response.data);
      } catch (error) {
        console.error('Error loading recipe:', error);
      }
    };

    loadRecipe();
  }, [id]);

  // function that handles the submit
  function handleSubmit(e) {
    e.preventDefault();

    const nameError = validateName(name);
    const durationError = validateDuration(duration);
    const servingsError = validateServings(servings);
    const ingredientErrors = ingredients.map((ing, index) =>
      validateIngredient(ing, index)
    );
    const descriptionError = validateDescription(description);
    const preparationError = validatePreparation(preparation);

    const ingredientsValidation = validateIngredientsList(ingredients);

    if (!ingredientsValidation.valid) {
      setErrors((prev) => ({
        ...prev,
        generalIngredient: ingredientsValidation.error,
      }));
      return;
    }

    const hasErrors =
      nameError ||
      descriptionError ||
      preparationError ||
      durationError ||
      servingsError ||
      ingredientErrors.some((err) => err.name || err.amount || err.measuring);

    setErrors({
      name: nameError,
      duration: durationError,
      servings: servingsError,
      ingredients: ingredientErrors,
      description: descriptionError,
      preparation: preparationError,
    });

    if (hasErrors) {
      return;
    }

    // object that contains a new/edited recipe
    const updatedRecipe = {
      name,
      duration,
      ingredientsList: ingredientsValidation.cleanedIngredients,
      preparation,
      description,
      servings,
      tags,
      creator: user._id,
    };

    recipesService
      .updateRecipe(id, updatedRecipe)
      .then(() => {
        navigate(`/recipes/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="EditRecipePage" className="page-wrapper">
      <Typography variant="h2" sx={{ fontFamily: 'Edu AU VIC WA NT' }}>
        Edit Recipe
      </Typography>
      {(!name ||
        // !photoURL ||
        !duration ||
        !ingredients ||
        !preparation ||
        !description ||
        !servings ||
        !tags) && <p>...loading</p>}
      {(name ||
        // photoURL ||
        duration ||
        ingredients ||
        preparation ||
        description ||
        servings ||
        tags) && (
        <RecipeForm
          recipeData={recipeData}
          handleSubmit={handleSubmit}
          page={'Edit'}
        />
      )}
    </div>
  );
}

export default EditRecipe;
