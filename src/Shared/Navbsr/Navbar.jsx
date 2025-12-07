import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user, logOut } = useAuth();
  const location = useLocation();

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

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

  const btnClasses =
    "transition ease-in-out delay-75 transform hover:-translate-y-1 hover:scale-105 duration-300 rounded-full px-5 py-2 font-semibold";

  return (
    <nav className="bg-base shadow-md w-full z-50 transition-all">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          LifeNotes
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-secondary">
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
              <Link
                to="/dashboard/pricing"
                className="hover:text-primary font-medium">
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
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card shadow-lg border border-base hover:scale-110 transition-all duration-300">
            {theme === "light" ? (
              <BsMoon className="text-secondary" size={20} />
            ) : (
              <BsSun className="text-primary" size={22} />
            )}
          </button>
          {!user ? (
            <>
              <Link
                to="/auth/login"
                className={`${btnClasses} text-white bg-primary hover:bg-primary/90`}>
                Login
              </Link>
              <Link
                to="/auth/signup"
                className={`${btnClasses} border-2 border-primary text-primary hover:bg-primary/10`}>
                SignUp
              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-card border border-base shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="px-4 py-2 text-secondary font-semibold">
                  {user.displayName}
                </p>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 hover:bg-primary/10 transition transform hover:-translate-y-1 hover:scale-105">
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-primary/10 transition transform hover:-translate-y-1 hover:scale-105">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100/20 transition transform hover:-translate-y-1 hover:scale-105">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-base">
            {theme === "light" ? (
              <BsMoon className="text-secondary" size={20} />
            ) : (
              <BsSun className="text-primary" size={22} />
            )}
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="text-secondary">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base shadow-md border-t border-base">
          <Link to="/" className="block px-6 py-3 hover:bg-primary/10">
            Home
          </Link>
          <Link
            to="/public-lessons"
            className="block px-6 py-3 hover:bg-primary/10">
            Public Lessons
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard/add-lesson"
                className="block px-6 py-3 hover:bg-primary/10">
                Add Lesson
              </Link>
              <Link
                to="/dashboard/my-lessons"
                className="block px-6 py-3 hover:bg-primary/10">
                My Lessons
              </Link>
              <Link
                to="/pricing"
                className="block px-6 py-3 hover:bg-primary/10">
                Pricing/Upgrade
              </Link>
            </>
          )}
          {!user ? (
            <>
              <Link
                to="/auth/login"
                className="block px-6 py-3 hover:bg-primary/10">
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="block px-6 py-3 hover:bg-primary/10">
                SignUp
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard/profile"
                className="block px-6 py-3 hover:bg-primary/10">
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="block px-6 py-3 hover:bg-primary/10">
                Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-100/20">
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
