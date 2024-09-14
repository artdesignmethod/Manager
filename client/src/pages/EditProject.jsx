import { useLoaderData, Form, redirect } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitButton } from "../components";
import { PROJECT_STATUS } from "../../../root-utils/constants";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  const id = useLoaderData();

  const {
    data: { project },
  } = useQuery(singleProjectQuery(id));

  return (
    <section className="dashboard-form-section grid grid-cols-2">
      <div className="dashboard-form-img-container edit-project-form-background"></div>

      <Form method="post" className="light-form">
        <h3 className="heading-tertiary center dark">Edit Project</h3>

        <FormRow
          labelText="Project name"
          labelClass="dark-label"
          type="text"
          inputClass="light-input"
          defaultValue={project.projectName}
          name="projectName"
        />

        <div className="col-gap-24 grid grid-cols-2">
          <FormRow
            labelText="Number of days"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            name="projectDays"
            defaultValue={project.projectDays}
          />

          <FormRow
            labelText="Number of hours"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            name="projectHours"
            defaultValue={project.projectHours}
          />
        </div>

        <div className="col-gap-24 grid grid-cols-2">
          <FormRow
            labelText="Price"
            labelClass="dark-label"
            type="number"
            inputClass="light-input"
            name="projectPrice"
            defaultValue={project.projectPrice}
          />

          <FormRowSelect
            labelText="Project status"
            name="projectStatus"
            list={Object.values(PROJECT_STATUS)}
            defaultValue={project.projectStatus}
          />
        </div>

        <SubmitButton
          className="light-button-violet"
          Submitting="Submitting"
          Submit="Submit"
        />
      </Form>
    </section>
  );
};
export default EditProject;
