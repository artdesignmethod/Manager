import customFetch from "./customFetch.js";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/projects/stats");
    return response.data;
  },
};

export default statsQuery;
