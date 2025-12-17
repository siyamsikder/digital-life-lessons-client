import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Favorites = () => {
  const { user } = useAuth();

  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading favorites...</p>;
  if (isError) return <p>Failed to load favorites.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorite lessons yet.</p>
      ) : (
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {favorites.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-card rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              {lesson.image ? (
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-heading mb-2">
                  {lesson.title}
                </h3>

                <p className="text-text-soft text-sm mb-4 line-clamp-3">
                  {lesson.description}
                </p>

                <p className="text-xs text-text-soft mb-3">
                  {new Date(lesson.createdAt).toDateString()}
                </p>

                <Link
                  to={`/lesson/${lesson._id}`}
                  className="text-primary font-semibold hover:underline">
                  read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
