import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);
      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
    }
  };

  const inputClasses =
    "w-full border border-base rounded-lg px-3 py-2 focus:outline-none transition bg-base text-heading";

  return (
    <div className="min-h-screen bg-base px-4 flex items-center justify-center">
      <div className="w-full max-w-sm">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-2 text-primary">
          Welcome Back
        </h2>
        <p className="text-secondary mb-6">
          Login to your LifeNotes account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} noValidate>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-soft">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`${inputClasses} ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-soft">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`${inputClasses} ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold 
            transition transform hover:-translate-y-1 hover:scale-105 duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-soft mt-4">
          Don’t have an account?
          <Link to="/signup" className="text-primary font-semibold ml-1">
            Signup
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-border"></div>
          <span className="px-2 text-soft">OR</span>
          <div className="flex-grow h-px bg-border"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full border border-base bg-base text-heading
          rounded-lg py-2 flex items-center justify-center gap-2 
          hover:bg-card transition transform hover:-translate-y-1 hover:scale-105 duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="google"
          />
          Login with Google
        </button>

      </div>
    </div>
  );
};

export default Login;
