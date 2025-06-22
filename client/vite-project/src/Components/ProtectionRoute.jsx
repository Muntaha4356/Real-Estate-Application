// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/is-logged-in', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        setIsAuth(result.success); // or check token/response shape
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
