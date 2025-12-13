import React from "react";
import { useNavigate } from "react-router";
import { BsTags } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const PublicLessons = () => {
  const navigate = useNavigate();

  const {
    data: lessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/addLesson`);
      return res.data.filter((lesson) => lesson.visibility === "public");
    },
  });
  const handlePayment = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`
      );
      window.location.href = res.data.url;
    },
  });

  const handleDetails = (id) => navigate(`/lesson/${id}`);

  if (isLoading) return <p className="text-center mt-12">Loading lessons...</p>;
  if (isError)
    return <p className="text-center mt-12">Failed to load lessons.</p>;
  if (lessons.length === 0)
    return <p className="text-center mt-12">No public lessons found.</p>;

  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* SECTION TITLE */}
      <h1 className="text-3xl font-bold text-heading">Public Lessons</h1>
      <div className="w-full h-[1px] bg-border mt-3 mb-10"></div>

      {lessons.map((lesson) => (
        <div key={lesson._id} className="pb-10 mb-10 border-b border-border">
          <div className="flex flex-col md:flex-row gap-6">
            {/* LEFT SIDE */}
            <div className="flex-1">
              {/* Category + Tone */}
              <p className="text-xs uppercase tracking-wider text-primary font-semibold flex items-center gap-1">
                <BsTags /> {lesson.category} • {lesson.tone}
              </p>

              {/* Title */}
              <h2
                onClick={() => handleDetails(lesson._id)}
                className="text-2xl md:text-3xl font-bold text-heading mt-2 cursor-pointer hover:underline">
                {lesson.title}
              </h2>

              {/* Description */}
              <p className="text-text-soft mt-3 leading-relaxed line-clamp-3">
                {lesson.description}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 mt-5">
                <img
                  src={
                    lesson.author?.photoURL || "https://via.placeholder.com/44"
                  }
                  referrerPolicy="no-referrer"
                  alt=""
                  className="w-11 h-11 rounded-full object-cover border border-border"
                />
                <div>
                  <p className="font-semibold text-heading">
                    {lesson.author?.name || "Unknown"}{" "}
                    <span className="text-sm text-text-soft">
                      ({lesson.accessLevel})
                    </span>
                  </p>
                  <p className="text-sm text-text-soft">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {lesson.image && (
              <div className="flex-none">
                <img
                  src={lesson.image}
                  className="w-40 h-28 rounded-md object-cover border border-border"
                  alt=""
                />
              </div>
            )}
          </div>

          <button
            onClick={() => handlePayment.mutate()}
            className="btn btn-primary w-full text-lg text-white">
            Upgrade to Premium
          </button>
        </div>
      ))}
    </div>
  );
};

export default PublicLessons;
