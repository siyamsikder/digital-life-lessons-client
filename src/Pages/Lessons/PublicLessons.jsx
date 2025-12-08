import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { BsTags } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";

const PublicLessons = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/addLesson`
        );

        const publicLessons = res.data.filter(
          (lesson) => lesson.visibility === "public"
        );

        setLessons(publicLessons);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLessons();
  }, []);

  const handleDetails = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="max-w-6xl my-12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {lessons.map((lesson) => (
        <div
          key={lesson._id}
          className="p-6 rounded-xl bg-card shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-heading">{lesson.title}</h2>

          <p className="text-text-soft mt-3 leading-relaxed line-clamp-2">
            {lesson.description}
          </p>

          <div className="flex items-center gap-3 mt-5">
            <img
              src={user?.photoURL || "https://via.placeholder.com/44"}
              alt="User"
              className="w-11 h-11 rounded-full object-cover border border-border"
            />

            <div>
              <p className="font-semibold text-heading">
                {user.displayName}
                <span className="text-sm text-text-soft ml-1">
                  ({lesson.accessLevel})
                </span>
              </p>

              <p className="text-sm text-text-soft">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5 ">
            <span className="px-3 py-1 text-sm rounded-full bg-primary text-white flex items-center gap-1">
              <span>
                <BsTags />
              </span>
              {lesson.category}
            </span>

            <span className="px-3 py-1 text-sm rounded-full border border-text-soft text-text-soft flex items-center gap-1">
              <span>
                <MdOutlineCategory />
              </span>
              {lesson.tone}
            </span>
          </div>

          <button
            onClick={() => handleDetails(lesson._id)}
            className="w-full mt-5 bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/80">
            read more
          </button>
        </div>
      ))}
    </div>
  );
};

export default PublicLessons;
