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
    <div className="drawer lg:drawer-open bg-base text-text">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">

        {/* Top Navbar */}
        <div className="navbar px-4 flex justify-between bg-base border-b border-base">
          <div className="flex items-center gap-3">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-primary">
              LifeNotes
            </Link>
          </div>

          <div className="flex items-center gap-5">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-base shadow">
              {theme === "light" ? (
                <BsMoon className="text-heading" size={20} />
              ) : (
                <BsSun className="text-primary" size={22} />
              )}
            </button>

            {/* User Avatar */}
            {user && (
              <div className="avatar cursor-pointer">
                <div className="w-10 rounded-full border border-base">
                  <img src={user?.photoURL} alt="user" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 bg-base text-heading">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-card text-heading border-r border-base shadow min-h-full flex flex-col">

          {/* Sidebar Header */}
          <div className="p-5 border-b border-base">
            <h2 className="text-xl font-bold text-heading">Dashboard</h2>
            <p className="text-sm text-soft">{user?.displayName}</p>
          </div>

          {/* Menu */}
          <ul className="menu p-4 gap-1">
            <li><Link className="text-heading" to="/dashboard">Overview</Link></li>
            <li><Link className="text-heading" to="/">Home</Link></li>

            <p className="mt-4 mb-1 text-xs text-soft uppercase">Lessons</p>
            <li><Link className="text-heading" to="/dashboard/add-lesson">Add Lesson</Link></li>
            <li><Link className="text-heading" to="/dashboard/my-lessons">My Lessons</Link></li>
            {/* <li><Link className="text-heading" to="/dashboard/update-lesson">Update Lesson</Link></li> */}
            <li><Link className="text-heading" to="/public-lessons">Public Lessons</Link></li>

            <p className="mt-4 mb-1 text-xs text-soft uppercase">Favorites</p>
            <li><Link className="text-heading" to="/dashboard/favorites">Favorites</Link></li>

            <p className="mt-4 mb-1 text-xs text-soft uppercase">Payment</p>
            <li><Link className="text-heading" to="/dashboard/payment">Pricing / Upgrade</Link></li>
            <li><Link className="text-heading" to="/dashboard/payment-success">Payment Success</Link></li>
            <li><Link className="text-heading" to="/dashboard/payment-cancel">Payment Cancel</Link></li>

            <p className="mt-4 mb-1 text-xs text-soft uppercase">Profile</p>
            <li><Link className="text-heading" to="/dashboard/profile">Profile Settings</Link></li>
          </ul>

          {/* Logout Button */}
          <div className="p-4 mt-auto">
            <button
              onClick={logOut}
              className="btn w-full bg-red-500 hover:bg-red-600 text-white btn-sm">
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
