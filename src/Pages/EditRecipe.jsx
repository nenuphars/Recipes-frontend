import { useEffect, useState, useContext } from 'react';
import {
  Button,
  Stack,
  InputAdornment,
  TextField,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from 'react-select';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useNavigate, useParams } from 'react-router-dom';
import './EditRecipe.css';
import recipesService from '../services/recipes.services';
import { AuthContext } from '../context/auth.context';

function EditRecipe() {
  // params to get the id of the recipe
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  // states for all form inputs
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState('');
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([
    { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
  ]);
  const [newIngredients, setNewIngredients] = useState([
    { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
  ]);
  const [creator, setCreator] = useState('');

  // REACT SELECT STYLING
  // https://react-select.com/styles#inner-components
  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: '16px',
      width: '100%',
      paddingTop: '12.5px',
      paddingBottom: '11.5px',
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      outline: 'red',
      borderRadius: '6px',
      boxSizing: 'content-box',
      padding: '0',
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      border: 'none',
      outline: 'none',
      color: 'black',
      padding: '0',
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      margin: '0',
      borderRadius: '0',
      fontFamily: 'Roboto',
      maxHeight: '30vh',
      overflow: 'scroll',
    }),
  };

  let unitOptions = [
    { value: 'g', label: 'g' },
    { value: 'kg', label: 'kg' },
    { value: 'ml', label: 'ml' },
    { value: 'l', label: 'l' },
    { value: 'pinch', label: 'pinch' },
    { value: 'whole', label: 'whole' },
    { value: 'tbsp', label: 'tbsp' },
    { value: 'tsp', label: 'tsp' },
    { value: 'cups', label: 'cups' },
    { value: 'bunch', label: 'bunch' },
  ];

  let tagOptions = [
    { value: 'Pasta 🍝', label: 'Pasta 🍝' },
    { value: 'Comfort food 🛏️', label: 'Comfort food 🛏️' },
    { value: 'Chicken 🍗', label: 'Chicken 🍗' },
    { value: 'Salad 🥗', label: 'Salad 🥗' },
    { value: 'Vegetarian 🥣', label: 'Vegetarian 🥣' },
    { value: 'Tacos 🌮', label: 'Tacos 🌮' },
    { value: 'Beef 🥩', label: 'Beef 🥩' },
    { value: 'Curry 🍛', label: 'Curry 🍛' },
    { value: 'Seafood 🦞', label: 'Seafood 🦞' },
    { value: 'Grilled ♨️', label: 'Grilled ♨️' },
    { value: 'Healthy ❤️', label: 'Healthy ❤️' },
    { value: 'Rice 🍚', label: 'Rice 🍚' },
    { value: 'Stew 🍲', label: 'Stew 🍲' },
    { value: 'Soup 🍜', label: 'Soup 🍜' },
    { value: 'Vegan 🥦', label: 'Vegan 🥦' },
    { value: 'Quick & Easy ⚡', label: 'Quick & Easy ⚡' },
    { value: 'Fish 🐟', label: 'Fish 🐟' },
    { value: 'Pork 🐖', label: 'Pork 🐖' },
    { value: 'Sandwiches 🥪', label: 'Sandwiches 🥪' },
    { value: 'Fruity 🍋', label: 'Fruity 🍋' },
    { value: 'Spicy 🌶️', label: 'Spicy 🌶️' },
  ];

  let selectedTags = tags.map((oneTag) => {
    return { value: oneTag, label: oneTag };
  });

  function findSelectedUnitOptions(e, selection, unitOptions) {
    // e.preventDefault();
    console.log('selection, unitOptions', selection, unitOptions);
    if (selection) {
      const selectedUnit = unitOptions.map((oneUnit) => {
        return oneUnit.value == selection;
      });
      return selectedUnit;
    }
  }

  // get data for the current recipe to be modified
  useEffect(() => {
    recipesService
      .getRecipe(id)
      .then((recipeDetails) => {
        console.log(recipeDetails.data);

        setName(recipeDetails.data.name);
        setPhotoURL(recipeDetails.data.photo_url);
        setDuration(recipeDetails.data.duration);

        setPreparation(recipeDetails.data.preparation);
        setDescription(recipeDetails.data.description);
        setServings(recipeDetails.data.servings);
        setTags(recipeDetails.data.tags);
        setIngredients(recipeDetails.data.ingredientsList);
        setCreator(recipeDetails.data.creator);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // function that updates data for arrays when the user is typing
  const handleIngredientFields = (index, event) => {
    let data = [...ingredients];
    console.log(ingredients);
    if (!event.target) {
      data[index].ingredient_measuring = event.selectedOption;
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setIngredients(data);
  };

  const handleTagField = (index, event) => {
    let data = [...tags];
    data[index] = event.selectedOption;
    console.log(data);
    setTags(data);
  };

  // functions that add a new input field when the user clicks the button
  const addIngredientFields = () => {
    let newField = {
      ingredient_name: '',
      ingredient_amount: '',
      ingredient_measuring: '',
    };
    setIngredients([...ingredients, newField]);
  };

  // const addTagField = () => {
  //   let newField = "";
  //   setTags([...tags, newField]);
  // };

  // functions that delete an input fields if the user clicks the button
  const deleteIngredientFields = (index) => {
    if (ingredients.length === 1) {
      return setIngredients([
        {
          ingredient_name: '',
          ingredient_amount: '',
          ingredient_measuring: '',
        },
      ]);
    }
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  // const deleteTagField = (index) => {
  //   let data = [...tags];
  //   data.splice(index, 1);
  //   setTags(data);
  // };

  // function that handles the submit
  function handleSubmit(e) {
    e.preventDefault();

    // object that contains a new/edited recipe
    const newRecipe = {
      name: name,
      photo_url: photoURL,
      duration: duration,
      ingredientsList: ingredients,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags,
      creator: creator,
    };

    recipesService
      .updateRecipe(id, newRecipe)
      .then(() => {
        navigate(`/recipes/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="EditRecipePage" className="page-wrapper">
      <h1>Edit Recipe</h1>
      {(!name ||
        !photoURL ||
        !duration ||
        !ingredients ||
        !preparation ||
        !description ||
        !servings ||
        !tags) && <p>...loading</p>}
      {(name ||
        photoURL ||
        duration ||
        ingredients ||
        preparation ||
        description ||
        servings ||
        tags) && (
        <Stack id="edit-recipe-container" spacing={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <TextField
              label="Photo URL"
              value={photoURL}
              type="url"
              onChange={(e) => {
                setPhotoURL(e.target.value);
              }}
            />
            <TextField
              label="Duration"
              value={duration}
              type="number"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mins</InputAdornment>
                ),
              }}
            />

            <TextField
              value={servings}
              label="Servings"
              type="number"
              onChange={(e) => {
                setServings(e.target.value);
              }}
            />

            <TextField
              multiline
              value={description}
              label="Short description"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <div className="ingredients-container">
              <Stack
                id="ingredients-list-wrapper"
                direction="column"
                spacing={2}
              >
                <h4>Ingredient List</h4>
                {ingredients.map((oneItem, index) => {
                  return (
                    <Stack
                      className="ingredients-list-input-row"
                      key={index}
                      direction="row"
                      spacing={2}
                    >
                      <TextField
                        className="ingredient-textfield"
                        value={oneItem.ingredient_name}
                        label="Ingredient"
                        onChange={(event) =>
                          handleIngredientFields(index, event)
                        }
                      />
                      <TextField
                        className="ingredient-textfield"
                        value={oneItem.ingredient_amount}
                        label="Amount"
                        type="number"
                        onChange={(event) =>
                          handleIngredientFields(index, event)
                        }
                      />

                      <Select
                        options={unitOptions}
                        value={{
                          value: oneItem.ingredient_measuring,
                          label: oneItem.ingredient_measuring,
                        }}
                        onChange={(event) =>
                          handleIngredientFields(index, event)
                        }
                        styles={selectStyles}
                      />
                      <IconButton
                        style={
                          index < 1
                            ? { display: 'hidden' }
                            : { display: 'block' }
                        }
                        aria-label="delete"
                        onClick={() => {
                          deleteIngredientFields(index);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  );
                })}
                <Button
                  className="add-button"
                  size="medium"
                  variant="text"
                  onClick={(e) => addIngredientFields(e)}
                >
                  Add more
                </Button>
              </Stack>
            </div>

            <TextField
              multiline
              value={preparation}
              label="Preparation method"
              type="text"
              onChange={(e) => {
                setPreparation(e.target.value);
              }}
              required
            />
            <h4>Tags</h4>
            <Stack className="tags-stack" spacing={2}>
              {tags.map((input, index) => {
                return (
                  <Stack key={index} direction="row" spacing={2}>
                    <Select
                      label="tag"
                      autoWidth
                      isMulti
                      hideSelectedOptions
                      value={{ value: input, label: input }}
                      options={tagOptions}
                      onChange={(event) => handleTagField(index, event)}
                      styles={selectStyles}
                    />
                  </Stack>
                );
              })}
            </Stack>
            <Button
              id="submit-button"
              size="large"
              onClick={handleSubmit}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </form>
        </Stack>
      )}
    </div>
  );
}

export default EditRecipe;
