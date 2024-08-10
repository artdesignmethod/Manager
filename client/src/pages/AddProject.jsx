import { Form, redirect } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitButton } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { PROJECT_STATUS } from "../../../root-utils/constants";

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
      <div className="dashboard-form-img-container project-form-background"></div>

      <Form method="post" className="light-form">
        <h3 className=" heading-tertiary">Add new project</h3>

        <div className="form-input-gap grid grid-cols-2">
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

          <FormRowSelect
            labelText="Project status"
            name="projectStatus"
            list={Object.values(PROJECT_STATUS)}
            defaultValue={PROJECT_STATUS.SCHEDULED}
          />
        </div>

        <div className="form-input-gap grid grid-cols-2">
          <FormRow
            labelText="Production hours"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            min="1"
            max="200"
            name="projectHours"
            defaultValue="40"
          />

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
        </div>

        <SubmitButton
          className="light-form-button"
          Submitting="Adding new project"
          Submit="Submit"
        />
      </Form>
    </div>
  );
};
export default AddProject;
