// import { playersActions } from "./players-slice";
import { playersActions } from "./players-slice";

const baseURL = "https://www.balldontlie.io/api/v1";

export const fetchPlayersData = (query) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`${baseURL}/players${query ? query : ""}`);

      if (!res.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await res.json();
      return data;
    };

    try {
      dispatch(playersActions.startLoading());
      const playersData = await fetchData();
      dispatch(
        playersActions.replacePlayers({
          activePage: playersData.meta.current_page || null,
          totalPages: playersData.meta.total_pages || null,
          playerList: playersData.data || [],
        })
      );
      dispatch(playersActions.stopLoading());
    } catch {
      dispatch(playersActions.stopLoading());
    }
  };
};
