export type IngredientsListItem = {
  ingredientName: string;
  ingredientAmount: number;
  ingredientMeasuring: string;
};

export type Comment = {
  author: string;
  content: string;
  datePublished: Date;
};
export const tags = [
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
