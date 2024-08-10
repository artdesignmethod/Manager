import { NavLink } from "react-router-dom";
import { TbMusicPlus } from "react-icons/tb";
import { PiMicrophoneBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
// import { toast } from "react-toastify";

const SidebarNav = () => {
  const { resizeSidebar, toggleSidebar } = useDashboardContext();

  // const logoutUser = async () => {
  //   navigate("/");
  //   await customFetch("/auth/logout");
  //   QueryClient.invalidateQueries();
  //   toast.success("You have logged out.");
  // };

  return (
    <aside className={resizeSidebar ? "sidebar" : "sidebar expand-sidebar"}>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li>
            <NavLink className="sidebar-nav-link" to="/dashboard">
              <TbMusicPlus className="sidebar-icon" />
              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                Add Project
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink className="sidebar-nav-link" to="all-projects">
              <PiMicrophoneBold className="sidebar-icon" />
              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                Projects
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink className="sidebar-nav-link" to="profile">
              <FaRegUserCircle className="sidebar-icon" />

              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                Profile
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink className="sidebar-nav-link" to="profile">
              <FaShieldAlt className="sidebar-icon" />

              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                Admin
              </div>
            </NavLink>
          </li>

          <li>
            <button
              className={
                resizeSidebar
                  ? "sidebar-toggle-button"
                  : "sidebar-toggle-button expand-sidebar"
              }
              onClick={toggleSidebar}
            >
              <div className="button-content flex">
                {resizeSidebar ? (
                  <TbLayoutSidebarRightCollapseFilled className="sidebar-icon" />
                ) : (
                  <TbLayoutSidebarLeftCollapseFilled className="sidebar-icon" />
                )}
                <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                  Collapse
                </div>
              </div>
            </button>
          </li>

          {/* <button type="button" className="logout-button">
            <div className="button-content flex">
            <LuLogOut className="sidebar-icon" />
            Log out
            </div>
            </button> */}
        </ul>
      </nav>
    </aside>
  );
};
export default SidebarNav;
