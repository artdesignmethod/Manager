import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import { Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();

  const loginGuestUser = async () => {
    const data = {
      email: "guest@example.com",
      password: "guestlogin123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Logged in as guest");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <section className="login-section grid grid-cols-2">
      <div className="homepage-form-img-container login-form-background"></div>

      <Form method="post" className="flex homepage-form">
        <Logo />

        <h3 className="heading-tertiary">Welcome back</h3>

        <div className="login-form-inputs-container">
          <p className="homepage-form-description">
            Please enter your details below to sign in:
          </p>

          <div className="login-contact-section">
            <FormRow
              labelText="Your email address"
              inputClass="homepage-form-input"
              type="email"
              defaultValue="test@example.com"
              minLength="5"
              name="email"
            />

            <FormRow
              labelText="Your password"
              inputClass="homepage-form-input"
              defaultValue="password"
              type="password"
              minLength="8"
              maxLength="16"
              name="password"
            />
          </div>
        </div>

        <div className="form-col">
          <SubmitButton
            className="homepage-form-button password-submit-button"
            Submitting="Signing in"
            Submit="Sign in"
          />

          <button
            type="button"
            className="homepage-form-button guest-login-button"
            onClick={loginGuestUser}
          >
            Explore as guest
          </button>
        </div>

        <div className="center">
          <Link to="/register" className="homepage-form-link">
            Create new account
          </Link>
        </div>
      </Form>
    </section>
  );
};
export default Login;
