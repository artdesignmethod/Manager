import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import statsQuery from "../utils/statsQuery.js";

export const loader = (queryClient) => async () => {
  // eslint-disable-next-line no-unused-vars
  const data = await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);

  const { defaultStats, monthlyProjects } = data;

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
