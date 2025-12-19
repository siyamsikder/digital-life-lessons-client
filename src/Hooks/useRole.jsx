import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();

  const { data:role, isLoading:isRoleLoading} = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${user.email}`
      );
      return res.data.role;
    },
  });

  return { role, isRoleLoading};
};

export default useRole;
