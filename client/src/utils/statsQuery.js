import customFetch from "./customFetch.js";

export const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/projects/stats");
    return response.data;
  },
};
