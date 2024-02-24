import { useState } from "react";
import axios from "axios";
import { Button, FormControl, FormLabel, Stack, InputAdornment, OutlinedInput, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


function CreateRecipePage() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([""]);
  const [ingredients, setIngredients] = useState([{ingredient:"", amount:""}])
  const navigate = useNavigate()

  const handleIngredientFields = (index, event) =>{
    let data = [...ingredients]
    data[index][event.target.name] = event.target.value
    console.log(data)
    setIngredients(data)
  }

  const handleTagField = (index, event) =>{
    let data = [...tags]
    data[index] = event.target.value
    console.log(data)
    setTags(data)
  }

  const addFields = () => {
    let newField = {ingredient:"", amount:""}
    setIngredients([...ingredients, newField])
  }

  const addTagField = () => {
    let newField = ""
    setTags([...tags, newField])
  }

  const deleteIngredientFields = (index) => {
    if(ingredients.length===1){
      return setIngredients([{ingredient: "", amount: ""}])
    }
    let data = [...ingredients]
    data.splice(index,1)
    setIngredients(data)
  }
  const deleteTagField = (index) => {
    let data = [...tags]
    data.splice(index,1)
    setTags(data)
  }
  function handleSubmit(e) {
    e.preventDefault();

    
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
      .post(`${import.meta.env.VITE_BASE_URL}/Recipes`, newRecipe)
      .then(() => {
        navigate("/dashboard")
      })
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
            {ingredients.map((input, index)=>{
              return (<Stack key={index} direction="row" spacing={2}>
                <OutlinedInput name="ingredient" placeholder="ingredient" value={input.ingredient} onChange={event => handleIngredientFields(index, event)} />
                <OutlinedInput name="amount" placeholder="amount" value={input.amount} onChange={event => handleIngredientFields(index, event)} />
                <IconButton aria-label="delete" onClick={()=>{deleteIngredientFields(index)}}>
        <DeleteIcon />
      </IconButton>
              </Stack>)
            })}
                <Button variant="text" onClick={e => addFields(e)}>Add more</Button>

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
          {tags.map((input, index)=>{
              return (<Stack key={index} direction="row" spacing={2}>
                <OutlinedInput name="Tag" placeholder="Tag" value={input} onChange={event => handleTagField(index, event)} />
                <IconButton aria-label="delete" onClick={()=>{deleteTagField(index)}}>
        <DeleteIcon />
      </IconButton>
                <Button variant="text" onClick={e => addTagField(e)}>Add more</Button>
              </Stack>)
            })}
        
          

          <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>Create</Button>
        </FormControl>
      </Stack>
    </>
  );
}

export default CreateRecipePage;
