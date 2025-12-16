import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const FeaturedLessons = () => {
  const { data: lessons = [] } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/addLesson`
      );
      return res.data;
    },
  });

  const featured = lessons.slice(0, 2);

  return (
    <section className="bg-base py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

        <div className="lg:col-span-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-heading mb-6">
            THE LATEST!
          </h2>

          <p className="text-lg text-text-soft leading-relaxed mb-8">
            Stay engaged and up to date on the latest lessons, thoughts,
            and inspirational stories from our community.
          </p>

          <Link
            to="/lessons"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Explore Lessons
          </Link>

          {/* Decorative Arrow */}
          <div className="hidden lg:block mt-10">
            <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
              <path
                d="M5 40 C60 70, 100 10, 160 40"
                stroke="#ED8B00"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              <polygon
                points="155,30 175,40 155,50"
                fill="#ED8B00"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-card rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-52 object-cover"
              />

              {/* Content */}
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
                  className="text-primary font-semibold hover:underline"
                >
                  read more →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedLessons;
