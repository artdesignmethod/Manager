import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1 className="heading-primary">
          From start <br /> to finish
        </h1>

        <p className="hero-description">
          Creating a smooth project <br /> management experience
        </p>

        <ul className="hero-nav">
          <li>
            <Link to="login" className="nav-link violet-glass-link">
              Log In
            </Link>
          </li>

          <li>
            <Link to="register" className="nav-link blue-glass-link">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default Hero;
