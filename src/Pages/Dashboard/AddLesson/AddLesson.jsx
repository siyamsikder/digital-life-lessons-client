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
    watch,
    formState: { errors },
  } = useForm();

  // Upload image in imgBB
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST
    }`;

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
          Logged in as{" "}
          <span className="font-semibold text-heading">
            {user?.displayName}
          </span>
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
            <label className="block mb-1 text-soft">
              Full Description / Insight
            </label>
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

          {/* VISIBILITY & ACCESS SECTION */}
          <div className="p-4 border border-base rounded-lg bg-card mt-6">
            <h2 className="text-lg font-semibold text-heading mb-2">
              Visibility & Access
            </h2>
            <p className="text-soft text-sm mb-4">
              Control who can see and access your lesson
            </p>

            {/* VISIBILITY */}
            <label className="block text-sm font-medium text-heading mb-1">
              Visibility
            </label>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* PUBLIC */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="public"
                  defaultChecked
                  {...register("visibility")}
                  className="hidden peer"
                />
                <div className="border border-base p-4 rounded-lg peer-checked:bg-primary peer-checked:text-white transition">
                  <h3 className="font-semibold text-heading peer-checked:text-white">
                    Public
                  </h3>
                  <p className="text-soft text-sm peer-checked:text-white/80">
                    Visible to all users
                  </p>
                </div>
              </label>

              {/* PRIVATE */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="private"
                  {...register("visibility")}
                  className="hidden peer"
                />
                <div className="border border-base p-4 rounded-lg peer-checked:bg-primary peer-checked:text-white transition">
                  <h3 className="font-semibold text-heading peer-checked:text-white">
                    Private
                  </h3>
                  <p className="text-soft text-sm peer-checked:text-white/80">
                    Only you can see it
                  </p>
                </div>
              </label>
            </div>

            {/* ACCESS LEVEL */}
            <label className="block text-sm font-medium text-heading mb-2">
              Access Level
            </label>

            <div className="space-y-3">
              {/* FREE OPTION */}
              <label className="flex items-center gap-3 cursor-pointer border border-base p-3 rounded-lg">
                <input
                  type="radio"
                  value="free"
                  defaultChecked
                  {...register("accessLevel")}
                  className="radio"
                />
                <div>
                  <h3 className="font-semibold text-heading">Free</h3>
                  <p className="text-soft text-sm">
                    Visible to all users (Free + Premium)
                  </p>
                </div>
              </label>

              {/* PREMIUM OPTION */}
              <label
                className={`flex items-center gap-3 cursor-pointer border border-base p-3 rounded-lg ${
                  watch("visibility") === "private"
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  value="premium"
                  {...register("accessLevel")}
                  className="radio"
                  disabled={watch("visibility") === "private"}
                />
                <div>
                  <h3 className="font-semibold text-heading">Premium</h3>
                  <p className="text-soft text-sm">
                    Only visible to Premium users
                  </p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/120"
          >
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
