// src/components/Sidebar.tsx
import React from 'react';
import { HiChartPie, HiViewBoards, HiInbox, HiUserCircle, HiShoppingBag, HiArrowSmRight, HiTable } from "react-icons/hi";

// Define menu items dynamically (exported for reusability)
export const menuItems = [
  { label: "Dashboard", href: "/", icon: <HiChartPie /> },
  { label: "Kanban", href: "/kanban", icon: <HiViewBoards />, badge: "Pro" },
  { label: "Inbox", href: "/inbox", icon: <HiInbox />, badge: "3" },
  { label: "Users", href: "/users", icon: <HiUserCircle /> },
  { label: "Products", href: "/products", icon: <HiShoppingBag /> },
  { label: "Sign In", href: "/signin", icon: <HiArrowSmRight /> },
  { label: "Sign Up", href: "/signup", icon: <HiTable /> },
  {
    label: "Settings",
    icon: <HiChartPie />,
    children: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Preferences", href: "/settings/preferences" },
    ],
  },
];

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white dark:bg-gray-800 border-r dark:border-gray-700 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <ul className="space-y-2 px-3">
        {menuItems.map((item, idx) =>
          item.children ? (
            <li key={idx}>
              <details className="group">
                <summary className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  {item.icon}
                  <span>{item.label}</span>
                </summary>
                <ul className="pl-6 mt-1 space-y-1">
                  {item.children.map((child, cidx) => (
                    <li key={cidx}>
                      <a
                        href={child.href}
                        className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ) : (
            <li key={idx}>
              <a
                href={item.href}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="ml-3 px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          )
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;