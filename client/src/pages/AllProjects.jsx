/* eslint-disable react/prop-types */

import { toast } from "react-toastify";
import { SearchContainer, ProjectsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/projects");
    const { data: statData } = await customFetch.get("/projects/stats");

    return {
      data,
      statData,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllProjectsContext = createContext();

const AllProjects = () => {
  const { data, statData } = useLoaderData();
  const { defaultStats } = statData;

  return (
    <AllProjectsContext.Provider value={{ data, defaultStats }}>
      <SearchContainer />
      <ProjectsContainer />
    </AllProjectsContext.Provider>
  );
};

export const useAllProjectsContext = () => useContext(AllProjectsContext);

export default AllProjects;
