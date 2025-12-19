import React from "react";
import StatsCards from "./StatsCards";
import OverallStatistics from "./OverallStatistics";

const Overview = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>
      <StatsCards/>
      <OverallStatistics/>
    </div>
  );
};

export default Overview;
