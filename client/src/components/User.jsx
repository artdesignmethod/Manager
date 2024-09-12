/* eslint-disable react/prop-types */

const User = ({ avatar, name, email, role }) => {
  return (
    <section className="user">
      <div className="user-column">
        <span className="user-label">Name</span>

        <p className="user-name">{name}</p>
      </div>

      <img className="avatar-image" src={avatar} alt="avatar" />

      <div className="user-column">
        <span className="user-label">Email</span>

        <p className="user-email">{email}</p>
      </div>

      <div className="user-column">
        <span className="user-label">Role</span>

        <p className="user-role">{role}</p>
      </div>
    </section>
  );
};
export default User;
