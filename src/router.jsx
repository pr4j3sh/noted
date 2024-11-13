import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Protected from "./components/protected";
import Root from "./layouts/root";
import NotFound from "./pages/not-found";
import Profile from "./pages/profile";
import DashboardLayout from "./layouts/dashboard-layout";
import Create from "./components/create";
import Update from "./components/update";
import View from "./pages/view";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
        children: [
          {
            index: true,
            element: <Signin />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <Protected>
            <DashboardLayout />
          </Protected>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "create",
            element: <Create />,
          },
          {
            path: "edit/:id",
            element: <Update />,
          },
          {
            path: "view/:id",
            element: <View />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
