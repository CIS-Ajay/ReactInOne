import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { loginUser } from '../feature/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { HiUser } from 'react-icons/hi';
import { CiLock } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mx-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary dark:text-blue-400">
            Welcome Back
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
              {/* Username Input */}
          <div className="relative">
            <HiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <CiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Forgot your password?{' '}
            <Link to="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">
              Reset here
            </Link>
          </p>
          <p className="mt-2">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
