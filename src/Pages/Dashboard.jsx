import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchBar from "../Components/SearchBar";

function Dashboard() {
  const [allRecipes, setAllRecipes] = useState([]);
  const navigate = useNavigate();

  const deleteFields = (index) => {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/Recipes/${index}`)
      .then((recipes) => {
        setAllRecipes(recipes.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/Recipes`)
      .then((recipes) => {
        setAllRecipes(recipes.data);
        console.log(recipes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
    <SearchBar></SearchBar>
      <div id="eachRecipeContainer">
        <Link to={'/dashboard/CreateRecipe'} style={{ textDecoration: "none" }}><Card id="addCard">
          <div id="AddCardPhoto">
            <AddRoundedIcon color='primary' style={{ fontSize: 175 }} ></AddRoundedIcon>
          </div>

          <h2 id="AddCardText">Add a new recipe </h2>
        </Card></Link>
        {allRecipes.map((eachRecipe) => {
          return (
            <Link
              to={`/Allrecipes/${eachRecipe.id}`}
              key={eachRecipe.id}
              style={{ textDecoration: "none" }}
            >
              <Card id="eachCard">
                <img
                  id="eachPhoto"
                  src={eachRecipe.photo_URL}
                  alt={`${eachRecipe.name} dish`}
                />
                <h2>{eachRecipe.name} </h2>

                <h4>
                  {" "}
                  <Link to={`/dashboard/edit/${eachRecipe.id}`} style={{ textDecoration: "none" }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      deleteFields(eachRecipe);
                    }} 
                  > 
                    <EditIcon /> 
                  </IconButton> </Link>{" "}
                  ⏱️ {eachRecipe.duration}{" "}
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteFields(eachRecipe.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </h4>
                <div id="tagContainer">
                  {eachRecipe.tags.map((eachTag) => {
                    return <div key={eachTag}>{eachTag}</div>;
                  })}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
