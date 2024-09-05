/* eslint-disable react/prop-types */
import Wrapper from "../assets/wrappers/StatItem.js";

const StatItem = ({ title, count, icon, color, bg }) => {
  return (
    <Wrapper color={color} bg={bg}>
      <span className="stat-icon">{icon}</span>
      <header className="stat-header">
        <span className="title">{title}</span>
        <span className="count">{count}</span>
      </header>
    </Wrapper>
  );
};
export default StatItem;
