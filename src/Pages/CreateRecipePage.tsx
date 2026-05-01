import { useContext, useEffect } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/recipe.context.jsx';
import RecipeForm from '../Components/RecipeForm.js';
import './CreateRecipe.css';

function CreateRecipePage() {
  const {
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

  // const navigate = useNavigate();

  // useEffect(() => {
  //   setName('');
  //   setDuration(0);
  //   setServings(0);
  //   setDescription('');
  //   setIngredients([
  //     { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
  //   ]);
  //   setPreparation('');
  //   setTags([]);
  //   setRecipe({
  //     name: name,
  //     duration: duration,
  //     servings: servings,
  //     description: description,
  //     ingredientsList: ingredients,
  //     preparation: preparation,
  //     tags: tags,
  //   });
  // }, []);

  return (
    <Container
      id="CreateRecipePage"
      className="page-wrapper"
      sx={{ p: '40px', maxWidth: '100vw' }}
    >
      <Typography variant="h2" sx={{ fontFamily: 'Edu AU VIC WA NT' }}>
        Create a new recipe
      </Typography>
      <RecipeForm page={'create'} />
    </Container>
  );
}

export default CreateRecipePage;
