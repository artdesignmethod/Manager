import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/projects/${params.id}`);

      queryClient.invalidateQueries(["projects"]);

      toast.success("Project deleted");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }

    return redirect("/dashboard/all-projects");
  };
