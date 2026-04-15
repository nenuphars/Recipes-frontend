import { useContext } from 'react';
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
  //   Typography,
} from '@mui/material';
import { RecipeContext } from '../context/recipe.context.jsx';
import { Delete, Send } from '@mui/icons-material';

function RecipeForm({ handleSubmit, page, recipeData }) {
  const theme = useTheme();

  const {
    handleNameChange,
    handleDurationChange,
    handleDescriptionChange,
    handleServingsChange,
    handleIngredientFields,
    handlePreparationChange,
    handleChangeTag,
    handleChangeUnit,
    addFields,
    deleteIngredientFields,
    errors,
    name,
    duration,
    servings,
    description,
    ingredients,
    preparation,
    tags,
    // setName,
    // setDuration,
    // setServings,
    // setDescription,
    // setIngredients,
    // setPreparation,
    // setTags,
  } = useContext(RecipeContext);

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

  function getStyles(tag, tagName, theme) {
    return {
      fontWeight: tagName.includes(tag)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
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

  return (
    <form onSubmit={handleSubmit}>
      <Stack id="create-recipe-container" spacing={2}>
        <TextField
          label="Name"
          type="text"
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
            type="number"
            value={duration}
            onChange={handleDurationChange}
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
            type="number"
            value={servings}
            onChange={handleServingsChange}
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
          onChange={handleDescriptionChange}
          error={!!errors.descriptionError}
          helperText={errors.descriptionError}
        />

        <div className="ingredients-container">
          <Stack id="ingredients-list-wrapper" direction="column" spacing={2}>
            <h4>Ingredient List</h4>
            {ingredients.map((oneItem, index) => {
              return (
                <>
                  <Stack
                    className="ingredients-list-input-row"
                    key={oneItem}
                    direction="row"
                    spacing={2}
                    sx={{
                      justifyContent: 'space-between',
                      alignContent: 'center',
                    }}
                  >
                    <TextField
                      className="ingredient-textfield"
                      label="Ingredient"
                      name="ingredient_name"
                      value={oneItem.ingredient_name}
                      onChange={(event) =>
                        handleIngredientFields(index, event, 'name')
                      }
                      sx={{ width: '50%' }}
                      error={!!errors.ingredientErrors[index]?.name}
                      helperText={errors.ingredientErrors[index]?.name}
                    />
                    <TextField
                      className="ingredient-textfield"
                      label="Amount"
                      name="ingredient_amount"
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
                      sx={{ width: '30%' }}
                      value={oneItem.ingredient_measuring}
                      name="ingredient_measuring"
                      onChange={(event) => handleChangeUnit(index, event)}
                      MenuProps={MenuProps}
                    >
                      {unitOptions.map((oneUnitOption) => (
                        <MenuItem
                          key={oneUnitOption}
                          value={oneUnitOption}
                          style={getStyles(oneUnitOption, oneUnitOption, theme)}
                        >
                          {oneUnitOption}
                        </MenuItem>
                      ))}
                    </Select>

                    <IconButton
                      style={
                        index < 1 ? { display: 'hidden' } : { display: 'block' }
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
              onClick={(e) => addFields()}
            >
              Add more
            </Button>
          </Stack>
        </div>

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
                style={getStyles(oneTagOption, tagOptions, theme)}
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
          onClick={handleSubmit}
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
    </form>
  );
}

export default RecipeForm;
