import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import { BsMoon, BsSun } from "react-icons/bs";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const [theme, setTheme] = useState("light");
  const { user, logOut } = useAuth();

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">

        {/* Top Navbar */}
        <div className="navbar px-4 flex justify-between">
          <div className="flex items-center gap-3">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            
            {/* Website Logo */}
            <Link to="/" className="text-2xl font-bold text-primary">
              LifeNotes
            </Link>
          </div>

          <div className="flex items-center gap-5">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-base-300 dark:bg-gray-800 shadow border">
              {theme === "light" ? (
                <BsMoon className="text-black" size={20} />
              ) : (
                <BsSun className="text-yellow-400" size={22} />
              )}
            </button>

            {/* User Avatar */}
            {user && (
              <div className="avatar cursor-pointer">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="user" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-100 dark:bg-[#0D0D0D] border-r shadow min-h-full flex flex-col">

          {/* Sidebar Header */}
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className="text-sm opacity-60">{user?.displayName}</p>
          </div>

          {/* Menu */}
          <ul className="menu p-4 gap-1">


            <li><Link to="/dashboard">Overview</Link></li>
            <li>
                <Link to="/">Home</Link>
            </li>
            <p className="mt-4 mb-1 text-xs opacity-40 uppercase">Lessons</p>
            <li><Link to="/dashboard/add-lesson">Add Lesson</Link></li>
            <li><Link to="/dashboard/my-lessons">My Lessons</Link></li>
            <li><Link to="/dashboard/update-lesson">Update Lesson</Link></li>
            <li><Link to="/public-lessons">Public Lessons</Link></li>

            <p className="mt-4 mb-1 text-xs opacity-40 uppercase">Favorites</p>
            <li><Link to="/dashboard/favorites">Favorites</Link></li>

            <p className="mt-4 mb-1 text-xs opacity-40 uppercase">Payment</p>
            <li><Link to="/pricing">Pricing / Upgrade</Link></li>
            <li><Link to="/payment/success">Payment Success</Link></li>
            <li><Link to="/payment/cancel">Payment Cancel</Link></li>

            <p className="mt-4 mb-1 text-xs opacity-40 uppercase">Profile</p>
            <li><Link to="/dashboard/profile">Profile Settings</Link></li>

          </ul>

          {/* Logout Button */}
          <div className="p-4 mt-auto">
            <button
              onClick={logOut}
              className="btn btn-error btn-sm w-full">
              Logout
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
