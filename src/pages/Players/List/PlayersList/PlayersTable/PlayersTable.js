import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import classes from "./PlayersTable.module.scss";

const sortTeam = (arr, orderBy) => {
  switch (orderBy) {
    case "asc":
    default:
      return [...arr].sort((a, b) =>
        a.team["id"] > b.team["id"] ? 1 : b.team["id"] > a.team["id"] ? -1 : 0
      );
    case "desc":
      return [...arr].sort((a, b) =>
        a.team["id"] < b.team["id"] ? 1 : b.team["id"] < a.team["id"] ? -1 : 0
      );
  }
};

const sortPosition = (arr, orderBy) => {
  switch (orderBy) {
    case "asc":
    default:
      return [...arr].sort((a, b) =>
        a.position > b.position ? 1 : b.position > a.position ? -1 : 0
      );
    case "desc":
      return [...arr].sort((a, b) =>
        a.position < b.position ? 1 : b.position < a.position ? -1 : 0
      );
  }
};

const PlayerTable = (props) => {
  const [rowData, setRowData] = useState();
  const [orderTeamDirection, setOrderTeamDirection] = useState("asc");
  const [orderPositionDirection, setOrderPositionDirection] = useState("asc");
  const history = useHistory();

  useEffect(() => {
    setRowData(props.playerList);
  }, [props.playerList]);

  const handleSortTeamRequest = useCallback(() => {
    setRowData(sortTeam(props.playerList, orderTeamDirection));
    setOrderTeamDirection(orderTeamDirection === "asc" ? "desc" : "asc");
  }, [props.playerList, orderTeamDirection]);

  const handleSortPositionRequest = useCallback(() => {
    setRowData(sortPosition(props.playerList, orderPositionDirection));
    setOrderPositionDirection(
      orderPositionDirection === "asc" ? "desc" : "asc"
    );
  }, [props.playerList, orderPositionDirection]);

  const onClickTableRow = (player) => {
    history.push({
      pathname: `/players/${player.id}`,
      state: { detail: player },
    });
  };

  return (
    <div className={classes["table-container"]}>
      <TableContainer component={Paper} sx={{ height: "73vh" }}>
        <Table aria-label="simple table" stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell align="left">#</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  direction={orderPositionDirection}
                  active={true}
                  onClick={handleSortPositionRequest}
                >
                  Position
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  direction={orderTeamDirection}
                  active={true}
                  onClick={handleSortTeamRequest}
                >
                  Team
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData &&
              rowData.map((player, index) => (
                <TableRow
                  key={player.id}
                  onClick={(e) => onClickTableRow(player)}
                  sx={{ cursor: "pointer" }}
                  hover
                >
                  <TableCell>{player.id}</TableCell>
                  <TableCell align="right">{player.first_name}</TableCell>
                  <TableCell align="right">{player.last_name}</TableCell>
                  <TableCell align="right">{player.position}</TableCell>
                  <TableCell align="right">{player.team.full_name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayerTable;
