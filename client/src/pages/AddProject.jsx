import { Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FormRow, FormRowSelect, SubmitButton } from "../components";
import { PROJECT_STATUS } from "../../../root-utils/constants";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/projects", data);

      queryClient.invalidateQueries(["projects"]);

      toast.success("Project added successfully ");

      return redirect("all-projects");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddProject = () => {
  return (
    <div className="dashboard-form-section grid grid-cols-2">
      <div className="dashboard-form-img-container add-project-form-background"></div>

      <Form method="post" className="light-form">
        <h3 className=" heading-tertiary center">Add project</h3>

        <FormRow
          labelText="Project name"
          labelClass="dark-label"
          type="text"
          inputClass="light-input"
          defaultValue="Artistic"
          minLength="1"
          maxLength="18"
          name="projectName"
        />

        <div className="form-input-gap grid grid-cols-2">
          <FormRow
            labelText="Number of days"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            min="1"
            max="365"
            name="projectDays"
            defaultValue="90"
          />

          <FormRow
            labelText="Number of hours"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            min="1"
            max="200"
            name="projectHours"
            defaultValue="40"
          />
        </div>

        <div className="form-input-gap grid grid-cols-2">
          <FormRow
            labelText="Price"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            min="1"
            max="999999999"
            name="projectPrice"
            defaultValue="1000"
          />

          <FormRowSelect
            labelText="Project status"
            name="projectStatus"
            list={Object.values(PROJECT_STATUS)}
            defaultValue={PROJECT_STATUS.SCHEDULED}
          />
        </div>

        <SubmitButton
          className="light-button-grey"
          Submitting="Adding new project"
          Submit="Submit"
        />
      </Form>
    </div>
  );
};
export default AddProject;
