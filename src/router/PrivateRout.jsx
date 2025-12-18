import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import LoadingPage from "../Components/LoadingPage/LoadingPage";

const PrivateRout = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);
  if (loading) {
    return <LoadingPage/>
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRout;
