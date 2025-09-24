import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  requestRegisterOtp,
  verifyRegisterOtp,
  registerUser,
} from '../feature/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { HiUser, HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
import { CiLock } from 'react-icons/ci';
import { MdOutlinePassword } from 'react-icons/md';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage, registerStep, secret, registrationToken } =
    useAppSelector((state) => state.auth);

  // Common states
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 1: Request OTP
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(requestRegisterOtp({ email }));
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) return;
    dispatch(verifyRegisterOtp({ email, secret, otp }));
  };

  // Step 3: Register user
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert('Passwords do not match!');
    if (!registrationToken) return;
    dispatch(
      registerUser({ username, firstname, lastname, password, registrationToken })
    ).then((res: any) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/login');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary dark:text-blue-400">
          Create Account
        </h2>

        {error && <p className="mb-4 text-red-700 bg-red-100 p-2 rounded text-center">{error}</p>}
        {successMessage && (
          <p className="mb-4 text-green-700 bg-green-100 p-2 rounded text-center">{successMessage}</p>
        )}

        {/* STEP 1 → EMAIL */}
        {registerStep === 'email' && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="relative">
              <HiOutlineMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold"
            >
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </button>
          </form>
        )}

        {/* STEP 2 → OTP */}
        {registerStep === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="relative">
              <MdOutlinePassword className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* STEP 3 → DETAILS */}
        {registerStep === 'details' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <HiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="relative">
              <HiOutlineUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="relative">
              <HiOutlineUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="relative">
              <CiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="relative">
              <CiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Forgot your password?{' '}
            <Link
              to="/forgot-password"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset here
            </Link>
          </p>
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
