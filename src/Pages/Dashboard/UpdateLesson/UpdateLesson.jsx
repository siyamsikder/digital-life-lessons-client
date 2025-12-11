import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Load existing lesson
  const { data: lessonData, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/addLesson/${id}`
      );
      return res.data;
    },
  });

  // Upload new image optional
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST
    }`;

    const res = await axios.post(imgUrl, formData);
    return res.data.data.url;
  };

  // Update API
  const mutation = useMutation({
    mutationFn: async (updatedInfo) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/addLesson/${id}`,
        updatedInfo
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Lesson updated successfully!", "success");
      navigate("/dashboard/my-lessons");
    },
  });

  // Set form default values
  useEffect(() => {
    if (lessonData) {
      reset(lessonData);
      setPreviewImage(lessonData.image);
    }
  }, [lessonData, reset]);

  const onSubmit = async (data) => {
    let imageUrl = lessonData.image;

    if (data.image && data.image[0]) {
      imageUrl = await uploadImage(data.image[0]);
    }

    const updatedInfo = {
      title: data.title,
      description: data.description,
      category: data.category,
      tone: data.tone,
      visibility: data.visibility,
      accessLevel: data.accessLevel,
      image: imageUrl,
    };

    mutation.mutate(updatedInfo);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-base min-h-screen">
      <div className="max-w-4xl mx-auto bg-card border border-base shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-heading">Update Lesson</h1>

        <p className="mb-6 text-soft">
          Editing lesson created by{" "}
          <span className="font-semibold text-heading">
            {lessonData?.author?.name}
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
            <label className="block mb-1 text-soft">Description</label>
            <textarea
              rows={6}
              placeholder="Update your lesson..."
              {...register("description", { required: "Description is required" })}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-soft">Category</label>
            <select
              {...register("category")}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading focus:ring-2 focus:ring-primary"
            >
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Relationships</option>
              <option>Mindset</option>
              <option>Mistakes Learned</option>
            </select>
          </div>

          {/* Tone */}
          <div>
            <label className="block mb-1 text-soft">Emotional Tone</label>
            <select
              {...register("tone")}
              className="w-full px-4 py-2 border border-base rounded-md bg-base text-heading focus:ring-2 focus:ring-primary"
            >
              <option>Motivational</option>
              <option>Sad</option>
              <option>Realization</option>
              <option>Gratitude</option>
            </select>
          </div>

          {/* Image Replace */}
          <div>
            <label className="block mb-1 text-soft">Replace Image</label>

            {previewImage && (
              <img
                src={previewImage}
                className="w-40 h-28 rounded-md object-cover border mb-3"
              />
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input w-full bg-base text-heading border-base"
            />
          </div>

          {/* Visibility & Access */}
          <div className="p-4 border border-base rounded-lg bg-card mt-6">
            <h2 className="text-lg font-semibold text-heading mb-2">
              Visibility & Access
            </h2>

            {/* Visibility */}
            <label className="block text-sm font-medium text-heading mb-1">
              Visibility
            </label>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="public"
                  {...register("visibility")}
                  className="hidden peer"
                />
                <div className="border border-base p-4 rounded-lg peer-checked:bg-primary peer-checked:text-white">
                  <h3 className="font-semibold">Public</h3>
                  <p className="text-soft text-sm">Visible to all users</p>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="private"
                  {...register("visibility")}
                  className="hidden peer"
                />
                <div className="border border-base p-4 rounded-lg peer-checked:bg-primary peer-checked:text-white">
                  <h3 className="font-semibold">Private</h3>
                  <p className="text-soft text-sm">Only you can see</p>
                </div>
              </label>
            </div>

            {/* Access Level */}
            <label className="block text-sm font-medium text-heading mb-1">
              Access Level
            </label>

            <div className="space-y-3">
              <label className="flex items-center gap-3 border border-base p-3 rounded-lg">
                <input
                  type="radio"
                  value="free"
                  {...register("accessLevel")}
                />
                <div>
                  <h3 className="font-semibold text-heading">Free</h3>
                  <p className="text-soft text-sm">Visible to all users</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 border border-base p-3 rounded-lg ${
                  watch("visibility") === "private"
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  value="premium"
                  {...register("accessLevel")}
                  disabled={watch("visibility") === "private"}
                />
                <div>
                  <h3 className="font-semibold text-heading">Premium</h3>
                  <p className="text-soft text-sm">
                    Visible only to premium users
                  </p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/120"
          >
            Update Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLesson;
