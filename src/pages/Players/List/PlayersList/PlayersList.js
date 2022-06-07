import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayersData } from "../../../../store/players/players-actions";

// UI
import PlayerTable from "./PlayersTable/PlayersTable";
import classes from "./PlayersList.module.scss";
import Input from "@mui/material/Input";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";

const PlayersList = (props) => {
  const players = useSelector((state) => state.players);
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const query = `?page=${activePage}${perPage ? `&per_page=${perPage}` : ""}${
      search ? `&search=${search}` : ""
    }`;

    if (search.length > 0) {
      // when search occurs if activePage isn't the first page, search fails.
      // to prevent that from happening, must set activePage to 1 everytime
      // right before search.
      const activePageTimer = setTimeout(() => {
        setActivePage(1);
      }, 100);

      const timer = setTimeout(() => {
        dispatch(fetchPlayersData(query));
      }, 350);

      return () => {
        clearTimeout(activePageTimer);
        clearTimeout(timer);
      };
    }

    dispatch(fetchPlayersData(query));
  }, [dispatch, activePage, perPage, search]);

  const perPageChange = (event) => {
    setPerPage(+event.target.value);
  };

  const onSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  const onPaginationChange = (event, page) => {
    setActivePage(page);
  };

  return (
    <div className={classes["players-list"]}>
      <div className={classes["top-wrapper"]}>
        <Input
          placeholder="Search for names"
          onChange={onSearchHandler}
          value={search}
        />
        <div className={classes.select}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-select-small">Per Page</InputLabel>
            <Select defaultValue="25" onChange={perPageChange} label="Per Page">
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes["players-list__table"]}>
        {!players.isLoading && <PlayerTable playerList={players.playerList} />}
        {players.isLoading && (
          <div className="d-flex justify-content-center align-items-center h-100">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
      <div className={classes.pagination}>
        {players.totalPages && (
          <Pagination
            count={players.totalPages}
            defaultPage={1}
            shape="rounded"
            page={players.activePage}
            onChange={onPaginationChange}
            disabled={players.isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default PlayersList;
