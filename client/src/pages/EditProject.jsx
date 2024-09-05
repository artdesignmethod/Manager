import { FormRow, FormRowSelect, SubmitButton } from "../components";
// import { useLoaderData, Form, redirect } from "react-router-dom";
import { PROJECT_STATUS } from "../../../root-utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Form, redirect } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

const singleProjectQuery = (id) => {
  return {
    queryKey: ["project", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/projects/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleProjectQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-projects");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/projects/${params.id}`, data);
      queryClient.invalidateQueries(["projects"]);

      toast.success("Project edited successfully");
      return redirect("/dashboard/all-projects");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditProject = () => {
  const project = {}; // Temporary

  // const id = useLoaderData();
  // const {
  //   data: { project },
  // } = useQuery(singleProjectQuery(id));

  return (
    <div className="dashboard-form-section grid grid-cols-2">
      <div className="dashboard-form-img-container edit-project-form-background"></div>

      <Form method="post" className="light-form">
        <h3 className="center heading-tertiary dark">Edit Project</h3>

        <div className="form-input-gap grid grid-cols-2">
          <FormRow
            labelText="Project name"
            labelClass="dark-label"
            type="text"
            inputClass="light-input"
            defaultValue={project.projectName}
            minLength="1"
            maxLength="18"
            name="projectName"
          />

          <FormRowSelect
            labelText="Project status"
            name="projectStatus"
            list={Object.values(PROJECT_STATUS)}
            defaultValue={project.projectStatus}
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
            defaultValue={project.projectHours}
          />

          <FormRow
            labelText="Price"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            min="1"
            max="999999999"
            name="projectPrice"
            defaultValue={project.projectPrice}
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
export default EditProject;
