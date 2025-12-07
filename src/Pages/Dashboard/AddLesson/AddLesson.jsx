import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddLesson = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST
    }`;
    const res = await axios.post(imgUrl, formData);
    return res.data.data.url;
  };

  //  Send data API 
  const mutation = useMutation({
    mutationFn: async (newLesson) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/addLesson`,
        newLesson
      );
      return res.data;
    },
    onSuccess: () => {
      alert("Lesson Added Successfully!");
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = "";

    // check if image uploaded
    if (data.image && data.image[0]) {
      imageUrl = await uploadImage(data.image[0]);
    }

    const lessonInfo = {
      title: data.title,
      description: data.description,
      category: data.category,
      tone: data.tone,
      visibility: data.visibility,
      image: imageUrl,
      author: user?.displayName,
      email: user?.email,
      createdAt: new Date(),
    };

    mutation.mutate(lessonInfo);
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
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Full Description / Insight
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={6}
              placeholder="Write your lesson here..."
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary">
              <option value="">Select Category</option>
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Relationships</option>
              <option>Mindset</option>
              <option>Mistakes Learned</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Emotional Tone</label>
            <select
              {...register("tone", { required: "Tone is required" })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary">
              <option value="">Select Emotional Tone</option>
              <option>Motivational</option>
              <option>Sad</option>
              <option>Realization</option>
              <option>Gratitude</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Visibility</label>
            <select
              {...register("visibility")}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90">
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
