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
    reset,
    formState: { errors },
  } = useForm();

  // Upload image in imgBB
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;
    const res = await axios.post(imgUrl, formData);
    return res.data.data.url;
  };

  // Send data to API
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
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = "";

    if (data.image && data.image[0]) {
      imageUrl = await uploadImage(data.image[0]);
    }

    const lessonInfo = {
      title: data.title,
      description: data.description,
      category: data.category,
      tone: data.tone,
      visibility: data.visibility,
      accessLevel: data.accessLevel || "free",
      image: imageUrl,
      author: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      likes: [],
      favorites: [],
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mutation.mutate(lessonInfo);
  };

  return (
    <div className="p-6 bg-base min-h-screen">
      <div className="max-w-4xl mx-auto bg-card border border-base shadow-md rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-2 text-heading">
          Add New Life Lesson
        </h1>
        <p className="mb-6 text-soft">
          Logged in as <span className="font-semibold text-heading">{user?.displayName}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1 text-soft">Lesson Title</label>
            <input
              type="text"
              placeholder="Enter lesson title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-soft">Full Description / Insight</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={6}
              placeholder="Write your lesson here..."
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-soft">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Category</option>
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Relationships</option>
              <option>Mindset</option>
              <option>Mistakes Learned</option>
            </select>
          </div>

          {/* Emotional Tone */}
          <div>
            <label className="block mb-1 text-soft">Emotional Tone</label>
            <select
              {...register("tone", { required: "Tone is required" })}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Emotional Tone</option>
              <option>Motivational</option>
              <option>Sad</option>
              <option>Realization</option>
              <option>Gratitude</option>
            </select>
          </div>

          {/* Visibility */}
          <div>
            <label className="block mb-1 text-soft">Visibility</label>
            <select
              {...register("visibility")}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Access Level */}
          <div>
            <label className="block mb-1 text-soft">Access Level</label>
            <select
              {...register("accessLevel")}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading"
            >
              <option value="free">Free</option>
              {user?.isPremium && <option value="premium">Premium</option>}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-soft">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input w-full bg-base text-heading border-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90"
          >
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
