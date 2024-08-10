import { useDashboardContext } from "../pages/DashboardLayout";
import lightThemeIcon from "../assets/images/sun.png";
import darkThemeIcon from "../assets/images/night.png";

const ThemeToggle = () => {
  const { darkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <div className="theme-toggle-container" onClick={toggleDarkTheme}>
      <img
        src={!darkTheme ? lightThemeIcon : darkThemeIcon}
        className="theme-icon"
        alt="afternoon and evening icons"
      />
    </div>
  );
};
export default ThemeToggle;
