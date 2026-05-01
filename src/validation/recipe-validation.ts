import z from 'zod';

const RecipeSchema = z.object({
  name: z
    .string()
    .min(3, 'Recipe name must be at least 3 characters long')
    .max(100, 'Please keep the title to less than 100 characters'),
  duration: z
    .number()
    .min(1, 'Please put in the duration of the recipe')
    .max(1440, 'Please put in a realistic duration less than 24 hours'),
  description: z
    .string()
    .min(20, 'Please make a description of at least 20 characters')
    .max(200, 'Please keep the description to a maximum of 200 characters'),
  preparation: z
    .string()
    .min(30, 'Please put in a preparation method of at least 30 characters')
    .max(
      3000,
      'Please try to keep the preparation method concise (3000 characters max.)',
    ),
  servings: z
    .number()
    .min(
      1,
      'Please tell us the number of servings, so we can calculate accordingly',
    )
    .max(20, 'Servings must be les than 20'),
  ingredientsList: z
    .array(
      z.object({
        ingredient_name: z
          .string()
          .min(2, 'Please put a valid ingredient name')
          .max(100),
        ingredient_amount: z.number(),
        ingredient_measuring: z.string(),
      }),
    )
    .min(1, 'Please add at least one ingredient')
    .max(60, 'Please keep ingredients to a maximum of 60'),
  tags: z
    .array(z.string())
    .min(1, 'Please choose at least one tag')
    .max(3, 'Please choose a maximum of 3 tags'),
  creator: z.object({
    _id: z.string(),
    user_name: z.string(),
  }),
});

export default RecipeSchema;
