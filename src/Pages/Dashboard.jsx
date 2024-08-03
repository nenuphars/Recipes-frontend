import { useContext, useEffect } from "react";
import { useState } from "react";
import "./AllRecipesPage.css";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchBar from "../Components/SearchBar";
import CircularProgress from "@mui/material/CircularProgress";
import recipesService from "../services/recipes.services";
import RecipeCard from "../Components/RecipeCard";
import { AuthContext } from "../context/auth.context";
import NoAccess from "../Components/NoAccess";

function Dashboard() {
  const [allRecipes, setAllRecipes] = useState("");
  const [dataLoaded, setDataLoaded] = useState("");
  const [hasRecipes, setHasRecipes] = useState(true)

  const { user, isLoggedIn } = useContext(AuthContext)

  

  useEffect(() => {
    if(user){
      console.log("user id", user._id)
      recipesService
        .getRecipeQuery({creator:user._id})
        .then((recipes) => {
          setDataLoaded(recipes.data);
          setAllRecipes(recipes.data);
          console.log(recipes.data);
          if(!recipes.data){
            setHasRecipes(false)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
    {!isLoggedIn && 
    <>
      <NoAccess></NoAccess>
    </>
    }
      {isLoggedIn && !dataLoaded && !hasRecipes && (
        <CircularProgress
          id="circular-progress-dashboard"
          size={100}
          color="success"
        ></CircularProgress>
      )}
      {isLoggedIn && (
        <div>
          <SearchBar setPropsRecipes={setAllRecipes}></SearchBar>
          <div id="eachRecipeContainer">
            <Link
              to={"/dashboard/CreateRecipe"}
              style={{ textDecoration: "none" }}
            >
              <Card id="addCard">
                <div id="AddCardPhoto">
                  <AddRoundedIcon
                    color="primary"
                    style={{ fontSize: 175 }}
                  ></AddRoundedIcon>
                </div>

                <h2 id="AddCardText">Add a new recipe </h2>
              </Card>
            </Link>
            {dataLoaded && hasRecipes && (
              <>
              {allRecipes.map((eachRecipe) => {
              return (
                  <RecipeCard key={eachRecipe._id} recipe={eachRecipe} currentPage="dashboard"></RecipeCard>
              );
            })}
              </>
            )}
            
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
