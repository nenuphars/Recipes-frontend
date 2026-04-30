import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  FormControl,
  Box,
  Chip,
  useTheme,
  FormHelperText,
  Typography,
  type SelectChangeEvent,
  //   Typography,
} from '@mui/material';
import { Delete, Send } from '@mui/icons-material';
import {
  type IngredientErrors,
  type IngredientFormValues,
  type Recipe,
  type RecipeFormErrors,
  type RecipeRequest,
  type Tag,
  type Unit,
} from '../types/recipe.types.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context.js';
import Loading from './Loading.js';
import {
  createRecipe,
  getRecipe,
  updateRecipe,
} from '../services/recipes.services.js';
import { appTheme } from '../themes/theme.js';

type props = {
  page: 'create' | 'edit';
  recipeId?: string;
};

function RecipeForm({ page, recipeId }: props) {
  const navigate = useNavigate();
  if (recipeId) {
    console.log('RECIPE ID', recipeId);
  }
  const { user } = useAuth();

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

  function getStyles(tag: Tag | Unit, tagName: string) {
    return {
      fontWeight: tagName.includes(tag)
        ? appTheme.typography.fontWeightRegular
        : appTheme.typography.fontWeightRegular,
    };
  }

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

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<string>('0');
  const [servings, setServings] = useState<string>('2');
  const [description, setDescription] = useState<string>('');
  const [preparation, setPreparation] = useState<string>('');
  const [ingredients, setIngredients] = useState<IngredientFormValues[]>([
    { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
  ]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [errors, setErrors] = useState<RecipeFormErrors>({
    nameError: '',
    durationError: '',
    descriptionError: '',
    servingsError: '',
    preparationError: '',
    ingredientErrors: [{ name: '', amount: '', measuring: '' }],
    generalIngredientError: '',
  });

  useEffect(() => {
    if (page == 'edit' && recipeId) {
      const fetchRecipe = async (recipeId: string) => {
        try {
          const response: Recipe = await getRecipe(recipeId);
          console.log('Recipe data was fetched:', response);
          setName(response.name);
          setDuration(response.duration.toString());
          setServings(response.servings.toString());
          setDescription(response.description);
          setPreparation(response.preparation);
          setIngredients(response.ingredientsList);
          setTags(response.tags);
        } catch (error) {
          console.log('Error while fetching recipe data', error);
        }
      };
      fetchRecipe(recipeId);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [page, recipeId]);

  // Validation functions

  const validateName = (name: string) => {
    if (!name.trim()) {
      return 'Please give your recipe a name';
    }
    if (name.length < 3) {
      return 'The recipe title must be at least 3 characters';
    }
    if (name.length > 100) {
      return 'Please keep the title short (less than 100 characters)';
    }
    return '';
  };

  const validateDuration = (duration: number) => {
    if (!duration) return 'Please tell us how long this dish takes to cook';
    if (duration < 1) return 'Cooking takes time, put in a duration above 0';
    if (duration > 1440)
      return 'No cooking marathon required, recipes should take less than 24 hours';
    return '';
  };

  const validateDescription = (description: string) => {
    if (!description) return 'Please write a short description of the dish';
    if (description.length < 30) return 'Please put in at least 30 characters';
    if (description.length > 200)
      return 'Keep it short, your description should be less than 200 characters';
    return '';
  };

  const validatePreparation = (value: string) => {
    if (!value)
      return 'Please describe the preparation method in chronological order';
    if (value.length < 30) return 'Please put in at least 30 characters';
    if (value.length > 3000)
      return 'Try to make your preparation method more concise, please (less than 3000 characters)';
    return '';
  };

  const validateServings = (value: number) => {
    if (!value) return 'Please tell us for how many servings this recipe is';
    if (value < 1) return 'Servings must be at least 1';
    if (value > 100) return 'Servings must be less than 100';
    return '';
  };

  const isIngredientComplete = (ingredient: IngredientFormValues) => {
    if (
      ingredient.ingredient_name.trim() !== '' &&
      ingredient.ingredient_amount !== '' &&
      ingredient.ingredient_measuring !== ''
    )
      return true;
  };

  // Helper function to check if an ingredient is completely empty
  const isIngredientEmpty = (ingredient: IngredientFormValues) => {
    return (
      ingredient.ingredient_name.trim() === '' &&
      ingredient.ingredient_amount === '' &&
      ingredient.ingredient_measuring === ''
    );
  };

  // Validate ingredients list as a whole
  const validateIngredientsList = (ingredientsList: IngredientFormValues[]) => {
    // Filter out completely empty ingredients
    const nonEmptyIngredients = ingredientsList.filter(
      (ing) => !isIngredientEmpty(ing),
    );

    // Check if we have at least one complete ingredient
    const hasOneCompleteIngredient = nonEmptyIngredients.some((ing) => {
      return isIngredientComplete(ing);
    });

    // Check for partially filled ingredients
    const hasPartialIngredients = nonEmptyIngredients.some(
      (ing) => !isIngredientComplete(ing),
    );

    if (nonEmptyIngredients.length === 0) {
      return {
        valid: false,
        error: 'Please add at least one ingredient',
        cleanedIngredients: ingredientsList,
      };
    }

    if (!hasOneCompleteIngredient) {
      return {
        valid: false,
        error: 'At least one ingredient must be completely filled out',
        cleanedIngredients: nonEmptyIngredients,
      };
    }

    if (hasPartialIngredients) {
      return {
        valid: false,
        error:
          'Some ingredients are partially filled. Please complete or remove them',
        cleanedIngredients: nonEmptyIngredients,
      };
    }

    return {
      valid: true,
      error: '',
      cleanedIngredients: nonEmptyIngredients,
    };
  };

  const validateIngredient = (
    ingredient: IngredientFormValues,
    index: number,
  ): IngredientErrors[] => {
    const newErrors: IngredientErrors[] = [...errors.ingredientErrors];
    newErrors[index] = {
      name: !ingredient.ingredient_name.trim()
        ? 'Please put in the name of the ingredient'
        : '',
      amount: !ingredient.ingredient_amount
        ? 'Please put in the amount of the ingredient'
        : '',
      measuring: !ingredient.ingredient_measuring
        ? 'Please put in the unit for this ingedient'
        : '',
    };
    return newErrors;
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({
      ...prev,
      name: validateName(value),
    }));
  };

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = Number(e.target.value);
    setDuration(e.target.value);
    setErrors((prev) => ({
      ...prev,
      duration: validateDuration(value),
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setDescription(value);
    setErrors((prev) => ({
      ...prev,
      description: validateDescription(value),
    }));
  };

  const handlePreparationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPreparation(value);
    setErrors((prev) => ({
      ...prev,
      preparation: validatePreparation(value),
    }));
  };
  const handleServingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = Number(e.target.value);
    setErrors((prev) => ({
      ...prev,
      servings: validateServings(value),
    }));
  };

  const handleIngredientFields = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: 'name' | 'amount',
  ) => {
    let data: IngredientFormValues[] = [...ingredients];

    switch (type) {
      case 'name':
        data[index].ingredient_name = event.target.value;
        break;
      case 'amount':
        data[index].ingredient_amount = event.target.value;
        break;
      default:
        break;
    }

    setIngredients(data);

    const newErrors = validateIngredient(data[index], index);
    setErrors((prev) => ({
      ...prev,
      ingredients: newErrors,
    }));
  };

  const handleChangeUnit = (index: number, event: SelectChangeEvent<Unit>) => {
    const {
      target: { value },
    } = event;
    let data: IngredientFormValues[] = [...ingredients];
    data[index].ingredient_measuring = value;
    // console.log('changed data', data);
    setIngredients(data);
  };

  const handleChangeTag = (e: SelectChangeEvent<Tag[]>) => {
    const {
      target: { value },
    } = e;
    // only execute when there are less than three tags selected
    // or when the selected value is already in the array i.e. it's being removed
    if (tags.length < 3) {
      setTags(typeof value === 'string' ? (value.split(',') as Tag[]) : value);
    }
  };

  const addFields = () => {
    let newField = {
      ingredient_name: '',
      ingredient_amount: '',
      ingredient_measuring: '',
    };
    setIngredients([...ingredients, newField]);
  };

  const deleteIngredientFields = (index: number) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page == 'edit' && recipeId && user) {
      const updatedRecipe: RecipeRequest = {
        name,
        duration: Number(duration),
        ingredientsList: ingredients,
        preparation,
        description,
        servings: Number(servings),
        tags,
        creator: { _id: user._id, user_name: user.user_name },
      };

      updateRecipe(recipeId, updatedRecipe)
        .then(() => {
          navigate(`/recipes/${recipeId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (user?._id) {
        const newRecipe: RecipeRequest = {
          name,
          duration: Number(duration),
          ingredientsList: ingredients,
          preparation,
          description,
          servings: Number(servings),
          tags,
          creator: { _id: user?._id, user_name: user?.user_name },
        };

        createRecipe(newRecipe)
          .then(() => {
            console.log('new recipe:', newRecipe);
            navigate('/dashboard');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <Stack
          id="create-recipe-container"
          sx={{
            m: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '70%',
          }}
          spacing={2}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => handleNameChange(e)}
            error={!!errors.nameError}
            helperText={errors.nameError}
            required
          />

          <Stack direction={'row'} gap={2}>
            <TextField
              required
              sx={{ width: '50%' }}
              label="Duration"
              value={duration}
              onChange={(e) => handleDurationChange(e)}
              error={!!errors.durationError}
              helperText={errors.durationError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mins</InputAdornment>
                ),
              }}
            />

            <TextField
              required
              sx={{ width: '50%' }}
              label="Servings"
              value={servings || ''}
              onChange={(e) => handleServingsChange(e)}
              error={!!errors.servingsError}
              helperText={errors.servingsError}
            />
          </Stack>

          <TextField
            multiline
            required
            label="Short description"
            value={description}
            type="text"
            rows={4}
            onChange={(e) => handleDescriptionChange(e)}
            error={!!errors.descriptionError}
            helperText={errors.descriptionError}
          />

          <Stack className="ingredients-container">
            <Stack id="ingredients-list-wrapper" direction="column" spacing={2}>
              <Typography variant="h6">Ingredient List</Typography>
              {ingredients.map((oneItem, index) => {
                return (
                  <>
                    <Stack
                      className="ingredients-list-input-row"
                      direction="row"
                      spacing={2}
                      key={index}
                      sx={{
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        display: 'grid',
                        // gap: '0.4rem',
                        gridTemplateColumns: '1fr 1fr 1fr 0.2fr',
                      }}
                    >
                      <TextField
                        className="ingredient-textfield"
                        label="Ingredient"
                        name="ingredient_name"
                        key={`name-${index}`}
                        value={oneItem.ingredient_name}
                        onChange={(event) =>
                          handleIngredientFields(index, event, 'name')
                        }
                        // sx={{ width: '50%' }}
                        error={!!errors.ingredientErrors[index]?.name}
                        helperText={errors.ingredientErrors[index]?.name}
                      />
                      <TextField
                        className="ingredient-textfield"
                        label="Amount"
                        name="ingredient_amount"
                        key={`amount-${index}`}
                        value={oneItem.ingredient_amount}
                        type="number"
                        onChange={(event) =>
                          handleIngredientFields(index, event, 'amount')
                        }
                        error={!!errors.ingredientErrors[index]?.amount}
                        helperText={errors.ingredientErrors[index]?.amount}
                      />
                      <Select
                        input={<OutlinedInput />}
                        label="Unit"
                        // sx={{ width: '30%' }}
                        key={`measuring-${index}`}
                        value={oneItem.ingredient_measuring}
                        name="ingredient_measuring"
                        onChange={(event) => handleChangeUnit(index, event)}
                        MenuProps={MenuProps}
                      >
                        {unitOptions.map((oneUnitOption) => (
                          <MenuItem
                            key={oneUnitOption}
                            value={oneUnitOption}
                            style={getStyles(oneUnitOption, oneUnitOption)}
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
                        <Delete />
                      </IconButton>
                    </Stack>
                  </>
                );
              })}
              <Button
                className="add-button"
                size="medium"
                variant="text"
                sx={{ width: '130px', height: '70px' }}
                onClick={(e) => addFields()}
              >
                Add more
              </Button>
            </Stack>
          </Stack>

          <TextField
            multiline
            minRows={4}
            label="Preparation method"
            type="text"
            value={preparation}
            onChange={handlePreparationChange}
            error={!!errors.preparationError}
            helperText={errors.preparationError}
            required
          />

          <h4>Tags</h4>
          <FormControl sx={{ md: 1, width: 300 }}>
            <Select
              multiple
              displayEmpty
              value={tags}
              onChange={(event) => handleChangeTag(event)}
              input={<OutlinedInput label="Tag" />}
              MenuProps={MenuProps}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select tags</em>; // Placeholder when no tags are selected
                }
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                );
              }}
            >
              {tagOptions.map((oneTagOption) => (
                <MenuItem
                  key={oneTagOption}
                  value={oneTagOption}
                  style={getStyles(oneTagOption, tagOptions)}
                >
                  {oneTagOption}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Max. 3</FormHelperText>
          </FormControl>

          <Button
            // className="submit-button"
            sx={{ width: '300px', alignSelf: 'center' }}
            size="large"
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            endIcon={<Send />}
            type="submit"
          >
            {page}
          </Button>
          {errors.generalIngredientError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.generalIngredientError}
            </Alert>
          )}
        </Stack>
      )}
    </>
  );
}

export default RecipeForm;
