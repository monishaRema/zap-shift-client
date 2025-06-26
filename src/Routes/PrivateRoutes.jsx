import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();


  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (!user) {

    return <Navigate state={{from: location.pathname}} to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
