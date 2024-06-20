import { Card } from '@mui/material';
import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import recipesService from '../services/recipes.services';

function RecipeCard({recipe, currentPage}) {

    const navigate = useNavigate()
    const [confirmDelete, setConfirmDelete] = useState(false)

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

  return (
    <>
        <Card id="eachCard">
        {!confirmDelete && (
            <>

                    <img
                      id="eachPhoto"
                      src={recipe.photo_url}
                      alt={`${recipe.name} dish`}
                    />
                    <h2>{recipe.name} </h2>

                    {currentPage==="dashboard" && (
                        <>
                    <div className='recipe-info-wrapper'>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            navigate(`/dashboard/edit/${recipe._id}`);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      ⏱️ {recipe.duration}{" mins"}
                      <IconButton
                        aria-label="delete"
                        onClick={()=>setConfirmDelete(true)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                        </>
                    )}
                      
                    <div id="tagContainer">
                      {recipe.tags.map((eachTag) => {
                        return (
                          <div className="tag-wrapper" key={eachTag}>
                            {eachTag}
                          </div>
                        );
                      })}
                    </div>
            </>
        )}

                    {confirmDelete && (
            <div id="confirm-delete-wrapper">
            <h4 className='confirm-delete-heading'>Are you sure?</h4>
            <button className='confirm-delete-button' onClick={
                (e)=>{e.preventDefault();
            deleteRecipe(recipe._id)}}
            >
            Yes</button>
            <button className='confirm-delete-button' onClick={()=>setConfirmDelete(false)}>No</button>
            </div>
        )}
                  </Card>
    </>
  )
}

export default RecipeCard