import { useEffect } from "react";
import { useState } from "react";
import "./AllRecipesPage.css";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchBar from "../Components/SearchBar";
import CircularProgress from "@mui/material/CircularProgress";
import recipesService from "../services/recipes.services";

function Dashboard() {
  const [allRecipes, setAllRecipes] = useState("");
  const [dataLoaded, setDataLoaded] = useState("");

  const navigate = useNavigate();

  const deleteRecipe = (id) => {
    recipesService
      .deleteRecipe(id)
      .then(() => {

        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    recipesService
      .getAllRecipes()
      .then((recipes) => {
        setDataLoaded(recipes.data);
        setAllRecipes(recipes.data);
        console.log(recipes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {!dataLoaded && (
        <CircularProgress
          id="circular-progress-dashboard"
          size={100}
          color="success"
        ></CircularProgress>
      )}
      {dataLoaded && (
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
                <Link
                  to={`/Allrecipes/${eachRecipe._id}`}
                  key={eachRecipe._id}
                  style={{ textDecoration: "none" }}
                >
                  <Card id="eachCard">
                    <img
                      id="eachPhoto"
                      src={eachRecipe.photo_url}
                      alt={`${eachRecipe.name} dish`}
                    />
                    <h2>{eachRecipe.name} </h2>

                    <h4>
                      {" "}
                      <Link
                        to={`/dashboard/edit/${eachRecipe._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            deleteRecipe(eachRecipe);
                          }}
                        >
                          <EditIcon />
                        </IconButton>{" "}
                      </Link>{" "}
                      ⏱️ {eachRecipe.duration}{" "}
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          deleteRecipe(eachRecipe._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </h4>
                    <div id="tagContainer">
                      {eachRecipe.tags.map((eachTag) => {
                        return (
                          <div className="tag-wrapper" key={eachTag}>
                            {eachTag}
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
