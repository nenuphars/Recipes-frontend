
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
import ErrorPage from './Pages/ErrorPage'

function App() {


  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/recipes' element={<AllRecipesPage />}></Route>
        <Route path='/FAQ' element={<FAQPage />}></Route>
        <Route path='/recipes/:id' element={<RecipeDetailsPage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dashboard/edit/:id' element={<EditRecipe />}></Route>
        <Route path='/dashboard/CreateRecipe' element={<CreateRecipePage />}></Route>
        <Route path='/*' element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </>
  )
}

export default App
