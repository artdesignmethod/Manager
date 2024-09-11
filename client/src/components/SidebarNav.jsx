import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

// Icons
import { FaUserCircle, FaShieldAlt } from "react-icons/fa";
import {
  TbLayoutSidebarRightCollapseFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import { HiDocumentPlus, HiDocumentChartBar } from "react-icons/hi2";

const SidebarNav = () => {
  const { resizeSidebar, toggleSidebar } = useDashboardContext();

  return (
    <aside className={resizeSidebar ? "sidebar" : "sidebar expand-sidebar"}>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li>
            <NavLink className="sidebar-nav-link" to="/dashboard">
              <HiDocumentPlus className="sidebar-icon" />

              <div className={resizeSidebar ? "hide-sidebar-text" : ""}>
                Add Project
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink className="sidebar-nav-link" to="all-projects">
              <HiDocumentChartBar className="sidebar-icon" />

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
          <li>
            <NavLink className="sidebar-nav-link" to="admin">
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
