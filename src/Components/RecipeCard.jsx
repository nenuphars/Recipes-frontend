import {
  // Box,
  Card,
  // CardHeader,
  CardContent,
  // CardMedia,
  Typography,
  Stack,
  CardActionArea,
  Container,
  Button,
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
  const [openDialog, setOpenDialog] = useState(false);
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
      {!confirmDelete && (
        <Card
          variant="outlined"
          sx={{ width: '300px', height: '520px', borderRadius: '8px' }}
        >
          {!openDialog && (
            <>
              <CardActionArea
                onClick={() => navigate(`/recipes/${recipe._id}`)}
                sx={{ height: '80%' }}
              >
                {/* <CardMedia
                component="img"
                height="200px"
                image={recipe.photo_url}
                alt={recipe.name}
                sx={{ borderRadius: '8px' }}
              /> */}

                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6">{recipe.name}</Typography>
                    <div className="tag-container">
                      {recipe.tags.map((eachTag) => {
                        return (
                          <div className="tag-wrapper" key={eachTag}>
                            <Typography variant="body2">{eachTag}</Typography>
                          </div>
                        );
                      })}
                    </div>
                    <Typography variant="body2">
                      ⏱️ {recipe.duration} mins
                    </Typography>

                    <Typography variant="body2">
                      Author: {recipe.creator.user_name}
                    </Typography>

                    <Typography variant="body2">
                      {recipe.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
              {currentPage === 'dashboard' && (
                <Container
                  sx={{
                    height: '20%',
                    marginBottom: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
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
                    onClick={() => setOpenDialog(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Container>
              )}
            </>
          )}

          {openDialog && !confirmDelete && (
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h6" className="confirm-delete-heading">
                  Are you sure?
                </Typography>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmDelete(true);
                    deleteRecipe(recipe._id);
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setConfirmDelete(false);
                    setOpenDialog(false);
                  }}
                >
                  No
                </Button>
              </Stack>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}

export default RecipeCard;
