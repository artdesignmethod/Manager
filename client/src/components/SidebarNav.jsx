import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

// Icons
import { FaUserCircle, FaShieldAlt } from "react-icons/fa";
import {
  TbLayoutSidebarRightCollapseFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import { HiDocumentPlus, HiDocumentChartBar } from "react-icons/hi2";
import { RiLogoutBoxRFill } from "react-icons/ri";

const SidebarNav = () => {
  const { user, resizeSidebar, toggleSidebar, logoutUser } =
    useDashboardContext();
  const { role } = user;

  return (
    <aside className={resizeSidebar ? "sidebar" : "sidebar expand-sidebar"}>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li>
            <NavLink className="sidebar-nav-link" to="/dashboard">
              <HiDocumentPlus className="sidebar-icon large" />

              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                Add Project
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink className="sidebar-nav-link" to="all-projects">
              <HiDocumentChartBar className="sidebar-icon large" />

              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                Projects
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink className="sidebar-nav-link" to="profile">
              <FaUserCircle className="sidebar-icon" />

              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                My Profile
              </div>
            </NavLink>
          </li>

          {role === "admin" && (
            <li>
              <NavLink className="sidebar-nav-link" to="admin">
                <FaShieldAlt className="sidebar-icon" />

                <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                  Admin
                </div>
              </NavLink>
            </li>
          )}

          <li>
            <button
              type="button"
              className="sidebar-nav-button"
              onClick={logoutUser}
            >
              <div className="button-content flex">
                <RiLogoutBoxRFill className="sidebar-icon large" />

                <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                  Log Out
                </div>
              </div>
            </button>
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
                  <TbLayoutSidebarRightCollapseFilled className="sidebar-icon large" />
                ) : (
                  <TbLayoutSidebarLeftCollapseFilled className="sidebar-icon large" />
                )}
                <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                  Collapse
                </div>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default SidebarNav;
