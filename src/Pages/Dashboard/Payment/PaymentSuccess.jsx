import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import axios from "axios";
import { FaCheckCircle, FaCrown } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      axios.patch(
        `http://localhost:3000/payment-success?session_id=${sessionId}`
      );
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border border-base rounded-xl shadow-xl p-8 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-heading mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-soft mb-6">
          Congratulations! You are now a{" "}
          <span className="text-primary font-semibold">Premium Member</span>.
        </p>

        <div className="flex items-center justify-center gap-2 text-primary font-semibold mb-6">
          <FaCrown />
          Premium Access Activated
        </div>

        <Link to="/dashboard">
          <button className="btn btn-primary w-full text-white text-lg">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
