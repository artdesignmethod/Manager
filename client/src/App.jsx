/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  AddProject,
  AllProjects,
  Stats,
  Profile,
  EditProject,
  Admin,
  Error,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addProjectAction } from "./pages/AddProject";
import { loader as allProjectsLoader } from "./pages/AllProjects";
import { loader as editProjectLoader } from "./pages/EditProject";
import { action as editProjectAction } from "./pages/EditProject";
import { action as deleteProjectAction } from "./pages/DeleteProject";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";

import ErrorElement from "./components/ErrorElement";

export const checkDefaultTheme = () => {
  const darkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", darkTheme);
  return darkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/", // Parent route
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "register", element: <Register />, action: registerAction },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },

      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddProject />,
            action: addProjectAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-projects",
            element: <AllProjects />,
            loader: allProjectsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "edit-project/:id",
            element: <EditProject />,
            loader: editProjectLoader(queryClient),
            action: editProjectAction(queryClient),
          },
          {
            path: "delete-project/:id",
            action: deleteProjectAction(queryClient),
          },
          { path: "admin", element: <Admin />, loader: adminLoader },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
