import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPlayerData,
  fetchPlayerStats,
} from "../../../../store/player/player-actions";
import PlayerDetailTable from "./PlayerDetailTable";
import PlayerDetailGames from "./PlayerDetailGames";
import classes from "./PlayerDetail.module.scss";

//UI
import Pagination from "@mui/material/Pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const PlayerDetail = () => {
  const [perPage, setPerPage] = useState(25);
  const [chosenSeason, setChosenSeason] = useState("1997");
  const [activePage, setActivePage] = useState(1);
  const [postSeason, setPostSeason] = useState(false);

  const player = useSelector((state) => state.player);
  const teams = useSelector((state) => state.teams.teams);

  const location = useLocation();

  const playerInfo = location.state.detail;
  const playerStats = player.playerData.stats;
  const playerGames = player.playerData;

  const playerId = playerInfo.id;

  const dispatch = useDispatch();

  const selectYearsArray = range(currentYear - 1, currentYear - 40, -1);

  useEffect(() => {
    const queryForAvg = `?season=${chosenSeason}&player_ids[]=${playerId}`;
    dispatch(fetchPlayerData(queryForAvg));
  }, [dispatch, chosenSeason, playerId]);

  useEffect(() => {
    const queryForGames = `?seasons[]=${chosenSeason}&player_ids[]=${playerId}&per_page=${perPage}&page=${activePage}&postseason=${postSeason}`;
    dispatch(fetchPlayerStats(queryForGames));
  }, [dispatch, playerId, perPage, activePage, postSeason, chosenSeason]);

  const onYearChange = (event) => {
    setChosenSeason(event.target.value);
  };

  // const onPerPageChange = (event) => {
  //   setPerPage(event.target.value);
  // };

  const onPaginationChange = (event, page) => {
    setActivePage(page);
  };

  const onPostSeasonChange = (event) => {
    setActivePage(1);
    setPostSeason(event.target.checked);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mb-3">
        <div className="d-flex justify-content-center mt-3">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-select-small">Season</InputLabel>
            <Select
              defaultValue={"1997"}
              value={chosenSeason}
              onChange={onYearChange}
              label="Year"
            >
              {selectYearsArray.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year} - {+year + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Card sx={{ maxWidth: "90%", width: "100%", marginTop: "2rem" }}>
          <CardContent>
            <Typography variant="h3" component="div">
              <h3 className="text-center mb-1">
                {playerInfo.first_name} {playerInfo.last_name}
              </h3>
            </Typography>
            <Typography
              gutterBottom
              variant="body3"
              color="text.secondary"
              component="div"
            >
              <p className="text-center">
                {playerInfo.team.abbreviation} ({playerInfo.team.full_name})
              </p>
            </Typography>
            <Typography
              gutterBottom
              variant="body3"
              color="text.secondary"
              component="div"
            >
              <p className="text-center">
                {chosenSeason} - {+chosenSeason + 1} season stats (avg.)
              </p>
            </Typography>

            <Typography variant="body2" color="text.secondary" component="div">
              <div className="d-flex justify-content-between align-items-center mb-2">
                {playerStats && <p>Games played: {playerStats.games_played}</p>}
                {!playerStats && (
                  <p className="text-center">No data found in that year.</p>
                )}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={onPostSeasonChange}
                        checked={postSeason}
                      />
                    }
                    label="Post Season"
                  />
                </FormGroup>
              </div>
            </Typography>
            {playerStats && <PlayerDetailTable stats={playerStats} />}
            <Typography variant="body2" component="div" className="mt-4 mb-2">
              <p className="text-center">Games</p>
              {/* <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  minWidth: 80,
                }}
              >
                <InputLabel id="demo-select-small">Per Page</InputLabel>
                <Select
                  defaultValue={"25"}
                  value={perPage}
                  onChange={onPerPageChange}
                  label="Per Page"
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl> */}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {playerGames && teams && (
                <PlayerDetailGames
                  pages={playerGames.meta}
                  games={playerGames.games}
                  teams={teams}
                  player={playerInfo}
                />
              )}
              {(!playerGames.games || !playerStats) && (
                <p className="text-center">No games found.</p>
              )}
            </Typography>
            <div className={classes.pagination}>
              {playerGames.meta.total_pages > 0 && (
                <Pagination
                  count={playerGames.meta.total_pages}
                  defaultPage={1}
                  shape="rounded"
                  onChange={onPaginationChange}
                  disabled={player.isLoading}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PlayerDetail;
