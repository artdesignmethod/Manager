import { FaRegUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
import { useDashboardContext } from "../pages/DashboardLayout";
import ThemeToggle from "./ThemeToggle";

const DashboardNav = () => {
  const {
    user,
    logoutUser,
    showDropdown,
    toggleDropdown,
    openDropdown,
    closeDropdown,
  } = useDashboardContext();

  return (
    <nav className="dashboard-nav">
      <Logo />

      <ul className="dashboard-nav-list">
        <li>
          <ThemeToggle />
        </li>

        <li>
          <button
            type="button"
            className="avatar-button"
            onMouseEnter={openDropdown}
            onClick={toggleDropdown}
          >
            <div className="button-content flex">
              <img src={avatar} className="avatar-image" alt="avatar image" />
              {/* <FaRegUserCircle className="sidebar-icon" />
              Username */}
              {user?.name}
            </div>
          </button>
        </li>
      </ul>

      <div
        className={showDropdown ? "nav-dropdown show-dropdown" : "nav-dropdown"}
        onMouseLeave={closeDropdown}
      >
        <NavLink className="dropdown-link" to="profile" onClick={closeDropdown}>
          <FaRegUserCircle className="sidebar-icon" />
          My Profile
        </NavLink>

        <button type="button" className="logout-button" onClick={logoutUser}>
          <div className="button-content flex">
            <LuLogOut className="sidebar-icon" />
            Log out
          </div>
        </button>
      </div>
    </nav>
  );
};
export default DashboardNav;
