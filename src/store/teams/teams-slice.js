import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    isLoading: true,
  },
  reducers: {
    getTeams(state, action) {
      state.teams = action.payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const teamsActions = teamsSlice.actions;

export default teamsSlice;
