// src/components/Navbar.tsx
import React from 'react';
import ThemeToggle from './UI/ThemeToggle';
import { logout } from '../feature/auth/authSlice';
import { useAppDispatch } from '../hooks';

const Navbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const dispatch = useAppDispatch();
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-4 py-2">
      {/* Brand */}
      <a href="/" className="flex items-center">
        <img
          src="https://www.reshot.com/preview-assets/icons/TGWNJPK4VX/beer-TGWNJPK4VX.svg"
          alt="Logo"
          className="mr-2 h-8"
        />
        <span className="text-xl font-semibold">Styled</span>
      </a>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* User Avatar (with dropdown) */}
        <div className="relative">
          <img
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="User"
            className="h-9 w-9 rounded-full border cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="px-4 py-2 border-b dark:border-gray-600">
                <p className="text-sm font-medium">Neil Sims</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  neil.sims@emample.com
                </p>
              </div>
              <a
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Dashboard
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Settings
              </a>
              <a
                href="/earnings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Earnings
              </a>
              <hr className="dark:border-gray-600" />
              <a
                href="/#"
                onClick={() => dispatch(logout())}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Sign out
              </a>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;