import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const usePremium = () => {
  const { user } = useAuth();

  const { data: isPremium = false, isLoading } = useQuery({
    queryKey: ["isPremium", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`
      );
      return res.data?.isPremium === true;
    },
  });

  return { isPremium, isLoading };
};

export default usePremium;
