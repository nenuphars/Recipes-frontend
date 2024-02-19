import axios from 'axios'
import { useEffect, useState } from 'react';

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
    <>
      <div>
        <h3>Description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, iusto dicta iste perspiciatis est molestias.</h3>
        <h4>Feeling insecure?</h4>
        <button onClick={()=>{setRandomRecipe(allRecipes[Math.floor(Math.random() * allRecipes.length)])}}>Get a random recipe</button>
      </div>
      <div>
      {!randomRecipe && <p>...loading</p>}
      {randomRecipe && (
        <>
          <h2>{randomRecipe.name}</h2>
          <img src={randomRecipe.photo_URL} alt={randomRecipe.name} />
          <p><strong>{randomRecipe.duration}</strong></p>
          <p>{randomRecipe.description}</p>

        </>
      )}
      </div>
    </>
  );
}

export default HomePage;
