import { useParams } from "react-router";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BsTags } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { PiShareFatLight } from "react-icons/pi";
import { FaRegHandPointUp } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";

const LessonDetails = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useAuth();
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

  const commentMutation = useMutation({
    mutationFn: async () =>
      axios.patch(`${import.meta.env.VITE_API_URL}/addLesson/comment/${id}`, {
        name: user?.displayName,
        photoURL: user?.photoURL,
        comment,
      }),
    onSuccess: () => {
      setComment("");
      refetch();
    },
  });

  if (isLoading) return <p>Loading lesson...</p>;
  if (isError || !lesson) return <p>Lesson not found.</p>;

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-base rounded-lg">
      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-200 object-cover rounded-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold text-heading mb-3">{lesson.title}</h1>

      <p className="text-text-soft mb-6 whitespace-pre-line !line-clamp-none">
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

      <div className="flex items-center justify-between mt-8 mb-6">
        <div className="flex items-center gap-6 text-text-soft">
          <button
            onClick={() => likeMutation.mutate()}
            className="flex items-center gap-1 text-text-soft hover:text-primary transition">
            <FaRegHandPointUp className="text-xl" />
            <span>{lesson.likes || 0}</span>
          </button>

          <div className="flex items-center gap-1 text-text-soft">
            <IoChatbubbleOutline className="text-xl" />
            <span>{lesson.comments?.length || 0}</span>
          </div>
        </div>

        {/* Right side: Save + Share */}
        <div className="flex items-center gap-5 text-text-soft">
          <button
            onClick={() => favoriteMutation.mutate()}
            className="hover:text-primary transition flex items-center gap-1">
            <FaRegBookmark className="text-xl" />
            <span>{lesson.favorites || 0}</span>
          </button>

          <button className="hover:text-primary transition">
            <PiShareFatLight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-b border-border mb-6"></div>

      {/* Comments Section */}
      <h2 className="text-xl font-semibold text-heading mb-3">Comments</h2>

      <div className="bg-card p-4 border border-border rounded-lg mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows={3}
          className="w-full p-3 rounded-md bg-base border border-border text-text-soft focus:ring-2 focus:ring-primary outline-none resize-none"
        />

        <button
          onClick={() => commentMutation.mutate()}
          className="mt-3 mb-5 px-4 py-2 bg-primary text-white rounded-lg">
          Post Comment
        </button>

        <div className="mb-10">
          {lesson.comments?.length > 0 ? (
            <div className="space-y-5 mb-6">
              {lesson.comments.map((c, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card border rounded-xl shadow-sm">
                  <img
                    src={c.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-heading">{c.name}</p>
                    <p className="text-text-soft leading-relaxed">
                      {c.comment}
                    </p>

                    <p className="text-xs text-text-soft/70 mt-1">
                      {new Date(c.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-soft/70">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
