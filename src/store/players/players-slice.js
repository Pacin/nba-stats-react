import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: {
    activePage: 1,
    playerList: [],
    totalPages: null,
    isLoading: true,
  },
  reducers: {
    replacePlayers(state, action) {
      state.activePage = action.payload.activePage;
      state.playerList = action.payload.playerList;
      state.totalPages = action.payload.totalPages;
      state.isLoading = action.payload.isLoading;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice;
