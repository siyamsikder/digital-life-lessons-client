import {
  FaUserEdit,
  FaFolderOpen,
  FaHeart,
  FaGlobeAsia,
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import LoadingPage from "../../../Components/LoadingPage/LoadingPage";

const HowItWorks = () => {
  const { loading } = useAuth();

  if (loading) return <LoadingPage/>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
          How It Works
        </h2>
        <p className="text-text-soft max-w-2xl mx-auto">
          Digital Life Lessons helps you capture wisdom, organize insights, and
          grow through shared experiences — all in one place.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Step 1 */}
        <div className="bg-card p-6 rounded-xl shadow text-center">
          <FaUserEdit className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Create Your Lesson
          </h3>
          <p className="text-sm text-text-soft">
            Write down meaningful life lessons, personal growth insights, or
            experiences you’ve learned from.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-card p-6 rounded-xl shadow text-center">
          <FaFolderOpen className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Organize & Manage
          </h3>
          <p className="text-sm text-text-soft">
            Keep your lessons organized, update them anytime, and track your
            personal learning journey.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-card p-6 rounded-xl shadow text-center">
          <FaHeart className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Save Favorites
          </h3>
          <p className="text-sm text-text-soft">
            Mark important lessons as favorites so you can revisit the wisdom
            that matters most.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-card p-6 rounded-xl shadow text-center">
          <FaGlobeAsia className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Share & Explore
          </h3>
          <p className="text-sm text-text-soft">
            Browse public lessons shared by others and inspire growth through
            shared life experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
