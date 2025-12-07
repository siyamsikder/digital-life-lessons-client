import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Signup from "../Pages/Auth/Register/Signup";
import PrivateRout from "./PrivateRout";
import DashboardLayout from "../Layout/DashboardLayout";
import AddLesson from "../Pages/Dashboard/AddLesson/AddLesson";
import MyLessons from "../Pages/Dashboard/MyLessons/MyLessons";
import PublicLessons from "../Pages/Dashboard/PublicLessons/PublicLessons";

export const router = createBrowserRouter([
  // MAIN LAYOUT
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "public-lessons",
        element: <PublicLessons />,
      },
    ],
  },

  // AUTH LAYOUT
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },

  // DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: (
      <PrivateRout>
        <DashboardLayout />
      </PrivateRout>
    ),

    children: [
      {
        index: true,
        element: <h2>Dashboard Home</h2>,
      },
      {
        path: "add-lesson",
        element: <AddLesson />,
      },
      {
        path: "my-lessons",
        element: <MyLessons />,
      },
    ],
  },
]);
