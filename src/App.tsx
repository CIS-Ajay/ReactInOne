import { useEffect } from 'react';
import { useAppSelector } from './hooks/index';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedLayout from './components/ProtectedLayout';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

function App() {
  const theme = useAppSelector((state) => state.theme.mode);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    // Apply theme class to html root
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected routes wrapped in ProtectedLayout */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add other protected routes here, e.g.: */}
              {/* <Route path="/kanban" element={<KanbanPage />} /> */}
              {/* Default redirect for / to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
            {/* Catch-all: Redirect to login or home */}
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />        
        </Routes>
    </Router>  
  );
}

export default App;