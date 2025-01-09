import { useState, createContext } from 'react';

// create the context
const RecipeContext = createContext({
  validateName: () => {},
  validateDuration: () => {},
  validateServings: () => {},
  validateDescription: () => {},
  validateIngredient: () => {},
  validateIngredientsList: () => {},
  validatePreparation: () => {},
  // Handle change functions
  handleNameChange: () => {},
  handleDurationChange: () => {},
  handleServingsChange: () => {},
  handleDescriptionChange: () => {},
  handleIngredientFields: () => {},
  handlePreparationChange: () => {},
  handleChangeUnit: () => {},
  handleChangeTag: () => {},
  // Add or delete Fields
  deleteIngredientFields: () => {},
  addFields: () => {},
  // Additional validation
  isIngredientEmpty: () => {},
  isIngredientComplete: () => {},
  // States
  errors: {
    name: '',
    duration: '',
    description: '',
    servings: '',
    preparation: '',
    ingredients: [],
    generalIngredient: '',
  },
  recipe: undefined,
  name: '',
  duration: 0,
  servings: '',
  description: '',
  ingredients: [],
  preparation: '',
  tags: [],
  // State setters
  setErrors: () => {},
  setRecipe: () => {},
  setName: () => {},
  setDuration: () => {},
  setServings: () => {},
  setDescription: () => {},
  setIngredients: () => {},
  setPreparation: () => {},
  setTags: () => {},
});

function RecipeProviderWrapper(props) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [preparation, setPreparation] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState('');
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([
    { ingredient_name: '', ingredient_amount: '', ingredient_measuring: '' },
  ]);
  const [recipe, setRecipe] = useState(undefined);

  const [errors, setErrors] = useState({
    name: '',
    duration: '',
    description: '',
    servings: '',
    preparation: '',
    ingredients: [],
    generalIngredient: '',
  });

  // Validation functions

  const validateName = (value) => {
    if (!value.trim()) {
      return 'Please give your recipe a name';
    }
    if (value.length < 3) {
      return 'The recipe title must be at least 3 characters';
    }
    if (value.length > 100) {
      return 'Please keep the title short (less than 100 characters)';
    }
    return '';
  };

  const validateDuration = (value) => {
    if (!value) return 'Please tell us how long this dish takes to cook';
    if (value < 1) return 'Cooking takes time, put in a value above 0';
    if (value > 1440)
      return 'No cooking marathon required, recipes should take less than 24 hours';
    return '';
  };

  const validateDescription = (value) => {
    if (!value) return 'Please write a short description of the dish';
    if (value.length < 30) return 'Please put in at least 30 characters';
    if (value.length > 200)
      return 'Keep it short, your description should be less thant 200 characters';
    return '';
  };

  const validatePreparation = (value) => {
    if (!value)
      return 'Please describe the preparation method in chronological order';
    if (value.length < 30) return 'Please put in at least 30 characters';
    if (value.length > 3000)
      return 'Try to make your preparation method more concise, please (less than 3000 characters)';
    return '';
  };

  const validateServings = (value) => {
    if (!value) return 'Please tell us for how many servings this recipe is';
    if (value < 1) return 'Servings must be at least 1';
    if (value > 100) return 'Servings must be less than 100';
    return '';
  };

  const isIngredientComplete = (ingredient) => {
    return (
      ingredient.ingredient_name.trim() !== '' &&
      ingredient.ingredient_amount !== '' &&
      ingredient.ingredient_measuring !== ''
    );
  };

  // Helper function to check if an ingredient is completely empty
  const isIngredientEmpty = (ingredient) => {
    return (
      ingredient.ingredient_name.trim() === '' &&
      ingredient.ingredient_amount === '' &&
      ingredient.ingredient_measuring === ''
    );
  };

  // Validate ingredients list as a whole
  const validateIngredientsList = (ingredientsList) => {
    // Filter out completely empty ingredients
    const nonEmptyIngredients = ingredientsList.filter(
      (ing) => !isIngredientEmpty(ing)
    );

    // Check if we have at least one complete ingredient
    const hasOneCompleteIngredient = nonEmptyIngredients.some((ing) =>
      isIngredientComplete(ing)
    );

    // Check for partially filled ingredients
    const hasPartialIngredients = nonEmptyIngredients.some(
      (ing) => !isIngredientComplete(ing)
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

  const validateIngredient = (ingredient, index) => {
    const newErrors = [...errors.ingredients];
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

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({
      ...prev,
      name: validateName(value),
    }));
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);
    setErrors((prev) => ({
      ...prev,
      duration: validateDuration(value),
    }));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setErrors((prev) => ({
      ...prev,
      description: validateDescription(value),
    }));
  };

  const handlePreparationChange = (e) => {
    const value = e.target.value;
    setPreparation(value);
    setErrors((prev) => ({
      ...prev,
      preparation: validatePreparation(value),
    }));
  };
  const handleServingsChange = (e) => {
    const value = e.target.value;
    setServings(value);
    setErrors((prev) => ({
      ...prev,
      servings: validateServings(value),
    }));
  };

  const handleIngredientFields = (index, event, type) => {
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

  const addFields = () => {
    let newField = {
      ingredient_name: '',
      ingredient_amount: '',
      ingredient_measuring: '',
    };
    setIngredients([...ingredients, newField]);
  };

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
