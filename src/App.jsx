import './App.css'
import Navbar from './Components/NavBar'
import {Route, Routes} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import AllRecipesPage from "./Pages/AllRecipesPage"

function App() {


  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/Allrecipes' element={<AllRecipesPage></AllRecipesPage>}></Route>
      </Routes>
    </>
  )
}

export default App
