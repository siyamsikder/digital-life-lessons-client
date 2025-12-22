import React from "react";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import usePremium from "./usePremium";

const PremiumCard = () => {
  const { user } = useAuth();
  const { isPremium } = usePremium();

  const checkout = useMutation({
    mutationFn: async () => {
      if (!user?.email) {
        Swal.fire("Error", "Please login first!", "error");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        { senderEmail: user.email }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    },
    onError: (error) => {
      Swal.fire("Error", "Something went wrong. Try again!", "error");
      console.error(error);
    },
  });

  const handleUpgrade = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to upgrade to Premium!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, upgrade now!",
    }).then((result) => {
      if (result.isConfirmed) {
        checkout.mutate();
        Swal.fire({
          title: "Redirecting...",
          text: "You will be redirected to payment gateway",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  if (isPremium) {
    return (
      <div className="rounded-xl p-8 text-center border-2 border-primary shadow-xl">
        <h2 className="text-3xl font-bold mb-3 text-yellow-700">
          👑 Premium Member
        </h2>
        <p className="text-lg text-yellow-600 mb-4">
          You already have lifetime access to all premium features.
        </p>
        <p className="text-sm text-primary">
          Thank you for supporting LifeNotes ❤️
        </p>
      </div>
    );
  }
  return (
    <div className="bg-base rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300">
      <h2 className="text-3xl font-bold mb-2 text-heading">
        Premium Plan – Lifetime
      </h2>
      <p className="text-primary text-4xl font-extrabold mb-4">৳1500</p>
      <p className="text-soft mb-6">
        Unlock all Premium features, create paid lessons, ad-free experience,
        and lifetime access.
      </p>
      <button
        onClick={handleUpgrade}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-primary-focus transition transform hover:-translate-y-1 hover:scale-105">
        Upgrade to Premium
      </button>
    </div>
  );
};

export default PremiumCard;
