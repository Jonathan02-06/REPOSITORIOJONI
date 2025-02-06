// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Si el usuario no está autenticado, se redirige a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
