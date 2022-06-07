import { teamsActions } from "./teams-slice";

const baseURL = "https://www.balldontlie.io/api/v1";

export const fetchTeams = (query) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`${baseURL}/teams${query ? query : ""}`);

      if (!res.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await res.json();
      return data;
    };

    try {
      dispatch(teamsActions.startLoading());
      const teams = await fetchData();
      dispatch(teamsActions.getTeams(teams.data));
      dispatch(teamsActions.stopLoading());
    } catch {
      dispatch(teamsActions.stopLoading());
    }
  };
};
