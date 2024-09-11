/* eslint-disable react/prop-types */
import { Form, Link } from "react-router-dom";

// ICONS
import { HiCalendarDays } from "react-icons/hi2";
import { LuClock4 } from "react-icons/lu";
import { MdNoteAlt } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { AiFillSchedule } from "react-icons/ai";
import { SiProgress } from "react-icons/si";
import { FaMoneyCheckDollar } from "react-icons/fa6";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Project = ({
  _id,
  createdAt,
  projectName,
  projectDays,
  projectHours,
  projectStatus,
  projectPrice,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const randomImage = "https://picsum.photos/200";
  const randomNumber = Math.random() * 300;

  return (
    <div className="project-card">
      <img
        src={`${randomImage}?${randomNumber}`}
        alt="random image"
        className="project-img"
      />

      <div className="project-text-box">
        <p className="project-card-label center">{projectName}</p>
        <p className="project-card-date">{date}</p>
        <div className="project-card-group flex">
          <p className="project-length">
            <HiCalendarDays className="project-length-icon" />

            {projectDays > 1 ? `${projectDays} days` : `${projectDays} day`}
          </p>
          <p className="project-length">
            <LuClock4 className="project-length-icon" />
            {projectHours > 1
              ? `${projectHours} hours`
              : `${projectHours} hour`}
          </p>
        </div>
        <p className={`project-card-status ${projectStatus}`}>
          {projectStatus === "scheduled" ? (
            <AiFillSchedule className="project-status-icon scheduled" />
          ) : projectStatus === "production" ? (
            <SiProgress className="project-status-icon production" />
          ) : (
            <FaMoneyCheckDollar className="project-status-icon completed" />
          )}

          {projectStatus}
        </p>{" "}
        <div className="project-card-group project-card-price-group flex">
          <div>
            <p className="project-card-price">${projectPrice}</p>
          </div>

          <div className="project-icon-group flex">
            <Link
              to={`../edit-project/${_id}`}
              aria-label="edit project button"
            >
              <MdNoteAlt className=" project-icon" />
            </Link>

            <Form method="post" action={`../delete-project/${_id}`}>
              <button
                type="submit"
                className="delete-project-button"
                aria-label="delete project button"
              >
                <IoTrash className=" project-icon" />
              </button>
            </Form>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};
export default Project;
