import { Link } from "react-router-dom";
import { Logo } from "../components";

const Footer = () => {
  //Set current copyright year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        <Logo />

        <div className="copyright">
          &copy; <span className="year">{currentYear}</span> Manager by Art
          Design Method.
        </div>

        <div className="footer-text">
          Illustrations created with{" "}
          <Link
            className="copyright-link"
            to="https://www.midjourney.com"
            target="_blank"
          >
            Midjourney
          </Link>{" "}
          and{" "}
          <Link
            className="copyright-link"
            to="https://app.leonardo.ai/"
            target="_blank"
          >
            Leonardo.ai
          </Link>
          .
          <div>
            Animated icon created by{" "}
            <Link
              className="copyright-link"
              to="https://www.flaticon.com/free-animated-icons/done"
              target="_blank"
            >
              Freepik - Flaticon
            </Link>
            .
          </div>
          <div>
            Avatar icon created by{" "}
            <Link
              className="copyright-link"
              to="https://www.flaticon.com/free-icons/self-love"
              target="_blank"
            >
              Bakuh Huda - Flaticon
            </Link>
            .
          </div>
          <div>
            Moon and Stars icons by{" "}
            <Link
              className="copyright-link"
              to="https://icons8.com/icon/0yCmzDVSxZ7O/moon-and-stars"
              target="_blank"
            >
              Icons8
            </Link>
            .
          </div>
        </div>
      </div>

      <nav>
        <ul className="footer-nav-list">
          <li>
            <Link to="login" className="footer-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="register" className="footer-link">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
