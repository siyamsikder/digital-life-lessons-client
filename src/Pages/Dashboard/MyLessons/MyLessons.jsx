import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsTags } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import LoadingPage from "../../../Components/LoadingPage/LoadingPage";

const MyLessons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myLesson", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://digital-life-lessons-server-nine.vercel.app/myLesson?email=${user?.email}`
      );
      return res.data;
    },
  });
  const handleLessonDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`https://digital-life-lessons-server-nine.vercel.app/addLesson/${id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your lesson has been deleted.",
            icon: "success",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading)
    return <LoadingPage/>

  return (
    <div className="min-h-screen px-4 mt-10">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-heading">My Lessons</h1>
        <p className="text-text-soft mt-1">
          You have created {lessons.length} life lessons
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="p-6 bg-card border border-border rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-heading">{lesson.title}</h2>

            <p className="text-text-soft mt-3 line-clamp-2">
              {lesson.description}
            </p>

            <div className="flex items-center gap-3 mt-5">
              <img
                src={
                  lesson.author?.photoURL || "https://via.placeholder.com/44"
                }
                className="w-11 h-11 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold text-heading">
                  {lesson.author?.name}
                  <span className="text-sm text-text-soft ml-1">
                    ({lesson.accessLevel})
                  </span>
                </p>
                <p className="text-sm text-text-soft">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <span className="px-3 py-1 text-sm rounded-full bg-primary text-white flex items-center gap-1">
                <BsTags /> {lesson.category}
              </span>
              <span className="px-3 py-1 text-sm rounded-full border text-text-soft flex items-center gap-1">
                <MdOutlineCategory /> {lesson.tone}
              </span>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  navigate(`/dashboard/update-lesson/${lesson._id}`)
                }
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleLessonDelete(lesson._id)}
                className="flex items-center gap-2 px-4 py-2 border border-red-400 text-red-500 hover:bg-red-500 hover:text-white rounded-lg">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLessons;
