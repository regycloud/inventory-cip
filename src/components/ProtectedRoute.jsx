// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  // Jika tidak ada pengguna yang login, arahkan ke halaman login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Jika ada pengguna yang login, render komponen anak
  return <Outlet />;
};

export default ProtectedRoute;
