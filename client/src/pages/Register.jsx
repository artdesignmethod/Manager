import { Link, Form, redirect } from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import { Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);

    toast.success("Account created");

    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <section className="register-section grid grid-cols-2">
      <div className="homepage-form-img-container register-form-background"></div>

      <div className="register-form-container">
        <Form method="POST" className="flex homepage-form">
          <Logo />

          <h3 className="heading-tertiary">Create account</h3>

          <div className="register-form-inputs-container">
            <p className="homepage-form-description">
              Please enter your details to sign up:
            </p>

            <div className="register-contact-section">
              <div className="form-input-gap grid grid-cols-2">
                <FormRow
                  labelText="First name"
                  inputClass="homepage-form-input"
                  type="text"
                  defaultValue="Register"
                  name="firstName"
                />

                <FormRow
                  labelText="Last name"
                  inputClass="homepage-form-input"
                  type="text"
                  defaultValue="Doe"
                  name="lastName"
                />
              </div>

              <FormRow
                labelText="Email address"
                inputClass="homepage-form-input"
                defaultValue="test@example.com"
                type="email"
                name="email"
              />

              <FormRow
                labelText="Password"
                inputClass="homepage-form-input"
                defaultValue="password"
                type="password"
                name="password"
              />
            </div>
          </div>

          <SubmitButton
            className="homepage-form-button password-submit-button"
            Submitting="Creating account"
            Submit="Create account"
          />

          <div className="center">
            <Link to="/login" className="homepage-form-link">
              Already have an account? Sign in
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
};
export default Register;
