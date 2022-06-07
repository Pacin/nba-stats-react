import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PlayerDetailTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">min</TableCell>
            <TableCell align="center">pts</TableCell>
            <TableCell align="center">ast</TableCell>
            <TableCell align="center">reb</TableCell>
            <TableCell align="center">blk</TableCell>
            <TableCell align="center">dreb</TableCell>
            <TableCell align="center">oreb</TableCell>
            <TableCell align="center">stl</TableCell>
            <TableCell align="center">fg3%</TableCell>
            <TableCell align="center">fg3a</TableCell>
            <TableCell align="center">fg3m</TableCell>
            <TableCell align="center">fg%</TableCell>
            <TableCell align="center">fga</TableCell>
            <TableCell align="center">fgm</TableCell>
            <TableCell align="center">ft%</TableCell>
            <TableCell align="center">fta</TableCell>
            <TableCell align="center">ftm</TableCell>
            <TableCell align="center">to</TableCell>
            <TableCell align="center">pf</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{props.stats.min}</TableCell>
            <TableCell align="center">{props.stats.pts}</TableCell>
            <TableCell align="center">{props.stats.ast}</TableCell>
            <TableCell align="center">{props.stats.reb}</TableCell>
            <TableCell align="center">{props.stats.blk}</TableCell>
            <TableCell align="center">{props.stats.dreb}</TableCell>
            <TableCell align="center">{props.stats.oreb}</TableCell>
            <TableCell align="center">{props.stats.stl}</TableCell>
            <TableCell align="center">{props.stats.fg3_pct}</TableCell>
            <TableCell align="center">{props.stats.fg3a}</TableCell>
            <TableCell align="center">{props.stats.fg3m}</TableCell>
            <TableCell align="center">{props.stats.fg_pct}</TableCell>
            <TableCell align="center">{props.stats.fga}</TableCell>
            <TableCell align="center">{props.stats.fgm}</TableCell>
            <TableCell align="center">{props.stats.ft_pct}</TableCell>
            <TableCell align="center">{props.stats.fta}</TableCell>
            <TableCell align="center">{props.stats.ftm}</TableCell>
            <TableCell align="center">{props.stats.turnover}</TableCell>
            <TableCell align="center">{props.stats.pf}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerDetailTable;
