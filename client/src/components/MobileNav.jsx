import { useState } from "react";
import { FaRegUserCircle, FaShieldAlt } from "react-icons/fa";
import { PiMicrophoneBold } from "react-icons/pi";
import { TbMusicPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
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
              <TbMusicPlus className="mobile-nav-icon" />
              Add Project
            </NavLink>
          </li>

          <li>
            <NavLink
              className="mobile-nav-link"
              to="all-projects"
              onClick={closeNav}
            >
              <PiMicrophoneBold className="mobile-nav-icon" />
              All Projects
            </NavLink>
          </li>

          <li>
            <NavLink
              className="mobile-nav-link"
              to="profile"
              onClick={closeNav}
            >
              <FaRegUserCircle className="mobile-nav-icon" />
              My Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              className="mobile-nav-link"
              to="profile"
              onClick={closeNav}
            >
              <FaShieldAlt className="mobile-nav-icon" />
              Admin
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default MobileNav;
