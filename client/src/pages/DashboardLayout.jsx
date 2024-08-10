/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import SidebarNav from "../components/SidebarNav";
import DashboardNav from "../components/DashboardNav";
import MobileNav from "../components/MobileNav";
import { checkDefaultTheme } from "../App";

// import { toast } from "react-toastify";

// const logoutUser = async () => {
//   navigate("/");
//   await customFetch("/auth/logout");
//   QueryClient.invalidateQueries();
//   toast.success("You have logged out.");
// };

const DashboardContext = createContext();

const DashboardLayout = () => {
  const [resizeSidebar, setResizeSidebar] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const [darkTheme, setDarkTheme] = useState(checkDefaultTheme);

  // Temp
  const user = { name: "Hi, User" };

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
    console.log("User logged out.");
    closeDropdown();
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
          <Outlet context={user} />
        </main>
      </div>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
