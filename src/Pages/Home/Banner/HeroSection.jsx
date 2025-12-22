import React from "react";
import useAuth from "../../../Hooks/useAuth";

const HeroSection = () => {
  const { loading } = useAuth();

  if (loading) return <LoadingPage />;

  return (
    <section className="max-w-6xl mx-auto px-6 py-15 text-center">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-heading">
        Capture Your Life Lessons, Simply.
      </h1>
      <p className="text-text-soft mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
        A clean and peaceful space to document the wisdom, experiences, and
        reflections you gather throughout your journey.
      </p>

      <div className="mt-8 flex justify-center">
        <div className="p-6 rounded-xl">
          <img
            src="https://i.ibb.co.com/BH6Lhrsm/Mobile-note-list-amico-removebg-preview.png"
            alt="Life Lessons Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
