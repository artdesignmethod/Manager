import { NavLink } from "react-router-dom";
import logo from "../assets/images/task.gif";

const Logo = () => {
  return (
    <div className="logo-container">
      <NavLink className="logo-link" to="/">
        <div>
          <img className="logo" src={logo} alt="Logo" />
        </div>

        <p>Manager</p>
      </NavLink>
    </div>
  );
};
export default Logo;
