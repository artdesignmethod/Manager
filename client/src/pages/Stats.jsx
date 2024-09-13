import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { ChartsContainer, StatsContainer } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/projects/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyProjects } = useLoaderData();

  return (
    <div>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyProjects?.length > 1 && (
        <ChartsContainer data={monthlyProjects} />
      )}
    </div>
  );
};
export default Stats;
