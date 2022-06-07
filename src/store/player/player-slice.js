import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playerData: {
      stats: {},
      games: [],
      meta: {},
    },
    isLoading: true,
  },
  reducers: {
    getPlayerSeasonAverage(state, action) {
      state.playerData.stats = action.payload;
    },
    getPlayerGames(state, action) {
      state.playerData.games = action.payload;
    },
    getMeta(state, action) {
      state.playerData.meta = action.payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const playerActions = playerSlice.actions;

export default playerSlice;
