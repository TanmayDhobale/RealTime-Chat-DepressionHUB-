import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      setUser(response.data.user);
      // Navigate or perform additional actions as needed
    } catch (error) {
      console.error('Login failed:', error);
      // Handle errors (e.g., show error message)
    }
  };

  const signup = async (email, username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, username, password });
      console.log('Signup successful:', response.data);
      // Optionally log the user in directly or navigate to the login page
    } catch (error) {
      console.error('Signup error:', error);
      // Handle errors (e.g., show error message)
    }
  };

  const value = { user, login, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
