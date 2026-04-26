export type IngredientsListItem = {
  ingredientName: string;
  ingredientAmount: string;
  ingredientMeasuring: string;
};

export type Comment = {
  author: string;
  content: string;
  datePublished: Date;
};
const TAG_OPTIONS = [
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
] as const;

export type Tag = (typeof TAG_OPTIONS)[number];

export type Recipe = {
  name: string;
  photoUrl?: string;
  duration: number;
  ingredientsList: IngredientsListItem[];
  preparation: string;
  description: string;
  servings: number;
  tags?: string[];
  creator?: string;
  comments?: Comment[];
};

export type IngredientFormValues = {
  ingredient_name: string;
  ingredient_amount: string;
  ingredient_measuring: string;
};

export type IngredientErrors = {
  name: string;
  amount: string;
  measuring: string;
};
export type RecipeFormErrors = {
  nameError: string;
  durationError: string;
  descriptionError: string;
  servingsError: string;
  preparationError: string;
  ingredientErrors: IngredientErrors[];
  generalIngredientError: string;
};
