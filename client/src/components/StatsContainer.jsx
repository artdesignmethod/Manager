/* eslint-disable react/prop-types */
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer.js";
import { AiFillSchedule } from "react-icons/ai";
import { SiProgress } from "react-icons/si";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "Scheduled",
      count: defaultStats?.scheduled || 0,
      icon: <AiFillSchedule className="stat-icon" />,
      color: "#fb7185",
      bg: "#fb7185",
    },
    {
      title: "In Production",
      count: defaultStats?.production || 0,
      icon: <SiProgress className="stat-icon" />,
      color: "#3b82f6",
      bg: "#3b82f6",
    },
    {
      title: "Completed",
      count: defaultStats?.completed || 0,
      icon: <FaMoneyCheckDollar className="stat-icon" />,
      color: "#14b8a6",
      bg: "#14b8a6",
    },
  ];

  return (
    <Wrapper className="grid-cols-3">
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
