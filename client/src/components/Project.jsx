/* eslint-disable react/prop-types */
import { MdNoteAlt } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { Form, Link } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Project = ({
  _id,
  createdAt,
  projectName,
  projectHours,
  projectStatus,
  projectPrice,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <div className="project-card flex">
      <div className="project-text-box">
        <p className="project-card-date">Booked: {date}</p>
        <p className="project-card-label center">{projectName}</p>

        <div className="project-card-group project-card-tag-group flex">
          <p className="project-card-tag">{projectHours}</p>
          <p className="project-card-tag">{projectStatus}</p>
        </div>

        <div className="project-card-group project-card-price-group flex">
          <div>
            <p className="project-card-price">${projectPrice}</p>
          </div>

          <div className="project-icon-group flex">
            <Link to={`../edit-project/${_id}`}>
              <MdNoteAlt className=" project-icon" />
            </Link>

            <Form method="post" action={`../delete-project/${_id}`}>
              <button type="submit" className="project-button">
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
