import { FormRow, FormRowSelect } from ".";
import { Form, useSubmit, Link } from "react-router-dom";
import { PROJECT_STATUS, PROJECT_SORT_BY } from "../../../root-utils/constants";
// import { useAllProjectsContext } from "../pages/AllProjects";

const SearchContainer = () => {
  // const { searchValues } = useAllProjectsContext();
  // const { search, projectStatus, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <div className="search-container">
      <Form className="light-form">
        <p className="search-heading">Search for a project</p>
        <div className="grid grid-cols-3 form-input-gap">
          <FormRow
            name="project-name"
            labelText="Name"
            labelClass="dark-label"
            type="search"
            inputClass="light-input"
            // defaultValue={search}
            placeholder="Search for a project"
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="Status"
            name="projectStatus"
            list={["all", ...Object.values(PROJECT_STATUS)]}
            // defaultValue={projectStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText="Sort by"
            name="sort"
            // defaultValue={sort}
            list={[...Object.values(PROJECT_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>

        <Link to="/dashboard/all-projects" className="light-button-violet">
          Clear filters
        </Link>
      </Form>
    </div>
  );
};
export default SearchContainer;
