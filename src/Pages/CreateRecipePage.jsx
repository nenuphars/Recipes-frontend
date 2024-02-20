import { useState } from "react";
import axios from "axios";
import { Button, FormControl, FormLabel, Stack, InputAdornment, OutlinedInput, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function CreateRecipePage() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [duration, setDuration] = useState(0);
  // const [ingredients, setIngredients] = useState([]);
  // const [quantity, setQuantity] = useState([]);
  const [preparation, setPreparation] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState("");
  const [inputFields, setInputFields] = useState([{ingredient:"", amount:""}])

  const handleInputFields = (index, event) =>{
    let data = [...inputFields]
    data[index][event.target.name] = event.target.value
    console.log(data)
    setInputFields(data)
  }

  const addFields = () => {
    let newField = {ingredient:"", amount:""}
    setInputFields([...inputFields, newField])
  }

  const deleteFields = (index) => {
    let data = [...inputFields]
    data.splice(index,1)
    setInputFields(data)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const ingredientsArray = inputFields.map((oneIngredient)=>{
      return oneIngredient.ingredient;
    })

    const quantityArray = inputFields.map((oneAmount)=>{
      return oneAmount.amount;
    })

    const newRecipe = {
      name: name,
      photo_URL: photoURL,
      duration: duration + " mins",
      ingredients: ingredientsArray,
      quantity: quantityArray,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/Recipes`, newRecipe)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>Create recipe Page</h1>
      <Stack id="AddRecipesPage" spacing={2}>
        <FormControl onSubmit={handleSubmit}>
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
            {inputFields.map((input, index)=>{
              return (<Stack key={index} direction="row" spacing={2}>
                <OutlinedInput name="ingredient" placeholder="ingredient" value={input.ingredient} onChange={event => handleInputFields(index, event)} />
                <OutlinedInput name="amount" placeholder="amount" value={input.amount} onChange={event => handleInputFields(index, event)} />
                <IconButton aria-label="delete" onClick={()=>{deleteFields(index)}}>
        <DeleteIcon />
      </IconButton>
                <Button variant="text" onClick={e => addFields(e)}>Add more</Button>
              </Stack>)
            })}

          <FormLabel htmlFor="preparation">Preparation method</FormLabel>
            <OutlinedInput
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
            name="description"
            variant="filled"
            size="normal"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <FormLabel htmlFor="Tags">Tags</FormLabel>
          <OutlinedInput
            name="Tags"
            variant="filled"
            size="normal"
            type="text"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
          <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>Create</Button>
        </FormControl>
      </Stack>
    </>
  );
}

export default CreateRecipePage;
