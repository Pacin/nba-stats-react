import { playerActions } from "./player-slice";

const baseURL = "https://www.balldontlie.io/api/v1";

export const fetchPlayerData = (query) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        `${baseURL}/season_averages${query ? query : ""}`
      );

      if (!res.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await res.json();
      return data;
    };

    try {
      dispatch(playerActions.startLoading());
      const playerData = await fetchData();
      dispatch(playerActions.getPlayerSeasonAverage(...playerData.data));
      dispatch(playerActions.stopLoading());
    } catch {
      dispatch(playerActions.stopLoading());
    }
  };
};

export const fetchPlayerStats = (query) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`${baseURL}/stats${query ? query : ""}`);

      if (!res.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await res.json();
      return data;
    };

    try {
      dispatch(playerActions.startLoading());
      const playerData = await fetchData();

      dispatch(playerActions.getPlayerGames(playerData.data));
      dispatch(playerActions.getMeta(playerData.meta));
      dispatch(playerActions.stopLoading());
    } catch {
      dispatch(playerActions.stopLoading());
    }
  };
};
