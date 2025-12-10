import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { BsTags } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const MyLessons = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch lessons
  const { data: lessons = [], isLoading, isError } = useQuery({
    queryKey: ["myLesson", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/myLesson?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://localhost:3000/addLesson/${id}`);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(["myLesson", user?.email], (oldData) =>
        oldData.filter((lesson) => lesson._id !== id)
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Something went wrong.", "error");
          },
        });
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error!</p>;

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
            className="p-6 bg-card border border-border rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-heading">{lesson.title}</h2>
            <p className="text-text-soft mt-3 line-clamp-2">{lesson.description}</p>

            <div className="flex items-center gap-3 mt-5">
              <img
                src={lesson.author?.photoURL || "https://via.placeholder.com/44"}
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
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(lesson._id)}
                className="flex items-center gap-2 px-4 py-2 border border-red-400 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
              >
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
