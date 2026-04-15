import { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import recipesService from '../services/recipes.services.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context.jsx';
import { RecipeContext } from '../context/recipe.context.jsx';
import RecipeForm from '../Components/RecipeForm.js';

function CreateRecipePage() {
  const { user } = useAuth();

  // const theme = useTheme();

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
    recipe,
    name,
    duration,
    servings,
    description,
    ingredients,
    preparation,
    tags,
    setRecipe,
    setName,
    setDuration,
    setServings,
    setDescription,
    setIngredients,
    setPreparation,
    setTags,
  } = useContext(RecipeContext);

  const navigate = useNavigate();

  useEffect(() => {
    setName('');
    setDuration(0);
    setServings(0);
    setDescription('');
    setIngredients([
      { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
    ]);
    setPreparation('');
    setTags([]);
    setRecipe({
      name: name,
      duration: duration,
      servings: servings,
      description: description,
      ingredientsList: ingredients,
      preparation: preparation,
      tags: tags,
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const nameError = validateName(name);
    const durationError = validateDuration(duration);
    const servingsError = validateServings(servings);
    const ingredientErrors = ingredients.map((ing, index) =>
      validateIngredient(ing, index),
    );
    const descriptionError = validateDescription(description);
    const preparationError = validatePreparation(preparation);

    const ingredientsValidation = validateIngredientsList(ingredients);

    // if (!ingredientsValidation) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     generalIngredient: ingredientsValidation.error,
    //   }));
    //   return;
    // }

    // const hasErrors =
    //   nameError ||
    //   descriptionError ||
    //   preparationError ||
    //   durationError ||
    //   servingsError ||
    //   ingredientErrors.some((err) => err.nameError || err.amountError || err.measuringError);

    // setErrors({
    //   nameError: nameError,
    //   duration: durationError,
    //   servings: servingsError,
    //   ingredients: ingredientErrors,
    //   description: descriptionError,
    //   preparation: preparationError,
    // });

    // if (hasErrors) {
    //   return;
    // }

    const newRecipe = {
      name,
      duration,
      ingredients,
      preparation,
      description,
      servings,
      tags,
      creator: user._id,
    };

    recipesService
      .createRecipe(newRecipe)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="CreateRecipePage" className="page-wrapper">
      <Typography variant="h2" sx={{ fontFamily: 'Edu AU VIC WA NT' }}>
        Create a new recipe
      </Typography>
      <RecipeForm
        handleSubmit={handleSubmit}
        recipeData={recipe}
        page={'Create'}
      />
    </div>
  );
}

export default CreateRecipePage;
