import axiosInstance from './axios';
import config from './axios-config';
import type { LoginPayload, LoginResponse } from '../types/auth.types';

export const signup = (user_name: string, password: string) => {
  return axiosInstance.post(`${config.ApiUrl}/api/auth/signup`, {
    user_name,
    password,
  });
};

export const login = async (
  payload: LoginPayload,
): Promise<LoginResponse | any> => {
  try {
    const response = await axiosInstance.post(
      `${config.ApiUrl}/api/auth/login`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.log('An error occured during login: ', err);
    return err;
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export async function verify() {
  try {
    const response = await axiosInstance.get(
      `${config.ApiUrl}/api/auth/verify`,
    );
    return response.data;
  } catch (err) {
    console.log('An error occured during user verification: ', err);
    return err;
  }
}

// class AuthService {
//   constructor() {
//     // Create a new instance of axios with a custom configuration
//     this.api = axios.create({
//       baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005',
//       // We set our API's base URL so that all requests use the same base URL
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

//   login = (requestBody) => {
//     return this.api.post('/api/auth/login', requestBody);
//   };

//   signup = (requestBody) => {
//     return this.api.post('/api/auth/signup', requestBody);
//   };

//   verify = () => {
//     return this.api.get('/api/auth/verify');
//   };
// }

// const authService = new AuthService();

// export default authService;
