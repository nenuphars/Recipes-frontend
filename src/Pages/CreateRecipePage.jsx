import { useState } from "react";
import axios from 'axios'

function CreateRecipePage() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [preparation, setPreparation] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      name: name,
      photo_URL: photoURL,
      duration: duration,
      ingredients: ingredients,
      quantity: quantity,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags
    };

    axios.post(`${import.meta.env.VITE_BASE_URL}/Recipes`, newRecipe)
    .then(()=>{})
    .catch((err)=>{
      console.log(err)
    })
    
  }

    return (
      <>
        <h1>Create recipe Page</h1>
        <div id="AddRecipesPage">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
        </label>
          <input
          name='name'
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        <label htmlFor="photo">
          Photo URL
        </label>
          <input
          name='photo'
            type="url"
            onChange={(e) => {
              setPhotoURL(e.target.value);
            }}
          />
          <label htmlFor="duration">
          Duration
            <input name="duration" type="number" onChange={(e)=>{setDuration(e.target.value)}} />
          </label>
          <label htmlFor="ingredients">
          Ingredients
            <input name="ingredients" type="text" onChange={(e)=>{setIngredients(e.target.value)}} />
          </label>
          <label htmlFor="quantity">
          Quantity of each ingredient
            <input name="quantity" type="text" onChange={(e)=>{setQuantity(e.target.value)}} />
          </label>
          <label htmlFor="preparation">
          Preparation method
            <textarea name="preparation" type="text" onChange={(e)=>{setPreparation(e.target.value)}} />
          </label>
          <label htmlFor="servings">
          Servings
            <input name="servings" type="number" onChange={(e)=>{setServings(e.target.value)}} />
          </label>
        <label htmlFor="description">
          Description
        </label>
          <textarea
          name='description'
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        <label htmlFor="Tags">
        Tags
        </label>
          <input
          name='Tags'
            type="text"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
      <button>Create</button>
      </form>
    </div>
      </>
    )
  }
  
  export default CreateRecipePage
  

