import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayerDetailTable from "../PlayerDetailTable";

const sortByDate = (arr) => {
  const sortedArray = arr.sort(function (a, b) {
    return a["game"]["date"] > b["game"]["date"]
      ? 1
      : a["game"]["date"] < b["game"]["date"]
      ? -1
      : 0;
  });
  return sortedArray;
};

const PlayerDetailGames = React.memo((props) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {sortByDate([...props.games]).map(
        (game) =>
          game.min && (
            <Accordion
              TransitionProps={{ unmountOnExit: true }}
              key={game.id}
              expanded={expanded === game.id}
              onChange={handleChange(game.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={game.id + "4bh-content"}
                id={game.id + "4bh-header"}
              >
                <div className="d-flex justify-content-sm-around w-100 flex-column flex-sm-row">
                  <div className="d-flex align-items-center">
                    {game.team.id !== game.game_home_team_id &&
                    game.team.id === game.game.visitor_team_id ? (
                      <div className="ml-2">
                        vs @
                        {
                          props.teams.find(
                            (team) => team.id === game.game.home_team_id
                          ).abbreviation
                        }{" "}
                      </div>
                    ) : (
                      <div className="ml-2">
                        vs{" "}
                        {
                          props.teams.find(
                            (team) => team.id === game.game.visitor_team_id
                          ).abbreviation
                        }
                      </div>
                    )}
                    <div className="mx-2 d-flex align-items-center">
                      {game.team.id === game.game.home_team_id ? (
                        game.game.home_team_score >
                        game.game.visitor_team_score ? (
                          <span className="text-bold">
                            {game.game.home_team_score} -{" "}
                            {game.game.visitor_team_score}{" "}
                            <span className="text-green ml-2">(W)</span>
                          </span>
                        ) : (
                          <span>
                            {game.game.home_team_score} -{" "}
                            {game.game.visitor_team_score}{" "}
                            <span className="text-red ml-2">(L)</span>
                          </span>
                        )
                      ) : game.game.home_team_score >
                        game.game.visitor_team_score ? (
                        <span className="text-bold">
                          {game.game.home_team_score} -{" "}
                          {game.game.visitor_team_score}{" "}
                          <span className="text-red ml-2">(L)</span>
                        </span>
                      ) : (
                        <span className="text-bold">
                          {game.game.home_team_score} -{" "}
                          {game.game.visitor_team_score}{" "}
                          <span className="text-green ml-2">(W)</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {new Date(game.game.date).toISOString().slice(0, 10)}
                  </div>
                </div>
              </AccordionSummary>
              {expanded && (
                <AccordionDetails>
                  <PlayerDetailTable
                    stats={{
                      min: game.min,
                      pts: game.pts,
                      ast: game.ast,
                      reb: game.reb,
                      blk: game.blk,
                      dreb: game.dreb,
                      oreb: game.oreb,
                      stl: game.stl,
                      fg3_pct: game.fg3_pct,
                      fg3a: game.fg3a,
                      fg3m: game.fg3m,
                      fg_pct: game.fg_pct,
                      fga: game.fga,
                      fgm: game.fgm,
                      ft_pct: game.ft_pct,
                      fta: game.fta,
                      ftm: game.ftm,
                      turnover: game.turnover,
                      pf: game.pf,
                    }}
                  />
                </AccordionDetails>
              )}
            </Accordion>
          )
      )}
    </>
  );
});

export default PlayerDetailGames;
