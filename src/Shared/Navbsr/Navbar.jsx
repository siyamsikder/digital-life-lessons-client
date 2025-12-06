import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="bg-base-100 dark:bg-[#0D0D0D] shadow-md fixed w-full z-50 transition-all">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          LifeNotes
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-secondary dark:text-secondary">
          <Link to="/" className="hover:text-primary font-medium">
            Home
          </Link>
          <Link to="/public-lessons" className="hover:text-primary font-medium">
            Public Lessons
          </Link>

          {user && (
            <>
              <Link
                to="/dashboard/add-lesson"
                className="hover:text-primary font-medium">
                Add Lesson
              </Link>
              <Link
                to="/dashboard/my-lessons"
                className="hover:text-primary font-medium">
                My Lessons
              </Link>
              <Link to="/pricing" className="hover:text-primary font-medium">
                Pricing/Upgrade
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg border hover:scale-110 transition-all duration-300">
            {theme === "light" ? (
              <BsMoon className="text-gray-800" size={20} />
            ) : (
              <BsSun className="text-yellow-400" size={22} />
            )}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="
    px-5 py-2 rounded-full font-semibold text-black bg-primary
    dark:text-black
    hover:bg-primary/90
    transition ease-in-out delay-75
    transform hover:-translate-y-1 hover:scale-105 duration-300
  ">
                Login
              </Link>

              <Link
                to="/register"
                className="
    px-5 py-2 rounded-full font-semibold border-2 border-primary text-primary
    hover:bg-primary/10 dark:hover:bg-primary/20
    transition ease-in-out delay-75
    transform hover:-translate-y-1 hover:scale-105 duration-300
  ">
                Signup
              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-base-100 dark:bg-[#1a1a1a] shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="px-4 py-2 text-secondary dark:text-secondary font-semibold">
                  {user.displayName}
                </p>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20">
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20">
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            {theme === "light" ? (
              <BsMoon className="text-black" size={20} />
            ) : (
              <BsSun className="text-yellow-400" size={22} />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-secondary dark:text-secondary">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100 dark:bg-[#0D0D0D] shadow-md">
          <Link
            to="/"
            className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primary/20">
            Home
          </Link>
          <Link
            to="/public-lessons"
            className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primary/20">
            Public Lessons
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard/add-lesson"
                className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primary/20">
                Add Lesson
              </Link>
              <Link
                to="/dashboard/my-lessons"
                className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primary/20">
                My Lessons
              </Link>
              <Link
                to="/pricing"
                className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primary/20">
                Pricing/Upgrade
              </Link>
            </>
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primary/20">
                Login
              </Link>
              <Link
                to="/register"
                className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primary/20">
                Signup
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
