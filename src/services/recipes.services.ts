import config from './axios-config';
import axiosInstance from './axios';
import type { RecipeRequest } from '../types/recipe.types';

export async function getAllRecipes() {
  try {
    const response = await axiosInstance.get(`${config.ApiUrl}/api/recipes`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createRecipe(recipeData: RecipeRequest) {
  try {
    const response = await axiosInstance.post(
      `${config.ApiUrl}/api/recipes`,
      recipeData,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function searchRecipeQuery(query: string) {
  try {
    const response = await axiosInstance.get(
      `${config.ApiUrl}/api/recipes/search/${query}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getRecipe(id: string) {
  try {
    const response = await axiosInstance.get(
      `${config.ApiUrl}/api/recipes/${id}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateRecipe(id: string, recipeData: RecipeRequest) {
  try {
    const response = await axiosInstance.patch(
      `${config.ApiUrl}/api/recipes/${id}`,
      recipeData,
    );
    return response.data;
  } catch (err) {
    console.log('An error occured when trying to update a recipe: ', err);
  }
}

export async function deleteRecipe(id: string) {
  try {
    const response = await axiosInstance.delete(
      `${config.ApiUrl}/api/recipes/${id}`,
    );
    return response.data;
  } catch (err) {
    console.log('An error occured when trying to delete a recipe: ', err);
  }
}

// class RecipesService {
//   constructor() {
//     this.api = axios.create({
//       baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005',
//     });

//     // Automatically set JWT token in the headers for every request
//     this.api.interceptors.request.use((config) => {
//       // Retrieve the JWT token from the local storage
//       const storedToken = localStorage.getItem('authToken');

//       if (storedToken) {
//         config.headers = { Authorization: `Bearer ${storedToken}` };
//       }

//       return config;
//     });
//   }

//   // POST /api/recipes
//   createRecipe = (requestBody) => {
//     return this.api.post('/api/recipes', requestBody);
//   };
//   // GET /api/recipes/query
//   getRecipeQuery = (query) => {
//     return this.api.get(`/api/recipes/search/${query}`);
//   };

//   // GET /api/recipes
//   getRecipe = (id) => {
//     return this.api.get(`/api/recipes/${id}`);
//   };

//   // GET /api/recipes
//   getAllRecipes = () => {
//     return this.api.get('/api/recipes');
//   };

//   // PUT /api/recipes/id
//   updateRecipe = (id, requestBody) => {
//     return this.api.patch(`/api/recipes/${id}`, requestBody);
//   };

//   // DELETE /api/recipes/id
//   deleteRecipe = (id) => {
//     return this.api.delete(`/api/recipes/${id}`);
//   };
// }
// const recipesService = new RecipesService();

// export default recipesService;
