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

function Dashboard() {
  const [allRecipes, setAllRecipes] = useState("");
  const [dataLoaded, setDataLoaded] = useState("");

  const { user, isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if(user){
      recipesService
        .getRecipeQuery({creator:user._id})
        .then((recipes) => {
          setDataLoaded(recipes.data);
          setAllRecipes(recipes.data);
          console.log(recipes.data);
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
      <h2>You need to be logged in to view this page</h2>
    </>
    }
      {isLoggedIn && !dataLoaded && (
        <CircularProgress
          id="circular-progress-dashboard"
          size={100}
          color="success"
        ></CircularProgress>
      )}
      {isLoggedIn && dataLoaded && (
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
            {allRecipes.map((eachRecipe) => {
              return (
                  <RecipeCard key={eachRecipe._id} recipe={eachRecipe} currentPage="dashboard"></RecipeCard>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
