import { useDashboardContext } from "../pages/DashboardLayout";
import lightThemeIcon from "../assets/images/sun.png";
import darkThemeIcon from "../assets/images/night.png";

const ThemeToggle = () => {
  const { darkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <div className="theme-toggle" onClick={toggleDarkTheme}>
      {!darkTheme ? (
        <img
          src={lightThemeIcon}
          className="light-theme-icon"
          alt="sun icon, light theme mode"
        />
      ) : (
        <img
          src={darkThemeIcon}
          className="dark-theme-icon"
          alt="star and moon icon, dark theme mode"
        />
      )}
    </div>
  );
};
export default ThemeToggle;
