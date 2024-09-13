import { Form, redirect, useOutletContext } from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const avatar = formData.get("avatar");

  if (avatar && avatar.size > 500000) {
    toast.error("Image size limit is 0.5 MB");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);

    toast.success("Profile updated successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();

  const { firstName, lastName, email } = user;

  return (
    <section className="dashboard-form-section grid grid-cols-2">
      <div className="dashboard-form-img-container edit-profile-form-background"></div>

      <div>
        <Form
          method="POST"
          className="flex light-form"
          encType="multipart/form-data"
        >
          <h3 className="heading-tertiary center">My Profile</h3>

          <div className="profile-form-inputs-container">
            <div className="profile-contact-section">
              <div className="form-input-gap grid grid-cols-2">
                <FormRow
                  labelClass="dark-label"
                  labelText="First name"
                  type="text"
                  inputClass="light-input"
                  defaultValue={firstName}
                  name="firstName"
                />

                <FormRow
                  labelClass="dark-label"
                  labelText="Last name"
                  type="text"
                  inputClass="light-input"
                  defaultValue={lastName}
                  name="lastName"
                />
              </div>

              <FormRow
                labelClass="dark-label"
                labelText="Email address"
                type="email"
                inputClass="light-input"
                defaultValue={email}
                name="email"
              />

              <div>
                <label htmlFor="avatar" className="dark-label">
                  Select an image file (max 0.5 MB)
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  className="profile-file-input"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <SubmitButton
            className="light-button-violet"
            Submitting="Updating Profile"
            Submit="Update Profile"
          />
        </Form>
      </div>
    </section>
  );
};
export default Profile;
