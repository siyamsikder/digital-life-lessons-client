import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Signup from "../Pages/Auth/Register/Signup";
import PrivateRout from "./PrivateRout";
import DashboardLayout from "../Layout/DashboardLayout";
import AddLesson from "../Pages/Dashboard/AddLesson/AddLesson";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  // Auth Routes
  {
    path: "/",
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
        <DashboardLayout/>
      </PrivateRout>
    ),

    children: [
      {
        index: true,
        element: <h2>Dashboard Home</h2>
      },
      {
        path: "add-lesson",
        element: <AddLesson/>
      },
    ],
  },
]);
