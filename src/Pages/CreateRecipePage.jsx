import { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./CreateRecipe.css";
import recipesService from "../services/recipes.services";
import { AuthContext } from "../context/auth.context";

function CreateRecipePage() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { ingredient_name: "", ingredient_amount: "", ingredient_measuring: "" },
  ]);

  const { isLoggedIn, user } = useContext(AuthContext)

  const navigate = useNavigate();

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

  const addFields = () => {
    let newField = {
      ingredient_name: "",
      Ingredient_amount: "",
      ingredient_measuring: "",
    };
    setIngredients([...ingredients, newField]);
  };

  const addTagField = () => {
    let newField = "";
    setTags([...tags, newField]);
  };

  const deleteIngredientFields = (index) => {
    if (ingredients.length === 1) {
      return setIngredients([
        {
          ingredient_name: "",
          ingredient_amount: "",
          ingredient_measuring: "",
        },
      ]);
    }
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };
  const deleteTagField = (index) => {
    let data = [...tags];
    data.splice(index, 1);
    setTags(data);
  };
  function handleSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      name: name,
      photo_url: photoURL,
      duration: duration,
      ingredientsList: ingredients,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags,
      creator: user._id
    };

    recipesService
      .createRecipe(newRecipe)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="create-recipe-container">
      <h1>Create a new recipe</h1>
      <Stack id="AddRecipesPage" spacing={2}>
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <OutlinedInput
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
            name="duration"
            variant="filled"
            type="number"
            size="small"
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
          <Stack id="ingredients-list-wrapper">
            <FormLabel htmlFor="ingredient amount">Ingredient List</FormLabel>
            {ingredients.map((input, index) => {
              return (
                <Stack key={index} direction="row" spacing={2}>
                  <OutlinedInput
                    name="ingredient_name"
                    placeholder="ingredient"
                    value={input.ingredient_name}
                    onChange={(event) => handleIngredientFields(index, event)}
                  />
                  <OutlinedInput
                    name="ingredient_amount"
                    placeholder="amount"
                    value={input.ingredient_amount}
                    onChange={(event) => handleIngredientFields(index, event)}
                  />
                  <OutlinedInput
                    name="ingredient_measuring"
                    placeholder="measuring unit"
                    value={input.ingredient_measuring}
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
            <Button
              className="add-button"
              size="medium"
              variant="text"
              onClick={(e) => addFields(e)}
            >
              Add more
            </Button>
          </Stack>

          <FormLabel htmlFor="preparation">Preparation method</FormLabel>
          <OutlinedInput
            multiline
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
            name="description"
            variant="filled"
            size="normal"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Stack className="tags-stack" spacing={2}>
            <FormLabel htmlFor="tag">Tags</FormLabel>
            {tags.map((input, index) => {
              return (
                <Stack key={index} direction="row" spacing={2}>
                  <OutlinedInput
                    name="tag"
                    placeholder="tag"
                    value={input}
                    onChange={(event) => handleTagField(index, event)}
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
            <Button
              className="add-button"
              size="medium"
              variant="text"
              onClick={(e) => addTagField(e)}
            >
              Add more
            </Button>
          </Stack>

          <Button
            className="submit-button"
            size="large"
            onClick={handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Create
          </Button>
        </form>
      </Stack>
    </div>
  );
}

export default CreateRecipePage;
