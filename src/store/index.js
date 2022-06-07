import { configureStore } from "@reduxjs/toolkit";

import playersSlice from "./players/players-slice";
import playerSlice from "./player/player-slice";
import teamsSlice from "./teams/teams-slice";
import userSlice from "./user/userSlice";
import uiSlice from "./ui/ui-slice";

const store = configureStore({
  reducer: {
    players: playersSlice.reducer,
    ui: uiSlice.reducer,
    player: playerSlice.reducer,
    teams: teamsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
