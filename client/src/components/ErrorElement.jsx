import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return <h2 className="heading-secondary">Something went wrong.</h2>;
};
export default ErrorElement;
