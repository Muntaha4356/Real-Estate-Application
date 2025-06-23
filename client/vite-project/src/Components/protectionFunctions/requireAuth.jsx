// RequireAuth.jsx
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const RequireAuth = ({ isAuth }) => {
  const location = useLocation();

  if (isAuth === undefined) {
    return null; // or a spinner while loading auth state
  }

  return isAuth
    ? <Outlet /> // render nested protected routes
    : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default RequireAuth;
