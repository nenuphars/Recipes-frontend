import axios from 'axios'
import { useEffect, useState } from 'react';
import './HomePage.css'

function HomePage() {
  const [allRecipes, setAllRecipes] = useState([])
  const [randomRecipe, setRandomRecipe] = useState(null)

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
    .then((recipesFromAPI)=>{
      console.log(recipesFromAPI.data)
      setAllRecipes(recipesFromAPI.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])

  useEffect(()=>{
    setRandomRecipe(allRecipes[Math.floor(Math.random() * allRecipes.length)])
    console.log(randomRecipe)

  }, [allRecipes, randomRecipe])
  

  
  return (
    <div id="homepage-container">
      <div className="homepage-wrapper">
        <h3>When you look into your fridge, you have no inspiration?
        What the Fridge wants to help you get out of this misery and prevent any hangriness due to not being able to decide what to cook.</h3>
        <h4>Feeling insecure?</h4>
        <button onClick={()=>{setRandomRecipe(allRecipes[Math.floor(Math.random() * allRecipes.length)])}}>Get a random recipe</button>
      </div>
      <div className="homepage-wrapper">
      {!randomRecipe && <p>...loading</p>}
      {randomRecipe && (
        <>
          <h2>{randomRecipe.name}</h2>
          <div className='random-img-wrapper'>
          <img src={randomRecipe.photo_URL} alt={randomRecipe.name} className='random-recipe-img'/>

          </div>
          <p><strong>{randomRecipe.duration}</strong></p>
          <p>{randomRecipe.description}</p>

        </>
      )}
      </div>
    </div>
  );
}

export default HomePage;
