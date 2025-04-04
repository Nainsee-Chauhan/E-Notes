import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/Auth'; // Make sure you have this method to check for token

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
