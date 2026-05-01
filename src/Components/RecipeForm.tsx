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
  FormHelperText,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import { Delete, Send } from '@mui/icons-material';
import {
  type IngredientFormValues,
  type Recipe,
  type RecipeRequest,
  type Tag,
  type Unit,
} from '../types/recipe.types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import {
  createRecipe,
  getRecipe,
  updateRecipe,
} from '../services/recipes.services';
import { appTheme } from '../themes/theme.js';
import RecipeSchema from '../validation/recipe-validation';
import z from 'zod';
import Loading from './Loading.js';

type props = {
  page: 'create' | 'edit';
  recipeId?: string;
};

type FormErrors = {
  nameError?: string;
  durationError?: string;
  servingsError?: string;
  descriptionError?: string;
  preparationError?: string;
  ingredientErrors: {
    ingredient_name?: string;
    ingredient_amount?: string;
    ingredient_measuring?: string;
  }[];
  tagErrors?: string;
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

  function getStyles(item: Tag | Unit, selectedValues: string | string[]) {
    const isSelected = Array.isArray(selectedValues)
      ? selectedValues.includes(item)
      : selectedValues === item;
    return {
      fontWeight: isSelected
        ? appTheme.typography.fontWeightMedium
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
  const [duration, setDuration] = useState<number>(0);
  const [servings, setServings] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [preparation, setPreparation] = useState<string>('');
  const [ingredients, setIngredients] = useState<IngredientFormValues[]>([
    { ingredient_name: '', ingredient_amount: 0, ingredient_measuring: '' },
  ]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [errors, setErrors] = useState<FormErrors>({ ingredientErrors: [] });
  const [fieldErrors, setFieldErrors] = useState<string>('');

  useEffect(() => {
    if (page == 'edit' && recipeId) {
      const fetchRecipe = async (recipeId: string) => {
        try {
          const response: Recipe = await getRecipe(recipeId);
          console.log('Recipe data was fetched:', response);
          setName(response.name);
          setDuration(response.duration);
          setServings(response.servings);
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

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setName(value);
  };

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = Number(e.target.value);
    setDuration(value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handlePreparationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPreparation(value);
  };

  const handleServingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = Number(e.target.value);
    setServings(value);
  };

  const handleIngredientFields = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: 'name' | 'amount',
  ) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) => {
        if (i !== index) return ingredient;
        const value = Number(event.target.value);
        return {
          ...ingredient, // copy the existing object
          ...(type === 'name' && { ingredient_name: event.target.value }),
          ...(type === 'amount' && {
            ingredient_amount: value,
          }),
        };
      }),
    );
  };

  const handleChangeUnit = (index: number, event: SelectChangeEvent<Unit>) => {
    const {
      target: { value },
    } = event;

    setIngredients((prev) =>
      prev.map((ingredient, i) => {
        if (i === index) {
          return { ...ingredient, ingredient_measuring: value };
        } else {
          return ingredient;
        }
      }),
    );
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
      ingredient_amount: 0,
      ingredient_measuring: '',
    };
    setIngredients([...ingredients, newField]);
  };

  const deleteIngredientFields = (index: number) => {
    if (ingredients.length === 1) {
      return setIngredients([
        {
          ingredient_name: '',
          ingredient_amount: 0,
          ingredient_measuring: '',
        },
      ]);
    }
    let data = [...ingredients];
    data.splice(index, 1);
    setIngredients(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ ingredientErrors: [] });

    if (!user) {
      return;
    }

    const recipeData: RecipeRequest = {
      name,
      duration: Number(duration),
      ingredientsList: ingredients,
      preparation,
      description,
      servings: Number(servings),
      tags,
      creator: { _id: user._id, user_name: user.user_name },
    };

    const recipeValidation = RecipeSchema.safeParse(recipeData);
    if (!recipeValidation.success) {
      const fieldErrors = recipeValidation.error.flatten((issue) => issue); // keeps full issues
      const zodErrors = z.treeifyError(recipeValidation.error); // structured by field path
      const prettyErrors = z.prettifyError(recipeValidation.error);

      const mapped: FormErrors = {
        nameError: zodErrors.properties?.name?.errors[0],
        durationError: zodErrors.properties?.duration?.errors[0],
        servingsError: zodErrors.properties?.servings?.errors[0],
        descriptionError: zodErrors.properties?.description?.errors[0],
        preparationError: zodErrors.properties?.preparation?.errors[0],
        ingredientErrors: ingredients.map((_, i) => ({
          ingredient_name:
            zodErrors.properties?.ingredientsList?.items?.[i]?.properties
              ?.ingredient_name?.errors[0],
          ingredient_amount:
            zodErrors.properties?.ingredientsList?.items?.[i]?.properties
              ?.ingredient_amount?.errors[0],
          ingredient_measuring:
            zodErrors.properties?.ingredientsList?.items?.[i]?.properties
              ?.ingredient_measuring?.errors[0],
        })),
        tagErrors: zodErrors.properties?.tags?.errors[0],
      };
      setFieldErrors(prettyErrors);
      setErrors(mapped);
      return;
    }
    try {
      if (page == 'edit' && recipeId) {
        const response = await updateRecipe(recipeId, recipeData);
        console.log('Edited a recipe: ', response.data);
        navigate(`/recipes/${recipeId}`);
      } else {
        const response = await createRecipe(recipeData);
        console.log('new recipe:', response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Error occured when creating/updating a recipe: ', error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleSubmit} style={{ width: '70%', margin: '20px' }}>
          <Stack
            id="create-recipe-container"
            sx={{
              // m: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              // width: '70%',
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
                type="number"
                sx={{ width: '50%' }}
                label="Duration"
                value={duration || ''}
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
                type="number"
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
              <Stack
                id="ingredients-list-wrapper"
                direction="column"
                spacing={2}
              >
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
                          error={
                            !!errors.ingredientErrors[index]?.ingredient_name
                          }
                          helperText={
                            errors.ingredientErrors[index]?.ingredient_name
                          }
                        />
                        <TextField
                          className="ingredient-textfield"
                          label="Amount"
                          type="number"
                          name="ingredient_amount"
                          key={`amount-${index}`}
                          value={oneItem.ingredient_amount || ''}
                          onChange={(event) =>
                            handleIngredientFields(index, event, 'amount')
                          }
                          error={
                            !!errors.ingredientErrors[index]?.ingredient_amount
                          }
                          helperText={
                            errors.ingredientErrors[index]?.ingredient_amount
                          }
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
                  onClick={() => addFields()}
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
                error={!!errors.tagErrors}
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
              sx={{ width: '300px', alignSelf: 'center' }}
              size="large"
              variant="contained"
              endIcon={<Send />}
              type="submit"
            >
              {page}
            </Button>
            {fieldErrors && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {fieldErrors}
              </Alert>
            )}
          </Stack>
        </form>
      )}
    </>
  );
}

export default RecipeForm;
