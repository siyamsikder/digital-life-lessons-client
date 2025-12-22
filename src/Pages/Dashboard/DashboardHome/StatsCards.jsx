import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaBookOpen,
  FaHeart,
  FaBookmark,
  FaClock,
  FaCrown,
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import usePremium from "../Payment/usePremium";

const StatsCards = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();
  const { isPremium } = usePremium();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["dashboard-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/myLesson?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading || isRoleLoading) {
    return <p className="text-center mt-6">Loading dashboard...</p>;
  }

  // 📊 Calculations
  const totalLessons = lessons.length;
  const totalLikes = lessons.reduce(
    (sum, lesson) => sum + (lesson.likesCount || 0),
    0
  );
  const totalFavorites = lessons.reduce(
    (sum, lesson) => sum + (lesson.favoritesCount || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<FaBookOpen />}
        title="My Lessons"
        value={totalLessons}
        color="bg-blue-500"
      />

      <StatCard
        icon={<FaHeart />}
        title="Total Likes"
        value={totalLikes}
        color="bg-pink-500"
      />

      <StatCard
        icon={<FaBookmark />}
        title="Favorites"
        value={totalFavorites}
        color="bg-purple-500"
      />
      
      <StatCard
        icon={isPremium ? <FaCrown /> : <FaClock />}
        title="Account Type"
        value={isPremium ? "Premium 👑" : "Free"}
        color={isPremium ? "bg-yellow-500" : "bg-gray-500"}
      />
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl text-white text-xl ${color}`}
      >
        {icon}
      </div>
      <h3 className="text-sm text-text-soft mt-4">{title}</h3>
      <p className="text-2xl font-bold text-heading">{value}</p>
    </div>
  );
};

export default StatsCards;
