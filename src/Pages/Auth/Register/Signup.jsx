import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { saveOrUpdateUsers } from "../../../Hooks";

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

  axios.post(uploadURL, formData)
    .then(async (imgRes) => {
      const photoURL = imgRes.data.data.url;

      // 1️⃣ Firebase signup
      const result = await registerUser(data.email, data.password);

      // 2️⃣ Firebase profile update
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      const userData = {
        name: data.name,
        email: data.email,
        photoURL,
        role: "user",
        isPremium: false,
        createdAt: new Date(),
      };

      await saveOrUpdateUsers(userData);

      // 4️⃣ Redirect
      navigate(location?.state || "/");
    })
    .catch(console.error);
};


  const handleGoogle = () => {
  googleSignIn()
    .then(async (result) => {
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        isPremium: false,
        createdAt: new Date(),
      };

      await saveOrUpdateUsers(userData);

      navigate(location?.state || "/");
    })
    .catch(console.error);
};


  const inputClasses =
    "w-full border border-base rounded-lg px-3 py-2 focus:outline-none transition bg-base text-heading";

  return (
    <div className="min-h-screen bg-base px-4 flex items-center justify-center">
      <div className="w-full max-w-sm">

        <h2 className="text-4xl font-bold mb-2 text-primary">Create an Account</h2>
        <p className="text-secondary mb-6">Signup with LifeNotes</p>

        <form onSubmit={handleSubmit(handleRegistration)} noValidate>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-soft">Name</label>
            <input
              {...register("name", { required: true })}
              className={`${inputClasses} ${errors.name ? "border-red-500" : ""}`}
              placeholder="Your full name"
            />
          </div>

          {/* Photo */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-soft">Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input w-full border-base bg-base text-heading"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-soft">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`${inputClasses} ${errors.email ? "border-red-500" : ""}`}
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-soft">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className={`${inputClasses} ${errors.password ? "border-red-500" : ""}`}
              placeholder="Create a password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold 
            transition transform hover:-translate-y-1 hover:scale-105 duration-300">
            Signup
          </button>
        </form>

        <p className="text-center text-soft mt-4">
          Already have an account?
          <Link to="/login" className="text-primary font-semibold ml-1">Login</Link>
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
          hover:bg-card transition transform hover:-translate-y-1 hover:scale-105 duration-300">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Login with Google
        </button>

      </div>
    </div>
  );
};

export default Signup;