import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, redirectTo }) => {
    const token = useSelector((state) => state.user.token);
    console.log("redirectTo~~~~~~~~~~~~~~~~", redirectTo)
  return token ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
