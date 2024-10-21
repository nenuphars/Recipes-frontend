import {
  Card,
  // CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import recipesService from '../services/recipes.services';
import './RecipeCard.css';

function RecipeCard({ recipe, currentPage }) {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteRecipe = (id) => {
    recipesService
      .deleteRecipe(id)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ width: '300px', height: '520px', borderRadius: '8px' }}
      >
        {!confirmDelete && (
          <>
            <CardMedia
              component="img"
              height="200"
              image={recipe.photo_url}
              alt={recipe.name}
              sx={{ borderRadius: '8px' }}
            />

            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography variant="body2">
                  ⏱️ {recipe.duration} mins
                </Typography>

                <div className="tag-container">
                  {recipe.tags.map((eachTag) => {
                    return (
                      <div className="tag-wrapper" key={eachTag}>
                        <Typography variant="body2">{eachTag}</Typography>
                      </div>
                    );
                  })}
                </div>

                {currentPage === 'recipes' && (
                  <Typography variant="subtitle1">
                    Author: {recipe.creator.user_name}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ height: '120px' }}>
                  {recipe.description}
                </Typography>

                {currentPage === 'dashboard' && (
                  <>
                    <div className="recipe-tools-wrapper">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          navigate(`/dashboard/edit/${recipe._id}`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        onClick={() => setConfirmDelete(true)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </>
                )}
              </Stack>
            </CardContent>
          </>
        )}

        {confirmDelete && (
          <div id="confirm-delete-wrapper">
            <h4 className="confirm-delete-heading">Are you sure?</h4>
            <button
              className="confirm-delete-button"
              onClick={(e) => {
                e.preventDefault();
                deleteRecipe(recipe._id);
              }}
            >
              Yes
            </button>
            <button
              className="confirm-delete-button"
              onClick={() => setConfirmDelete(false)}
            >
              No
            </button>
          </div>
        )}
      </Card>
    </>
  );
}

export default RecipeCard;
