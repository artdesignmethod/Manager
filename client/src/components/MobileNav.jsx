import { useState } from "react";
import { NavLink } from "react-router-dom";

// Icons
import { FaUserCircle, FaShieldAlt } from "react-icons/fa";
import { HiDocumentPlus, HiDocumentChartBar } from "react-icons/hi2";
import { useDashboardContext } from "../pages/DashboardLayout";

const MobileNav = () => {
  const { user } = useDashboardContext();
  const { role } = user;

  const [mobileBtnClass, setMobileBtnClass] = useState("btn-mobile-nav");

  const [iconClass, setIconClass] = useState("bar mobileNavClosed");

  const [mobileNavClass, setMobileNavClass] = useState("mobile-nav hidden");

  const [toggleNav, setToggleNav] = useState(false);

  function handleClick() {
    if (!toggleNav) {
      setIconClass("bar mobileNavOpen fixed");
      setMobileBtnClass("btn-mobile-nav fixed");
      setMobileNavClass("mobile-nav openNav");
    } else {
      setIconClass("bar mobileNavClosed");
      setMobileBtnClass("btn-mobile-nav");
      setMobileNavClass("mobile-nav hidden");
    }

    setToggleNav(!toggleNav);
  }

  function closeNav() {
    setToggleNav(false);
    setIconClass("bar mobileNavClosed");
    setMobileBtnClass("btn-mobile-nav");
    setMobileNavClass("mobile-nav hidden");
  }

  return (
    <div>
      <button
        className={mobileBtnClass}
        onClick={handleClick}
        role="button"
        aria-label="Click to open menu"
      >
        <div className={iconClass}></div>
        <div className={iconClass}></div>
        <div className={iconClass}></div>
      </button>

      <nav className={mobileNavClass}>
        <ul className="mobile-nav-list">
          <li>
            <NavLink
              className="mobile-nav-link"
              to="/dashboard"
              onClick={closeNav}
            >
              <HiDocumentPlus className="mobile-nav-link-icon" />
              Add Project
            </NavLink>
          </li>

          <li>
            <NavLink
              className="mobile-nav-link"
              to="all-projects"
              onClick={closeNav}
            >
              <HiDocumentChartBar className="mobile-nav-link-icon" />
              All Projects
            </NavLink>
          </li>

          <li>
            <NavLink
              className="mobile-nav-link"
              to="profile"
              onClick={closeNav}
            >
              <FaUserCircle className="mobile-nav-link-icon" />
              My Profile
            </NavLink>
          </li>

          {role === "admin" && (
            <li>
              <NavLink
                className="mobile-nav-link"
                to="admin"
                onClick={closeNav}
              >
                <FaShieldAlt className="mobile-nav-link-icon" />
                Admin
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default MobileNav;
