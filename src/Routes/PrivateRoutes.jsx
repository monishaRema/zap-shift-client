import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (!user) {

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
