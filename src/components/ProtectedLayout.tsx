import React from 'react';
import { useAppSelector } from '../hooks';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout';  // Your existing Layout

const ProtectedLayout: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />  {/* Renders child routes (e.g., Dashboard) */}
    </Layout>
  );
};

export default ProtectedLayout;