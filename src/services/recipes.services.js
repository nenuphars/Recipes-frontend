import axios from 'axios';

class RecipesService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/recipes
  createRecipe = (requestBody) => {
    return this.api.post('/api/recipes', requestBody);
  };
  // GET all recipes /api/recipes/search/all
  getAllRecipes = () => {
    return this.api.get('api/recipes/all');
  };
  // GET one recipe /api/recipes/search/:id
  getRecipe = (id) => {
    return this.api.get(`/api/recipes/search-id/${id}`);
  };
  // GET recipe by search term /api/recipes/search/query
  getRecipeQuery = (query) => {
    return this.api.get(`/api/recipes/search/${query}`);
  };

  // PUT /api/recipes/id
  updateRecipe = (id, requestBody) => {
    return this.api.patch(`/api/recipes/${id}`, requestBody);
  };

  // DELETE /api/recipes/id
  deleteRecipe = (id) => {
    return this.api.delete(`/api/recipes/${id}`);
  };
}
const recipesService = new RecipesService();

export default recipesService;
