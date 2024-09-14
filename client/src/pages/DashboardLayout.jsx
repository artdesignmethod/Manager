/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";

import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { SidebarNav, DashboardNav, MobileNav, Loading } from "../components";
import { checkDefaultTheme } from "../App";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ queryClient }) => {
  const { user } = useQuery(userQuery).data;

  const navigate = useNavigate();

  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  const [resizeSidebar, setResizeSidebar] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const [darkTheme, setDarkTheme] = useState(checkDefaultTheme);

  const [isAuthError, setIsAuthError] = useState(false);

  const toggleSidebar = () => {
    setResizeSidebar(!resizeSidebar);
  };

  function toggleDarkTheme() {
    const newDarkTheme = !darkTheme;

    setDarkTheme(newDarkTheme);

    document.body.classList.toggle("dark-theme", newDarkTheme);

    localStorage.setItem("darkTheme", newDarkTheme);
  }

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function openDropdown() {
    setShowDropdown(true);
  }

  function closeDropdown() {
    setShowDropdown(false);
  }

  const logoutUser = async () => {
    closeDropdown();
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("You have logged out");
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  // Log user out when getting 401 error
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        logoutUser,
        darkTheme,
        toggleDarkTheme,
        showDropdown,
        openDropdown,
        closeDropdown,
        toggleDropdown,
        toggleSidebar,
        resizeSidebar,
      }}
    >
      <div className="dashboard" onClick={showDropdown ? closeDropdown : null}>
        <DashboardNav />
        <SidebarNav />
        <MobileNav />

        <main className="dashboard-main">
          {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
        </main>
      </div>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
