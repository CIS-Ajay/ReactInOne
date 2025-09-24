import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { requestForgotOtp, verifyForgotOtp, resetPassword, clearMessages, logout } from '../feature/auth/authSlice';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlinePassword } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage, secret, resetToken } = useAppSelector((state) => state.auth);

  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    return () => dispatch(clearMessages());
  }, [dispatch]);
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(requestForgotOtp({ email })).then((res: any) => {
      if (res.meta.requestStatus === 'fulfilled') {
      setStep('otp')
      }
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) return;
    dispatch(verifyForgotOtp({ email, otp, secret })).then(() => setStep('reset'));
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return alert('Passwords do not match');
    if (!resetToken) return;
    dispatch(resetPassword({ newPassword, confirmPassword, resetToken })).then((res: any) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(logout());
        navigate('/login');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-blue-400">
          Forgot Password
        </h2>

        {error && <div className="mb-4 text-red-700 bg-red-100 p-2 rounded text-center">{error}</div>}
        {successMessage && <div className="mb-4 text-green-700 bg-green-100 p-2 rounded text-center">{successMessage}</div>}

        {/* STEP 1 → Email */}
        {step === 'email' && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="relative">
              <HiOutlineMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-blue-600 text-white">
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* STEP 2 → OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="relative">
              <MdOutlinePassword className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-green-600 text-white">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* STEP 3 → Reset Password */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <MdOutlinePassword className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="relative">
              <MdOutlinePassword className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-blue-600 text-white">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
