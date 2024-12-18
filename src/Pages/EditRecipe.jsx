import { useEffect, useState, useContext } from 'react';
import {
  Button,
  Stack,
  InputAdornment,
  TextField,
  IconButton,
  Select,
  OutlinedInput,
  MenuItem,
  FormControl,
  Box,
  Chip,
  useTheme,
  FormHelperText,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const theme = useTheme();

  // states for all form inputs
  const [name, setName] = useState('');
  // const [photoURL, setPhotoURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState('');
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([
    { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
  ]);
  // const [creator, setCreator] = useState('');

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  let unitOptions = [
    'g',
    'kg',
    'ml',
    'l',
    'pinch',
    'whole',
    'tbsp',
    'tsp',
    'cups',
    'bunch',
  ];

  let tagOptions = [
    'Pasta 🍝',
    'Comfort food 🛏️',
    'Chicken 🍗',
    'Salad 🥗',
    'Vegetarian 🥣',
    'Tacos 🌮',
    'Beef 🥩',
    'Curry 🍛',
    'Seafood 🦞',
    'Grilled ♨️',
    'Healthy ❤️',
    'Rice 🍚',
    'Stew 🍲',
    'Soup 🍜',
    'Vegan 🥦',
    'Quick & Easy ⚡',
    'Fish 🐟',
    'Pork 🐖',
    'Sandwiches 🥪',
    'Fruity 🍋',
    'Spicy 🌶️',
  ];

  function getStyles(tag, tagName, theme) {
    return {
      fontWeight: tagName.includes(tag)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  // get data for the current recipe to be modified
  useEffect(() => {
    recipesService
      .getRecipe(id)
      .then((recipeDetails) => {
        console.log(recipeDetails.data);

        setName(recipeDetails.data.name);
        // setPhotoURL(recipeDetails.data.photo_url);
        setDuration(recipeDetails.data.duration);

        setPreparation(recipeDetails.data.preparation);
        setDescription(recipeDetails.data.description);
        setServings(recipeDetails.data.servings);
        setTags(recipeDetails.data.tags);
        setIngredients(recipeDetails.data.ingredientsList);
        // setCreator(recipeDetails.data.creator);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // function that updates data for arrays when the user is typing
  const handleIngredientFields = (index, event, type) => {
    let data = [...ingredients];

    if (event.target.value && type === 'name') {
      data[index].ingredient_name = event.target.value;
    }
    if (event.target.value && type === 'amount') {
      data[index].ingredient_amount = event.target.value;
    } else {
      data[index].ingredient_amount = event.selectedOption;
    }

    setIngredients(data);
  };

  const handleChangeUnit = (index, event) => {
    const {
      target: { value },
    } = event;
    let data = [...ingredients];
    data[index].ingredient_measuring = value;
    // console.log('changed data', data);
    setIngredients(data);
  };

  const handleChangeTag = (event) => {
    const {
      target: { value },
    } = event;
    // only execute when there are less than three tags selected
    // or when the selected value is already in the array i.e. it's being removed
    if (
      tags.length < 3 ||
      tags.includes(event.explicitOriginalTarget.dataset.value)
    ) {
      setTags(typeof value === 'string' ? value.split(',') : value);
    }
  };

  // const handleDeleteTag = (index) => {
  //   // e.preventDefault();
  //   console.log(index);
  //   let data = [...tags];
  //   data.splice(index, 1);
  //   setTags(data);
  // };

  // functions that add a new input field when the user clicks the button
  const addIngredientFields = () => {
    let newField = {
      ingredient_name: '',
      ingredient_amount: '',
      ingredient_measuring: '',
    };
    setIngredients([...ingredients, newField]);
  };

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

  // function that handles the submit
  function handleSubmit(e) {
    e.preventDefault();

    // object that contains a new/edited recipe
    const newRecipe = {
      name: name,
      // photo_url: photoURL,
      duration: duration,
      ingredientsList: ingredients,
      preparation: preparation,
      description: description,
      servings: servings,
      tags: tags,
      creator: user._id,
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
      <Typography variant="h2" sx={{ fontFamily: 'Edu AU VIC WA NT' }}>
        Edit Recipe
      </Typography>
      {(!name ||
        // !photoURL ||
        !duration ||
        !ingredients ||
        !preparation ||
        !description ||
        !servings ||
        !tags) && <p>...loading</p>}
      {(name ||
        // photoURL ||
        duration ||
        ingredients ||
        preparation ||
        description ||
        servings ||
        tags) && (
        <form onSubmit={handleSubmit}>
          <Stack id="edit-recipe-container" direction={'column'} spacing={4}>
            <TextField
              label="Name"
              value={name}
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            {/* <TextField
              label="Photo URL"
              value={photoURL}
              type="url"
              onChange={(e) => {
                setPhotoURL(e.target.value);
              }}
            /> */}
            <Stack direction="row" spacing={2}>
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
                sx={{ width: '50%' }}
              />

              <TextField
                value={servings}
                label="Servings"
                type="number"
                onChange={(e) => {
                  setServings(e.target.value);
                }}
                sx={{ width: '50%' }}
              />
            </Stack>

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
                          handleIngredientFields(index, event, 'name')
                        }
                        sx={{ width: '50%' }}
                      />
                      <TextField
                        className="ingredient-textfield"
                        value={oneItem.ingredient_amount}
                        label="Amount"
                        type="number"
                        onChange={(event) =>
                          handleIngredientFields(index, event, 'amount')
                        }
                        sx={{ width: '20%' }}
                      />

                      <Select
                        input={<OutlinedInput label="Unit" />}
                        value={oneItem.ingredient_measuring}
                        onChange={(event) => handleChangeUnit(index, event)}
                        MenuProps={MenuProps}
                      >
                        {unitOptions.map((oneUnitOption) => (
                          <MenuItem
                            key={oneUnitOption}
                            value={oneUnitOption}
                            style={getStyles(
                              oneUnitOption,
                              oneUnitOption,
                              theme
                            )}
                          >
                            {oneUnitOption}
                          </MenuItem>
                        ))}
                      </Select>

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

            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                multiple
                value={tags}
                onChange={(event) => handleChangeTag(event)}
                input={<OutlinedInput label="Tag" />}
                MenuProps={MenuProps}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Select tags</em>;
                  }
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          // onClick={() => handleDeleteTag(index)}
                        />
                      ))}
                    </Box>
                  );
                }}
              >
                {tagOptions.map((oneTagOption) => (
                  <MenuItem
                    key={oneTagOption}
                    value={oneTagOption}
                    style={getStyles(oneTagOption, tagOptions, theme)}
                  >
                    {oneTagOption}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Max. 3</FormHelperText>
            </FormControl>

            <Button
              id="submit-button"
              size="large"
              onClick={handleSubmit}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Stack>
        </form>
      )}
    </div>
  );
}

export default EditRecipe;
