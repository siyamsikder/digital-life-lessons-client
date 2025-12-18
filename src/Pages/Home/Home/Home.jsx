import React from "react";
import AddLesson from "../../Dashboard/AddLesson/AddLesson";
import HeroSection from "../Banner/HeroSection";
import PricingUpgrade from "../../Pricing/PricingUpgrade";
import FeaturedLessons from "../../Dashboard/AddLesson/FeaturedLessons";
import HowItWorks from "../HowItWorks/HowItWorks";
import useAuth from "../../../Hooks/useAuth";
import LoadingPage from "../../../Components/LoadingPage/LoadingPage";

const Home = () => {
  const { loading } = useAuth();
  if (loading) return <LoadingPage />;
  return (
    <div>
      <HeroSection />
      <FeaturedLessons />
      <HowItWorks />
      <PricingUpgrade />
    </div>
  );
};

export default Home;
