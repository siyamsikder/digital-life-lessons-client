import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border border-base rounded-xl shadow-xl p-8 text-center">

        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-heading mb-2">
          Payment Cancelled
        </h1>

        <p className="text-soft mb-6">
          Your payment was not completed. No money has been charged.
        </p>

        <Link to="/pricing">
          <button className="btn btn-outline btn-primary w-full text-lg">
            Try Again
          </button>
        </Link>

      </div>
    </div>
  );
};

export default PaymentCancel;
