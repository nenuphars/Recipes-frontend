import React, { useState, createContext } from 'react';
import { type Recipe } from '../types/recipe.types';
import type { SelectChangeEvent } from '@mui/material';

type IngredientFormValues = {
  ingredient_name: string;
  ingredient_amount: string;
  ingredient_measuring: string;
};

type IngredientErrors = {
  name: string;
  amount: string;
  measuring: string;
};
type FormErrors = {
  nameError: string;
  durationError: string;
  descriptionError: string;
  servingsError: string;
  preparationError: string;
  ingredientErrors: IngredientErrors[];
  generalIngredientError: string;
};

// create the context
const RecipeContext = createContext({
  validateName: (name: string) => {},
  validateDuration: (duration: number) => {},
  validateServings: (servings: number) => {},
  validateDescription: (description: string) => {},
  validateIngredient: (ingredient: IngredientFormValues, index: number) => {},
  validateIngredientsList: (ingredientsList: IngredientFormValues[]) => {},
  validatePreparation: (preparation: string) => {},
  // Handle change functions
  handleNameChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {},
  handleDurationChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {},
  handleServingsChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleIngredientFields: (
    index: number,
    ingredients: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'name' | 'amount',
  ) => {},
  handlePreparationChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleChangeUnit: (index: number, e: SelectChangeEvent<any>) => {},
  handleChangeTag: (e: SelectChangeEvent<any>) => {},
  // Add or delete Fields
  deleteIngredientFields: (index: number) => {},
  addFields: () => {},
  // Additional validation
  isIngredientEmpty: (ingredient: IngredientFormValues) => {},
  isIngredientComplete: (ingredient: IngredientFormValues) => {},
  // States
  errors: {
    nameError: '',
    durationError: '',
    descriptionError: '',
    servingsError: '',
    preparationError: '',
    ingredientErrors: [{ name: '', amount: '', measuring: '' }],
    generalIngredientError: '',
  },
  recipe: null,
  name: '',
  duration: 0,
  servings: 0,
  description: '',
  ingredients: [],
  preparation: '',
  tags: [],
  // State setters
  setErrors: (errors: FormErrors) => {},
  setRecipe: (recipe: Recipe) => {},
  setName: (name: string) => {},
  setDuration: (duration: number) => {},
  setServings: (servings: number) => {},
  setDescription: (description: string) => {},
  setIngredients: (ingredients: IngredientFormValues[]) => {},
  setPreparation: (preparation: string) => {},
  setTags: (tags: string[]) => {},
});

type RecipeProps = {
  name?: string;
  duration?: number;
  preparation?: string;
  description?: string;
  servings?: number;
  tags?: string[];
  ingredients?: IngredientFormValues[];
  children: any;
};

function RecipeProviderWrapper(props: RecipeProps) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);
  const [preparation, setPreparation] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState(0);
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState<IngredientFormValues[]>([
    {
      ingredient_name: '',
      ingredient_amount: '',
      ingredient_measuring: '',
    },
  ]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [errors, setErrors] = useState<FormErrors>({
    nameError: '',
    durationError: '',
    descriptionError: '',
    servingsError: '',
    preparationError: '',
    ingredientErrors: [{ name: '', amount: '', measuring: '' }],
    generalIngredientError: '',
  });

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

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDuration(value);
    setErrors((prev) => ({
      ...prev,
      duration: validateDuration(value),
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    let data = [...ingredients];

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

  const handleChangeUnit = (index: number, event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    let data = [...ingredients];
    data[index].ingredient_measuring = value;
    // console.log('changed data', data);
    setIngredients(data);
  };

  const handleChangeTag = (e: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    // only execute when there are less than three tags selected
    // or when the selected value is already in the array i.e. it's being removed
    if (tags.length < 3 || tags.includes(e.target)) {
      setTags(typeof value === 'string' ? value.split(',') : value);
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

  return (
    <RecipeContext.Provider
      value={{
        // Validation functions for the form
        validateName,
        validateDuration,
        validateServings,
        validateDescription,
        validateIngredient,
        validateIngredientsList,
        validatePreparation,
        // Handle change in inputs
        handleNameChange,
        handleDurationChange,
        handleServingsChange,
        handleDescriptionChange,
        handleIngredientFields,
        handlePreparationChange,
        handleChangeUnit,
        handleChangeTag,
        // Add or delete Fields
        deleteIngredientFields,
        addFields,
        // Additional validation for ingredients
        isIngredientEmpty,
        isIngredientComplete,
        // STATES
        errors,
        recipe,
        name,
        duration,
        servings,
        description,
        ingredients,
        preparation,
        tags,
        setErrors,
        setRecipe,
        setName,
        setDuration,
        setServings,
        setDescription,
        setIngredients,
        setPreparation,
        setTags,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProviderWrapper };
