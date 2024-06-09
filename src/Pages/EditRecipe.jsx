import { useEffect, useState } from "react";
import {
  Button,
  FormLabel,
  Stack,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useNavigate, useParams } from "react-router-dom";
import "./EditRecipe.css";
import recipesService from "../services/recipes.services";

function EditRecipe() {
  // params to get the id of the recipe
  const { id } = useParams();
  const navigate = useNavigate()

  // states for all form inputs
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([]);

  // state for ingredients and amount
  const [ingredients, setIngredients] = useState([
    { ingredient_name: "", ingredient_amount: "", ingredient_measuring: "" },
  ]);

  // get data for the current recipe to be modified
  useEffect(() => {
    recipesService.getRecipe(id)
      .then((recipeDetails) => {
        console.log(recipeDetails.data);

        setName(recipeDetails.data.name);
        setPhotoURL(recipeDetails.data.photo_url);
        setDuration(recipeDetails.data.duration);

        setPreparation(recipeDetails.data.preparation);
        setDescription(recipeDetails.data.description);
        setServings(recipeDetails.data.servings);
        setTags(recipeDetails.data.tags);
        setIngredients(recipeDetails.data.ingredientsList);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // function that updates data for arrays when the user is typing
  const handleIngredientFields = (index, event) => {
    let data = [...ingredients];
    data[index][event.target.name] = event.target.value;
    console.log(data);
    setIngredients(data);
  };

  const handleTagField = (index, event) => {
    let data = [...tags];
    data[index] = event.target.value;
    console.log(data);
    setTags(data);
  };

  // functions that add a new input field when the user clicks the button
  const addIngredientFields = () => {
    let newField = { ingredient_name: "", ingredient_amount: "", ingredient_measuring: ""};
    setIngredients([...ingredients, newField]);
  };

  const addTagField = () => {
    let newField = "";
    setTags([...tags, newField]);
  };

  // functions that delete an input fields if the user clicks the button
  const deleteIngredientFields = (index) => {
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  const deleteTagField = (index) => {
    let data = [...tags];
    data.splice(index, 1);
    setTags(data);
  };

  // function that handles the submit
  function handleSubmit(e) {
    e.preventDefault();

    // object that contains a new/edited recipe
    const newRecipe = {
      name: name,
      photo_url: photoURL,
      duration: duration,
      ingredientsList: ingredients,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags,
    };

    console.log(newRecipe.duration);

    recipesService.createRecipe(newRecipe)
      .then(() => {
        navigate(`/Allrecipes/${id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="edit-recipe-container">
      <h1>Edit Recipe</h1>
      {(!name ||
        !photoURL ||
        !duration ||
        !ingredients ||
        !preparation ||
        !description ||
        !servings ||
        !tags) && <p>...loading</p>}
      {(name ||
        photoURL ||
        duration ||
        ingredients ||
        preparation ||
        description ||
        servings ||
        tags) && (
        <Stack id="AddRecipesPage" spacing={2}>
          <form onSubmit={handleSubmit}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <OutlinedInput
              value={`${name}`}
              name="name"
              variant="filled"
              size="small"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <FormLabel htmlFor="photo">Photo URL</FormLabel>
            <OutlinedInput
              value={`${photoURL}`}
              name="photo"
              variant="filled"
              size="small"
              type="url"
              onChange={(e) => {
                setPhotoURL(e.target.value);
              }}
            />
            <FormLabel htmlFor="duration">Duration</FormLabel>
            <OutlinedInput
              value={duration}
              name="duration"
              variant="filled"
              type="number"
              size="small"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">mins</InputAdornment>
              }
            />

            <Stack
              id="ingredients-amounts-stack"
              direction="column"
              spacing={2}
            >
              <FormLabel htmlFor="ingredient amount">Ingredient List</FormLabel>
              {ingredients.map((oneItem, index) => {
                return (
                  <Stack key={"ingredient" + index} direction="row" spacing={2}>
                    <OutlinedInput
                      value={`${oneItem.ingredient_name}`}
                      name="ingredient_name"
                      placeholder="ingredient"
                      onChange={(event) => handleIngredientFields(index, event)}
                    />
                    <OutlinedInput
                      value={`${oneItem.ingredient_amount}`}
                      name="amount"
                      placeholder="ingredient_amount"
                      onChange={(event) => handleIngredientFields(index, event)}
                    />
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteIngredientFields(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                );
              })}

              <Button className="add-button" size="medium" variant="text" onClick={(e) => addIngredientFields(e)}>
                Add more
              </Button>
            </Stack>

            <FormLabel htmlFor="preparation">Preparation method</FormLabel>
            <OutlinedInput
              multiline
              value={`${preparation}`}
              name="preparation"
              variant="filled"
              size="normal"
              type="text"
              onChange={(e) => {
                setPreparation(e.target.value);
              }}
              required
            />
            <FormLabel htmlFor="servings">Servings</FormLabel>
            <OutlinedInput
              value={`${servings}`}
              name="servings"
              variant="filled"
              size="small"
              type="number"
              onChange={(e) => {
                setServings(e.target.value);
              }}
            />
            <FormLabel htmlFor="description">Description</FormLabel>
            <OutlinedInput
              multiline
              value={`${description}`}
              name="description"
              variant="filled"
              size="normal"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <FormLabel htmlFor="Tag">Tags</FormLabel>
            <Stack id="tags-stack" spacing={2}>
              {tags.map((oneTag, index) => {
                return (
                  <Stack key={index} direction="row" spacing={2}>
                    <OutlinedInput
                      name="Tag"
                      value={oneTag}
                      onChange={(event) => {
                        handleTagField(index, event);
                      }}
                    />
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteTagField(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                );
              })}
              <Button className="add-button" size="medium" variant="text" onClick={(event) => addTagField(event)}>
                Add more
              </Button>
            </Stack>
            <Button id="submit-button"
            size="large"
              onClick={handleSubmit}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </form>
        </Stack>
      )}
    </div>
  );
}

export default EditRecipe;
