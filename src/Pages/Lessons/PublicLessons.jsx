import React from "react";
import { useNavigate } from "react-router";
import { BsTags } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PublicLessons = () => {
  const navigate = useNavigate();

  // Fetch public lessons with React Query
  const { data: lessons = [], isLoading, isError } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/addLesson`);
      return res.data.filter((lesson) => lesson.visibility === "public");
    },
  });

  const handleDetails = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  if (isLoading) return <p className="text-center mt-12">Loading lessons...</p>;
  if (isError) return <p className="text-center mt-12">Failed to load lessons.</p>;
  if (lessons.length === 0) return <p className="text-center mt-12">No public lessons found.</p>;

  return (
    <div className="max-w-6xl my-12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {lessons.map((lesson) => (
        <div
          key={lesson._id}
          className="p-6 rounded-xl bg-card shadow-md hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-heading">{lesson.title}</h2>

          <p className="text-text-soft mt-3 leading-relaxed line-clamp-2">
            {lesson.description}
          </p>

          <div className="flex items-center gap-3 mt-5">
            <img
              src={lesson.author?.photoURL || "https://via.placeholder.com/44"}
              referrerPolicy="no-referrer"
              alt="User"
              className="w-11 h-11 rounded-full object-cover border border-border"
            />
            <div>
              <p className="font-semibold text-heading">
                {lesson.author?.name || "Unknown"}
                <span className="text-sm text-text-soft ml-1">
                  ({lesson.accessLevel})
                </span>
              </p>
              <p className="text-sm text-text-soft">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-3 py-1 text-sm rounded-full bg-primary text-white flex items-center gap-1">
              <BsTags /> {lesson.category}
            </span>

            <span className="px-3 py-1 text-sm rounded-full border border-text-soft text-text-soft flex items-center gap-1">
              <MdOutlineCategory /> {lesson.tone}
            </span>
          </div>

          <button
            onClick={() => handleDetails(lesson._id)}
            className="w-full mt-5 bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/80"
          >
            Read more
          </button>
        </div>
      ))}
    </div>
  );
};

export default PublicLessons;
