import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import User from "../components/User";
import defaultAvatar from "../assets/images/avatar.png";

// Icons
import { FaUserCircle } from "react-icons/fa";
import { HiDocumentChartBar } from "react-icons/hi2";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You aren't authorized to view this page.");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, projects, allUsers } = useLoaderData();

  return (
    <section className="admin-section">
      <h3 className="heading-tertiary center dark">Admin Overview</h3>

      <div className="admin-overview-container grid grid-cols-3">
        <div className="admin-overview-group">
          <FaUserCircle className="admin-users-icon admin-overview-icon" />

          <div className="admin-overview-header">
            <p className="admin-overview-description">Total Users</p>

            <p className="admin-overview-subhead">{users >= 0 ? users : 0}</p>
          </div>
        </div>

        <div className="admin-overview-group">
          <HiDocumentChartBar className="admin-overview-icon admin-projects-icon" />

          <div className="admin-overview-header">
            <p className="admin-overview-description">Total Projects</p>

            <p className="admin-overview-subhead">
              {projects >= 0 ? projects : 0}
            </p>
          </div>
        </div>
      </div>

      <h3 className="heading-tertiary center dark">Users</h3>

      <div className="users-container grid grid-cols-3 gap-24">
        {allUsers.map((user, i) => {
          return (
            <User
              key={i}
              avatar={user.avatar || defaultAvatar}
              name={`${user.firstName} ${user.lastName}`}
              email={user.email}
              role={user.role}
            />
          );
        })}
      </div>
    </section>
  );
};
export default Admin;
