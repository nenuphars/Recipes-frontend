import axios from "axios";

class UserService {
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

  // GET /api/users/:id
  getUser = (id) => {
    return this.api.get(`/api/users/${id}`);
  };

  // PUT /api/users
  updateUser = (id, requestBody) => {
    return this.api.patch(`/api/users/${id}`, requestBody);
  };

  // DELETE /api/user
  deleteUser = (id) => {
    return this.api.delete(`/api/users/${id}`);
  };
}
const recipesService = new UserService();

export default recipesService;
