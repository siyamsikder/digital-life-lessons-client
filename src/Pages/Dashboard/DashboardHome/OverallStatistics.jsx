import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../Hooks/useAuth";

const OverallStatistics = () => {
  const { user } = useAuth();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["stats-graph", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/myLesson?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-6">Loading statistics...</p>;
  }

  // 📊 Dynamic calculations
  const totalLessons = lessons.length;

  const totalLikes = lessons.reduce(
    (sum, lesson) => sum + (lesson.likesCount || 0),
    0
  );

  const totalFavorites = lessons.reduce(
    (sum, lesson) => sum + (lesson.favoritesCount || 0),
    0
  );

  const data = [
    { name: "Lessons", value: totalLessons },
    { name: "Likes", value: totalLikes },
    { name: "Favorites", value: totalFavorites },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-card border border-border rounded-xl p-6">
      <h2 className="text-2xl font-bold text-heading mb-6">
        Overall Statistics
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={50}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              fill="var(--color-primary)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverallStatistics;
