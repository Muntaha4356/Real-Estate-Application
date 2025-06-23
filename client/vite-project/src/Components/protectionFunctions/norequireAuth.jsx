// RequireNoAuth.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireNoAuth = ({ isAuth }) => {
  if (isAuth === undefined) {
    return null;
  }
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireNoAuth;
