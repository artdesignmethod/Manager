/* eslint-disable react/prop-types */
import { useAllProjectsContext } from "../pages/AllProjects";
import { MdQueueMusic } from "react-icons/md";
import { Project } from "../components";

const ProjectsContainer = ({ totalProjects }) => {
  const { data } = useAllProjectsContext();

  const { projects } = data;

  return (
    <section className="project-container">
      <div className="projects-overview-container">
        <div className="overview-group flex">
          <MdQueueMusic className="overview-icon" />

          <div className="overview-text-group flex">
            <p className="overview-subhead">
              {totalProjects >= 0 ? totalProjects : 0}
            </p>

            <p className="overview-description">Total projects</p>
          </div>
        </div>
      </div>

      <p className="projects-section-heading">Projects</p>

      <div className="projects-container grid grid-cols-4">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>

      {/* {numOfPages > 1 && <PaginationContainer />} */}
    </section>
  );
};
export default ProjectsContainer;
