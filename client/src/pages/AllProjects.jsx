/* eslint-disable react/prop-types */

import { ProjectsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import statsQuery from "../utils/statsQuery.js";

const allProjectsQuery = (params) => {
  const { search, projectStatus, sort, page } = params;
  return {
    queryKey: [
      "projects",
      search ?? "",
      projectStatus ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/projects", {
        params,
      });

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allProjectsQuery(params));

    const statData = await queryClient.ensureQueryData(statsQuery);

    return { statData, searchValues: { ...params } };
  };

const AllProjectsContext = createContext();

const AllProjects = () => {
  const { searchValues } = useLoaderData();

  const { data } = useQuery(allProjectsQuery(searchValues));

  const { data: statData } = useQuery(statsQuery);

  const { defaultStats } = statData;

  return (
    <AllProjectsContext.Provider value={{ data, defaultStats, searchValues }}>
      <SearchContainer />
      <ProjectsContainer />
    </AllProjectsContext.Provider>
  );
};

export const useAllProjectsContext = () => useContext(AllProjectsContext);

export default AllProjects;
