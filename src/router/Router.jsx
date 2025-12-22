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
import LessonDetails from "../Pages/Lessons/LessonDetails";
import PublicLessons from "../Pages/Lessons/PublicLessons";
import UpdateLesson from "../Pages/Dashboard/UpdateLesson/UpdateLesson";
import PricingUpgrade from "../Pages/Pricing/PricingUpgrade";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel ";
import Profile from "../Pages/Dashboard/profile/Profile";
import Favorites from "../Pages/Dashboard/favorites/favorites";
import NotFound from "../Components/NotFound/NotFound";
import HowItWorks from "../Pages/Home/HowItWorks/HowItWorks";
import Overview from "../Pages/Dashboard/DashboardHome/Overview";
import ReportedLessons from "../Pages/Lessons/ReportedLessons";

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
      {
        path: "lesson/:id",
        element: <LessonDetails />,
      },
      {
        path: "pricing",
        element: <PricingUpgrade />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "payment-success",
        element: (
          <PrivateRout>
            <PaymentSuccess />
          </PrivateRout>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <PrivateRout>
            <PaymentCancel />
          </PrivateRout>
        ),
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
        element: <Overview />,
      },
      {
        path: "add-lesson",
        element: <AddLesson />,
      },
      {
        path: "my-lessons",
        element: <MyLessons />,
      },
      {
        path: "update-lesson/:id",
        element: <UpdateLesson />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "admin/reported-lessons",
        element: <ReportedLessons/>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
