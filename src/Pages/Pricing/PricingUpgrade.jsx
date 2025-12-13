import React from "react";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router";
  
 const handlePayment=async()=>{
  
 }
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

      {/* Payment Card */}
      <div className="max-w-md mx-auto mt-14">
        <div className="card shadow-xl bg-card border border-base p-8">
          <h2 className="text-3xl font-bold text-heading text-center">
            Premium – Lifetime
          </h2>

          <p className="text-center text-soft mt-2">One-time payment only</p>

          <h3 className="text-5xl font-extrabold text-primary text-center mt-6 mb-6">
            ৳1500
          </h3>

          <form>
            <Link to="/dashboard/payment">
              <button
                type="submit" className="btn btn-primary w-full text-white
                font-semibold text-lg"> Upgrade to Premium
              </button>
            </Link>
          </form>

          <p className="text-center text-soft text-sm mt-4">
            Secure Stripe Payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingUpgrade;
