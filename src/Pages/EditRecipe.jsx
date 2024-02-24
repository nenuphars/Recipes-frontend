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

  // state for current Recipe details
  const [recipeData,setRecipeData] = useState(null)

  // states for all form inputs
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([]);
  
  // state for ingredients and amount
  const [inputFields, setInputFields] = useState([{ingredient:"", amount:""}])

  // get data for the current recipe to be modified
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/Recipes/${id}`)
    .then((recipeDetails)=>{
      console.log(recipeDetails.data)
      setRecipeData(recipeDetails.data)

      // split the data for the duration so you end up with a number (works only minutes)
      let splitDuration = recipeData.duration.split(" ")
      setDuration(splitDuration)
      console.log(splitDuration)

      // create ingredient and quantity pairs
      let ingredientsAmountsArray = []
      let ingredientsArray = [...recipeData.ingredients]
      ingredientsArray.forEach((oneIngredient)=>{
        ingredientsAmountsArray.push({ingredient: oneIngredient})
      })
      
      let amountsArray = [...recipeData.quantity]
      amountsArray.forEach((oneAmount)=>{
        ingredientsAmountsArray.forEach((oneObj)=>{
          console.log(oneObj.amount)
          oneObj.amount = oneAmount
        })
      })
      console.log(ingredientsAmountsArray)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [id])
  
  

  // function that updates data when the user is typing
  const handleInputFields = (index, event) =>{
    let data = [...inputFields]
    data[index][event.target.name] = event.target.value
    console.log(data)
    setInputFields(data)
  }

  // function that adds a new input field when the user clicks the button
  const addFields = () => {
    let newField = {ingredient:"", amount:""}
    setInputFields([...inputFields, newField])
  }

  // function that deletes an input fields if the user clicks the button
  const deleteFields = (index) => {
    let data = [...inputFields]
    data.splice(index,1)
    setInputFields(data)
  }

  // function that handles the submit 
  function handleSubmit(e) {
    e.preventDefault();

    // returns all ingredients to the ingredients state
    const ingredientsArray = inputFields.map((oneIngredient)=>{
      return oneIngredient.ingredient;
    })
    
    // returns all the amounts to the quantity array
    const quantityArray = inputFields.map((oneAmount)=>{
      return oneAmount.amount;
    })

    // object that contains a new/edited recipe
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

    // axios
    //   .put(`${import.meta.env.VITE_BASE_URL}/Recipes`, newRecipe)
    //   .then(() => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <>
      <h1>Edit Recipe</h1>
      {!recipeData && <p>...loading</p>}
      {recipeData && <Stack id="AddRecipesPage" spacing={2}>
        <FormControl onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <OutlinedInput
          value={`${recipeData.name}`}
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
          value={`${recipeData.photo_URL}`}
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
            value={`${duration[0]}`}
              name="duration"
              variant="filled"
              type="number"
              size="small"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              endAdornment={<InputAdornment position="end">mins</InputAdornment>}
            />

            <Stack key="" id="ingredients-amounts-stack" direction="row">
            <Stack id="ingredients-stack">
            {recipeData.ingredients.map((ingredient, index)=>{
              return (<Stack key={"ingredient" + index} direction="row" spacing={2}>
                <OutlinedInput value={`${ingredient}`} name="ingredient" placeholder="ingredient" onChange={event => handleInputFields(index, event)} />
              
              </Stack>)
            })}

                <Button variant="text" onClick={e => addFields(e)}>Add more</Button>
            </Stack>
            <Stack id="amounts-stack">
            {recipeData.quantity.map((quantity, index)=>{
              return (<Stack key={"quantity" + index} direction="row" spacing={2}>
                <OutlinedInput value={`${quantity}`} name="amount" placeholder="amount" onChange={event => handleInputFields(index, event)} />
                <IconButton aria-label="delete" onClick={()=>{deleteFields(index)}}>
        <DeleteIcon />
      </IconButton>
              </Stack>)
            })}

                <Button variant="text" onClick={e => addFields(e)}>Add more</Button>
            </Stack>
            </Stack>

    

          <FormLabel htmlFor="preparation">Preparation method</FormLabel>
            <OutlinedInput
            value={`${recipeData.preparation}`}
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
            value={`${recipeData.servings}`}
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
          value={`${recipeData.description}`}
            name="description"
            variant="filled"
            size="normal"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <FormLabel htmlFor="Tags">Tags</FormLabel>
          {recipeData.tags.map((oneTag)=>{
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
