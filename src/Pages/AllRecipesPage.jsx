import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import '../App.css'
 function AllRecipesPage() {

  const [allRecipes,setAllRecipes] = useState([])
  
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
    .then((recipes)=>{setAllRecipes(recipes.data)
    console.log(recipes.data)})
    .catch((error)=>{
     console.log(error)
    })
   },[])
    return (
      <>
        <h1>All recipes Page</h1>
        {allRecipes.map((eachRecipe)=>{
          return(<h4 id="eachRecipe" className="eachRecipeItem" key={eachRecipe.id}>
          {eachRecipe.name}
          <img id="eachPhoto"src={eachRecipe.photo_URL} alt={`${eachRecipe.name} dish`} />
          {eachRecipe.duration}
          {eachRecipe.tags.map((eachTag)=>{return(<p key={eachTag}>{eachTag}</p>)})}
          </h4>)
        

        })}
      </>
    )}
  
  
  export default AllRecipesPage
  