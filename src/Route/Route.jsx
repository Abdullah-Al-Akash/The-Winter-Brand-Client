import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Main/Home/Home";
import About from "../Pages/Main/About/About";
import Contact from "../Pages/Main/Contact/Contact";
import Reviews from "../Pages/Main/Reviews/Reviews";
import Faq from "../Pages/Main/FAQ/Faq";
import Login from "../Pages/Main/Login/Login";
import Products from "../Pages/Main/Products/Products";
import Register from "../Pages/Main/Register/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/reviews",
        element: <Reviews></Reviews>,
      },
      {
        path: "/faq",
        element: <Faq></Faq>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/checkout",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/add-product",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/all-products",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/add-feature",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/all-feature",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/all-faq",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/view-faq",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/pending-review",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/approve-review",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/manage-order",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/payment",
        element: <DashboardHome></DashboardHome>,
      },
    ],
  },
]);
