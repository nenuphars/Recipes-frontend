import {Link} from "react-router-dom"

function Navbar() {


    return (
      <>
        <h1>Navbar Element</h1>
        <Link to="/">Go to Homepage</Link>
        <Link to="/Allrecipes">Search all recipes</Link>
        <Link to="/CreateRecipe">Add a new recipe</Link>
      </>
    )
  }
  
  export default Navbar
  