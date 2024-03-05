
import './App.css'
import Navbar from './Components/NavBar'
import {Route, Routes} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import AllRecipesPage from "./Pages/AllRecipesPage"
import RecipeDetailsPage from './Pages/RecipeDetailsPage'
import CreateRecipePage from './Pages/CreateRecipePage'
import EditRecipe from './Pages/EditRecipe'
import Dashboard from './Pages/Dashboard'
import FAQPage from './Pages/FAQPage'

function App() {


  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/Allrecipes' element={<AllRecipesPage />}></Route>
        <Route path='/FAQ' element={<FAQPage />}></Route>
        <Route path='/Allrecipes/:id' element={<RecipeDetailsPage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dashboard/edit/:id' element={<EditRecipe />}></Route>
        <Route path='/dashboard/CreateRecipe' element={<CreateRecipePage />}></Route>
      </Routes>
    </>
  )
}

export default App
