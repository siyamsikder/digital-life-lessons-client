import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const PricingPage = () => {
  const { user } = useAuth();

  const checkout = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        senderEmail: user.email,
      });
      window.location.href = res.data.url;
    },
  });

  return (
    <div>
      <button
      className="btn btn-primary w-full text-white text-lg"
       onClick={() => checkout.mutate()}>Upgrade to Premium</button>
    </div>
  );
};

export default PricingPage;
