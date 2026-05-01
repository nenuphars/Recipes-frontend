import { Container, Typography } from '@mui/material';
import RecipeForm from '../Components/RecipeForm';
import { useParams } from 'react-router-dom';
import './EditRecipe.css';

function EditRecipe() {
  const { id } = useParams();
  console.log('recipe ID:', id);
  return (
    <Container
      id="EditRecipePage"
      className="page-wrapper"
      sx={{ p: '40px', maxWidth: '100vw' }}
    >
      <Typography variant="h2" sx={{ fontFamily: 'Edu AU VIC WA NT' }}>
        Edit Recipe
      </Typography>
      <RecipeForm page={'edit'} recipeId={id} />
    </Container>
  );
}

export default EditRecipe;
