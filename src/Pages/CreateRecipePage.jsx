import { useContext, useState } from 'react';
import {
  Button,
  Stack,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './CreateRecipe.css';
import recipesService from '../services/recipes.services';
import { AuthContext } from '../context/auth.context';

function CreateRecipePage() {
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState('');
  const [tags, setTags] = useState(['']);
  const [ingredients, setIngredients] = useState([
    { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
  ]);

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

  function handleTagSelectChange(selectedOption) {
    setTags(selectedOption.value);
  }

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleIngredientFields = (index, event) => {
    let data = [...ingredients];
    if (!event.target) {
      console.log(event.value);
      data[index].ingredient_measuring = event.value;
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

  const addFields = () => {
    let newField = {
      ingredient_name: '',
      Ingredient_amount: '',
      ingredient_measuring: '',
    };
    setIngredients([...ingredients, newField]);
  };

  // const addTagField = () => {
  //   let newField = "";
  //   setTags([...tags, newField]);
  // };

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
  function handleSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      name: name,
      photo_url: photoURL,
      duration: duration,
      ingredientsList: ingredients,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags,
      creator: user._id,
    };

    recipesService
      .createRecipe(newRecipe)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="CreateRecipePage" className="page-wrapper">
      <h1>Create a new recipe</h1>
      <Stack id="create-recipe-container" spacing={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <TextField
            label="Photo URL"
            type="url"
            onChange={(e) => {
              setPhotoURL(e.target.value);
            }}
          />
          <TextField
            label="Duration"
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
            label="Servings"
            type="number"
            onChange={(e) => {
              setServings(e.target.value);
            }}
          />

          <TextField
            multiline
            label="Short description"
            type="text"
            rows={4}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="ingredients-container">
            <Stack id="ingredients-list-wrapper">
              <h4>Ingredient List</h4>
              {ingredients.map((input, index) => {
                return (
                  <>
                    <Stack
                      className="ingredients-list-input-row"
                      key={index}
                      direction="row"
                    >
                      <TextField
                        className="ingredient-textfield"
                        label="Ingredient"
                        name="ingredient_name"
                        value={input.ingredient_name}
                        onChange={(event) =>
                          handleIngredientFields(index, event)
                        }
                      />
                      <TextField
                        className="ingredient-textfield"
                        label="Amount"
                        name="ingredient_amount"
                        type="number"
                        value={input.ingredient_amount}
                        onChange={(event) =>
                          handleIngredientFields(index, event)
                        }
                      />
                      <Select
                        label="Select Unit"
                        placeholder="Unit"
                        name="ingredient_measuring"
                        options={unitOptions}
                        value={unitOptions.selectedOption}
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
                  </>
                );
              })}
              <Button
                className="add-button"
                size="medium"
                variant="text"
                onClick={(e) => addFields(e)}
              >
                Add more
              </Button>
            </Stack>
          </div>

          <TextField
            multiline
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
                    options={tagOptions}
                    onChange={(event) => handleTagField(index, event)}
                    styles={selectStyles}
                  />
                  {/* <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteTagField(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </Stack>
              );
            })}
            {/* <Button
              className="add-button"
              size="medium"
              variant="text"
              onClick={(e) => addTagField(e)}
            >
              Add more
            </Button> */}
          </Stack>

          <Button
            className="submit-button"
            size="large"
            onClick={handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Create
          </Button>
        </form>
      </Stack>
    </div>
  );
}

export default CreateRecipePage;
