import { useEffect, useState } from "react";
import axios from "axios";
import { Button, FormControl, FormLabel, Stack, InputAdornment, OutlinedInput, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useParams } from "react-router-dom";

function EditRecipe() {
  // params to get the id of the recipe
  const { id } = useParams()

  // states for all form inputs
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([]);
  
  // state for ingredients and amount
  const [ingredients, setIngredients] = useState([{ingredient:"", amount:""}])

  // get data for the current recipe to be modified
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/Recipes/${id}`)
    .then((recipeDetails)=>{
      console.log(recipeDetails.data)

      setName(recipeDetails.data.name)
      setPhotoURL(recipeDetails.data.photo_URL)
      setDuration(recipeDetails.data.duration)
      setPreparation(recipeDetails.data.preparation)
      setDescription(recipeDetails.data.description)
      setServings(recipeDetails.data.servings)
      setTags(recipeDetails.data.tags)
      setIngredients(recipeDetails.data.ingredientsList)

    })
    .catch((err)=>{
      console.log(err)
    })
  }, [id])

  

  // function that updates data when the user is typing
  const handleInputFields = (index, event) =>{
    let data = [...ingredients]
    data[index][event.target.name] = event.target.value
    console.log(data)
    setIngredients(data)
  }

  // function that adds a new input field when the user clicks the button
  const addFields = () => {
    let newField = {ingredient:"", amount:""}
    setIngredients([...ingredients, newField])
  }

  // function that deletes an input fields if the user clicks the button
  const deleteFields = (index) => {
    let data = [...ingredients]
    data.splice(index,1)
    setIngredients(data)
  }

  // function that handles the submit 
  function handleSubmit(e) {
    e.preventDefault();





    // object that contains a new/edited recipe
    const newRecipe = {
      name: name,
      photo_URL: photoURL,
      duration: duration + " mins",
      ingredientsList: ingredients,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags,
    };

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/Recipes/${id}`, newRecipe)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>Edit Recipe</h1>
      {(!name || !photoURL || !duration || !ingredients || !preparation || !description || !servings || !tags) && <p>...loading</p>}
      {(name || photoURL || duration || ingredients || preparation || description || servings || tags) && <Stack id="AddRecipesPage" spacing={2}>
        <FormControl onSubmit={handleSubmit}>
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
            value={`${duration.split(" ")[0]}`}
              name="duration"
              variant="filled"
              type="number"
              size="small"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              endAdornment={<InputAdornment position="end">mins</InputAdornment>}
            />

            <Stack key="" id="ingredients-amounts-stack" direction="column">
            {ingredients.map((oneItem, index)=>{
              return (<Stack key={"ingredient" + index} direction="row" spacing={2}>
                <OutlinedInput value={`${oneItem.ingredient}`} name="ingredient" placeholder="ingredient" onChange={event => handleInputFields(index, event)} />
                <OutlinedInput value={`${oneItem.amount}`} name="amount" placeholder="amount" onChange={event => handleInputFields(index, event)} />
                <IconButton aria-label="delete" onClick={()=>{deleteFields(index)}}>
        <DeleteIcon />
      </IconButton>
              </Stack>)
            })}

                <Button variant="text" onClick={e => addFields(e)}>Add more</Button>
            </Stack>

    

          <FormLabel htmlFor="preparation">Preparation method</FormLabel>
            <OutlinedInput
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
          value={`${description}`}
            name="description"
            variant="filled"
            size="normal"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <FormLabel htmlFor="Tags">Tags</FormLabel>
          {tags.map((oneTag)=>{
            return (
          <OutlinedInput key={oneTag}
          value={`${oneTag}`}
            name="Tags"
            variant="filled"
            size="normal"
            type="text"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />

            )
          })}
          <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>Create</Button>
        </FormControl>
      </Stack>}
    </>
  );
}

export default EditRecipe;
