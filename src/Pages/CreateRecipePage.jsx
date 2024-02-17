import { useState } from "react";

function CreateRecipePage() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [ingredients, setIngredients] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newBeer = {
      name: name,
      photo:photo,
      description: description,
      tags: tags,
      ingredients: ingredients,
    };}

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
        <label htmlFor="Photo">
          Photo
        </label>
          <input
          name='photo'
            type="url"
            onChange={(e) => {
              setPhoto(e.target.value);
            }}
          />
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
        <label htmlFor="Ingredients">
          Ingredients
        </label>
          <input
          name='Ingredients'
            type="text"
            onChange={(e) => {
              setIngredients(e.target.value);
            }}
          />
      <button>Create</button>
      </form>
    </div>
      </>
    )
  }
  
  export default CreateRecipePage
  

