import { useParams } from "react-router";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BsTags } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { useState } from "react";

const LessonDetails = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const {
    data: lesson = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/addLesson/${id}`
      );
      return res.data;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () =>
      axios.patch(`${import.meta.env.VITE_API_URL}/addLesson/like/${id}`),
    onSuccess: () => refetch(),
  });

  const favoriteMutation = useMutation({
    mutationFn: async () =>
      axios.patch(`${import.meta.env.VITE_API_URL}/addLesson/favorite/${id}`),
    onSuccess: () => refetch(),
  });

  if (isLoading) return <p>Loading lesson...</p>;
  if (isError || !lesson) return <p>Lesson not found.</p>;

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-base rounded-lg shadow-md">
      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-60 object-cover rounded-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold text-heading mb-3">{lesson.title}</h1>

      <p className="text-text-soft mb-6 leading-relaxed">
        {lesson.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <span className="px-3 py-1 text-sm rounded-full bg-primary text-white flex items-center gap-1">
          <BsTags /> {lesson.category}
        </span>
        <span className="px-3 py-1 text-sm rounded-full border border-text-soft text-text-soft flex items-center gap-1">
          <MdOutlineCategory /> {lesson.tone}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <img
          src={lesson.author?.photoURL || "https://via.placeholder.com/44"}
          referrerPolicy="no-referrer"
          alt="User"
          className="w-12 h-12 rounded-full object-cover border border-border"
        />
        <div>
          <p className="font-semibold text-heading">
            {lesson.author?.name || "Unknown"}
          </p>
          <p className="text-text-soft text-sm">
            {new Date(lesson.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Community Reactions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => likeMutation.mutate()}
          className="flex items-center gap-1 px-4 py-2 border rounded-md text-text-soft hover:bg-primary/10">
          ❤️ Like ({lesson.likes || 0})
        </button>
        <button
          onClick={() => favoriteMutation.mutate()}
          className="flex items-center gap-1 px-4 py-2 border rounded-md text-text-soft hover:bg-primary/10">
          🔖 Favorite ({lesson.favorites || 0})
        </button>
      </div>

      {/* Comments */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-heading mb-3">Comments</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-border rounded-md bg-card text-text-soft placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your thoughts on this lesson..."
          rows={4}
        />
        <button className="mt-2 px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary/90">
          Post Comment
        </button>
      </div>

      {/* Save & Share */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary/90">
          Save
        </button>
        <button className="px-4 py-2 border border-border rounded-md text-text-soft hover:bg-primary/10">
          Share
        </button>
      </div>
    </div>
  );
};

export default LessonDetails;
