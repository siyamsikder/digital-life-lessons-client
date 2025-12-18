import React from "react";
import AddLesson from "../../Dashboard/AddLesson/AddLesson";
import HeroSection from "../Banner/HeroSection";
import PricingUpgrade from "../../Pricing/PricingUpgrade";
import FeaturedLessons from "../../Dashboard/AddLesson/FeaturedLessons";
import HowItWorks from "../HowItWorks/HowItWorks";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedLessons/>
      <HowItWorks/>
      <PricingUpgrade/>
    </div>
  );
};

export default Home;
