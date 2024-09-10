/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

import SidebarNav from "../components/SidebarNav";
import DashboardNav from "../components/DashboardNav";
import MobileNav from "../components/MobileNav";
import { checkDefaultTheme } from "../App";
import Loading from "../components/Loading";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();

  const navigate = useNavigate();

  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  const [resizeSidebar, setResizeSidebar] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const [darkTheme, setDarkTheme] = useState(checkDefaultTheme);

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
    toast.success("You have logged out");
  };

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
