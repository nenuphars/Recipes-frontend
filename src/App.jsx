import './App.css'
import Navbar from './Components/NavBar'
import {Route, Routes} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import AllRecipesPage from "./Pages/AllRecipesPage"
import RecipeDetailsPage from './Pages/RecipeDetailsPage'
import CreateRecipePage from './Pages/CreateRecipePage'

function App() {


  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/Allrecipes' element={<AllRecipesPage></AllRecipesPage>}></Route>
        <Route path='/Allrecipes/:id' element={<RecipeDetailsPage></RecipeDetailsPage>}></Route>
        <Route path='/CreateRecipe' element={<CreateRecipePage></CreateRecipePage>}></Route>
      </Routes>
    </>
  )
}

export default App
