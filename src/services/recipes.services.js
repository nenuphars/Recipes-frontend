import axios from "axios";

class RecipesService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/recipes
  createRecipe = (requestBody) => {
    return this.api.post("/api/recipes", requestBody);
  }
  // GET /api/recipes/query
  getRecipeQuery = (queryString) => {
    return this.api.get(`/api/recipes/search`, queryString)
  }

  // GET /api/recipes
  getRecipe = (id) => {
    return this.api.get(`/api/recipes/${id}`)
  }

  // GET /api/recipes
  getAllRecipes = () => {
    return this.api.get("api/recipes")
  }

  
  // PUT /api/recipes/id
  updateRecipe = (id, requestBody) => {
    return this.api.patch(`/api/recipes/${id}`, requestBody)
  }

  // DELETE /api/recipes/id
  deleteRecipe = (id) => {
    return this.api.delete(`/api/recipes/${id}`)
  }
  
}
const recipesService = new RecipesService()

export default recipesService