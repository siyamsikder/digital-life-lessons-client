import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const AddLesson = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // Example for image file:
    if (data.image && data.image.length > 0) {
      console.log("Selected Image:", data.image[0]);
    }

    // TODO: Send data to backend / Firebase
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#0D0D0D] min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Add New Life Lesson
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Logged in as:{" "}
          <span className="font-semibold">{user?.displayName}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Lesson Title
            </label>
            <input
              type="text"
              placeholder="Enter lesson title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && (
              <p className="text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Full Description / Insight
            </label>
            <textarea
              placeholder="Write your lesson here..."
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              rows={6}
            />
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Category</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
            {errors.category && (
              <p className="text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Emotional Tone */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Emotional Tone
            </label>
            <select
              {...register("tone", { required: "Emotional Tone is required" })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Emotional Tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
            {errors.tone && (
              <p className="text-red-500 mt-1">{errors.tone.message}</p>
            )}
          </div>

          {/* Visibility & Access Level */}
          <div className="">
            <div className="">
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Visibility
              </label>
              <select
                {...register("visibility")}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            {/* <div className="flex-1">
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Access Level
              </label>
              <select
                {...register("accessLevel")}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div> */}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input file-input-ghost w-full text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition">
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
