import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children, redirectTo }) => {
  const token = useSelector((state) => state.user.token);
  return token ? <Navigate to={redirectTo} /> : children;
};

export default PublicRoute;
