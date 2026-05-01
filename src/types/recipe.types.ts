export type Comment = {
  author: string;
  content: string;
  datePublished: Date;
};

export type Creator = {
  _id: string;
  user_name: string;
  recipes?: Recipe[];
  favorites?: Recipe[];
};

export type RecipeRequestCreator = {
  _id: string;
  user_name: string;
};

const UNIT_OPTIONS = [
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
export type Unit = (typeof UNIT_OPTIONS)[number];

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

export type IngredientsListItem = {
  ingredientName: string;
  ingredientAmount: string;
  ingredientMeasuring: Unit;
};

export type IngredientFormValues = {
  ingredient_name: string;
  ingredient_amount: number;
  ingredient_measuring: Unit;
};

// Full type for requests and responses from API
export type Recipe = {
  _id: string;
  name: string;
  photoUrl?: string;
  duration: number;
  ingredientsList: IngredientFormValues[];
  preparation: string;
  description: string;
  servings: number;
  tags: Tag[];
  creator: Creator;
  comments?: Comment[];
};

export type RecipeRequest = {
  name: string;
  photoUrl?: string;
  duration: number;
  ingredientsList: IngredientFormValues[];
  preparation: string;
  description: string;
  servings: number;
  tags: Tag[];
  creator: RecipeRequestCreator;
  comments?: Comment[];
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
