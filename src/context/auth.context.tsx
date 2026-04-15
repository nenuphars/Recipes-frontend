// import React from "react";
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import type { User } from '../types/user.types';

// create the context
const AuthContext = createContext(null);

// everything wrapped has access to context
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // function for checking token in storage: is logged in?
  function authenticateUser() {
    // 1) get token from storage
    const storedToken = localStorage.getItem('authToken');
    // A 2) send token to verify route for verification check
    if (storedToken) {
      axios
        .get(`${process.env.VITE_API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // A 3) save sent user data
          const user = response.data;
          // A 4) update the context states
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          console.log('user logged in.');
        })
        .catch((err) => {
          // setIsLoggedIn(false);
          // setIsLoading(false);
          // setUser(null);
          console.log(err.response.data.message);
          // if tokens dont match, logout user
          logOutUser();
        });
      // B 2) no token available: user not logged in
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      console.log('user not logged in.');
    }
  }

  // function for logging out
  function logOutUser() {
    // 1) remove token from storage
    localStorage.removeItem('authToken');
    // 2) call authenticate to set logged in as false
    authenticateUser();
  }

  // whenever this context is rendered
  useEffect(() => {
    // 1) check if user still logged in
    authenticateUser();
  }, []);

  const value = { isLoggedIn, isLoading, user, authenticateUser, logOutUser };
  // make states and functions available with context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// export function and context
export const useAuth = () => useContext(AuthContext);
