/* eslint-disable react/prop-types */
import { useAllProjectsContext } from "../pages/AllProjects";
import { Project } from "../components";

// Icons
import { HiDocumentChartBar } from "react-icons/hi2";
import { AiFillSchedule } from "react-icons/ai";
import { SiProgress } from "react-icons/si";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const ProjectsContainer = () => {
  const { data, defaultStats } = useAllProjectsContext();

  const { totalProjects, projects } = data;

  const scheduledProjects = totalProjects > 0 ? defaultStats.scheduled : 0;

  const productionProjects = totalProjects > 0 ? defaultStats.production : 0;

  const completedProjects = totalProjects > 0 ? defaultStats.completed : 0;

  return (
    <section className="project-container">
      <div className="projects-overview-container">
        <div className="overview-group flex">
          <HiDocumentChartBar className="overview-icon" />

          <div className="overview-text-group flex">
            <p className="overview-subhead">
              {totalProjects >= 0 ? totalProjects : 0}
            </p>

            <p className="overview-description">Total projects</p>
          </div>
        </div>

        <div className="overview-group flex">
          <AiFillSchedule className="overview-icon scheduled" />

          <div className="overview-text-group flex">
            <p className="overview-subhead">
              {scheduledProjects >= 0 ? scheduledProjects : 0}
            </p>

            <p className="overview-description">Scheduled</p>
          </div>
        </div>

        <div className="overview-group flex">
          <SiProgress className="overview-icon production" />

          <div className="overview-text-group flex">
            <p className="overview-subhead">
              {productionProjects >= 0 ? productionProjects : 0}
            </p>

            <p className="overview-description">In Production</p>
          </div>
        </div>

        <div className="overview-group flex">
          <FaMoneyCheckDollar className="overview-icon completed" />

          <div className="overview-text-group flex">
            <p className="overview-subhead">
              {completedProjects >= 0 ? completedProjects : 0}
            </p>

            <p className="overview-description">Completed</p>
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
