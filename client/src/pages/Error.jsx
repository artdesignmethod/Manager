import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div>
        <section className="error-section center">
          <div className="error-text-container">
            <h1 className="heading-primary">404</h1>

            <h2 className="heading-secondary">Page not found.</h2>

            <Link to="/dashboard" className="nav-link glass-link">
              Return to Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="error-section center">
        <div className="error-text-container">
          <h2 className="heading-secondary">Something went wrong.</h2>
        </div>
      </section>
    </div>
  );
};
export default Error;
