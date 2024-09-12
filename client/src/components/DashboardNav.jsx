import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import defaultAvatar from "../assets/images/avatar.png";
import ThemeToggle from "./ThemeToggle";

// Icons
import { FaUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";

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
              {user.avatar ? (
                <img src={user.avatar} className="avatar-image" alt="avatar" />
              ) : (
                <img
                  src={defaultAvatar}
                  className="avatar-image"
                  alt="avatar"
                />
              )}
              <p className="avatar-name">{user?.firstName}</p>
            </div>
          </button>
        </li>
      </ul>

      <div
        className={showDropdown ? "nav-dropdown show-dropdown" : "nav-dropdown"}
        onMouseLeave={closeDropdown}
      >
        <NavLink className="dropdown-link" to="profile" onClick={closeDropdown}>
          <FaUserCircle className="sidebar-icon" />
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
