import React from "react";
import { FaCrown } from "react-icons/fa";
import PricingPage from "../Dashboard/Payment/PricingPage";

const PricingUpgrade = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary flex items-center justify-center gap-3">
          <FaCrown className="text-primary" />
          Upgrade to Premium
        </h1>
        <p className="text-soft mt-2">
          Unlock full access to premium lessons and exclusive features.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-base bg-card">
        <table className="table w-full">
          <thead className="bg-primary text-white text-lg">
            <tr>
              <th className="p-4">Features</th>
              <th className="p-4 text-center">Free Plan</th>
              <th className="p-4 text-center">Premium Plan</th>
            </tr>
          </thead>

          <tbody className="text-soft">
            <tr>
              <td className="p-4">Access to Public Lessons</td>
              <td className="text-center p-4">✔</td>
              <td className="text-center p-4">✔</td>
            </tr>

            <tr className="bg-base">
              <td className="p-4">Access to Premium Lessons</td>
              <td className="text-center p-4">✖</td>
              <td className="text-center p-4 text-primary font-bold">✔</td>
            </tr>

            <tr>
              <td className="p-4">Create Premium Lessons</td>
              <td className="text-center p-4">✖</td>
              <td className="text-center p-4 text-primary font-bold">✔</td>
            </tr>

            <tr className="bg-base">
              <td className="p-4">Unlimited Favorites</td>
              <td className="text-center p-4">✔ Limited</td>
              <td className="text-center p-4">✔ Unlimited</td>
            </tr>

            <tr>
              <td className="p-4">Ad-free Experience</td>
              <td className="text-center p-4">✖</td>
              <td className="text-center p-4">✔</td>
            </tr>

            <tr className="bg-base">
              <td className="p-4">Priority Listing</td>
              <td className="text-center p-4">✖</td>
              <td className="text-center p-4">✔</td>
            </tr>

            <tr>
              <td className="p-4">Lifetime Access</td>
              <td className="text-center p-4">✖</td>
              <td className="text-center p-4">✔</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-15">
        <PricingPage />
      </div>
    </div>
  );
};

export default PricingUpgrade;
