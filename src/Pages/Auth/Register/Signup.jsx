import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { registerUser, googleSignIn, updateUserProfile } = useAuth();
  const imgbbAPIKey = import.meta.env.VITE_IMAGE_HOST;

  const handleRegistration = (data) => {
    const photoFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", photoFile);
    const uploadURL = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;

    axios
      .post(uploadURL, formData)
      .then((imgbbRes) => {
        const photoURL = imgbbRes.data.data.url;
        return registerUser(data.email, data.password).then((result) => {
          return updateUserProfile({ displayName: data.name, photoURL }).then(
            () => {
              navigate(location?.state || "/");
            }
          );
        });
      })
      .catch(console.error);
  };

  const handleGoogle = () => {
    googleSignIn()
      .then((res) => navigate(location?.state || "/"))
      .catch((err) => console.error(err));
  };

  const inputClasses =
    "w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary transition";

  return (
    <div className="min-h-screen bg-base-100 dark:bg-[#0D0D0D] px-4 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h2 className="text-4xl font-bold mb-2 text-primary">
          Create an Account
        </h2>
        <p className="text-gray-500 mb-6">Signup with LifeNotes</p>

        <form onSubmit={handleSubmit(handleRegistration)} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register("name", { required: true, minLength: 2 })}
              className={`${inputClasses} ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input w-full border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`${inputClasses} ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className={`${inputClasses} ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold transition transform hover:-translate-y-1 hover:scale-105 duration-300">
            Signup
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold ml-1">
            Login
          </Link>
        </p>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition transform hover:-translate-y-1 hover:scale-105 duration-300">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />{" "}
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
