import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Card } from '@mui/material'
import './HomePage.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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
        <span className="cursive"> What the Fridge </span>
         wants to help you get out of this misery and prevent any hangriness due to not being able to decide what to cook.</h3>
        <h4>Feeling insecure?</h4>
        <button onClick={()=>{setRandomRecipe(allRecipes[Math.floor(Math.random() * allRecipes.length)])}}>Get a random recipe</button>
      </div>
      <div className="homepage-wrapper">
      {!randomRecipe && <p>...loading</p>}
      {randomRecipe && (
        <Link to={`/Allrecipes/${randomRecipe.id}`}  key={randomRecipe.id} style={{textDecoration:"none"}}>
            <Card id="eachCard" >
            
              <img
              className="random-img-wrapper"
                src={randomRecipe.photo_URL}
                alt={`${randomRecipe.name} dish`}
              />
              <h2>{randomRecipe.name}</h2>

              <h4 >⏱️ {randomRecipe.duration}</h4>
              <div id="tagContainer">
                {randomRecipe.tags.map((eachTag) => {
                  return <div key={eachTag}>{eachTag}</div>;
                })}
              </div>
            </Card>
            </Link>
      )}
      </div>
    </div>
  );
}

export default HomePage;
