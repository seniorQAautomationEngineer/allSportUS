import { SportConfig } from '../sportConfigs';

const waterPolo: SportConfig = {
    name: "Water Polo",
    fields: [
      {
        name: "positionMetrics",
        type: "checkbox",
        options: ["General", "FieldPlayers", "Defenders", "Goalkeepers"],
        label: "Position-Specific Metrics",
        conditionalFields: {
          General: [
            {
              name: "gamesPlayed",
              type: "text",
              placeholder: "Enter total games played",
              label: "Games Played",
            },
            {
              name: "totalGoalsScored",
              type: "text",
              placeholder: "Enter total goals scored",
              label: "Total Goals Scored",
            },
            {
              name: "totalAssists",
              type: "text",
              placeholder: "Enter total assists",
              label: "Total Assists",
            },
            {
              name: "totalSteals",
              type: "text",
              placeholder: "Enter total steals",
              label: "Total Steals",
            },
          ],
          FieldPlayers: [
            {
              name: "goalsPerGame",
              type: "text",
              placeholder: "Enter goals per game",
              label: "Goals Per Game",
            },
            {
              name: "assistsPerGame",
              type: "text",
              placeholder: "Enter assists per game",
              label: "Assists Per Game",
            },
            {
              name: "stealsPerGame",
              type: "text",
              placeholder: "Enter steals per game",
              label: "Steals Per Game",
            },
            {
              name: "shootingPercentage",
              type: "text",
              placeholder: "Enter shooting percentage (e.g., 50)",
              label: "Shooting Percentage (Goals/Shots)",
            },
          ],
          Defenders: [
            {
              name: "blocksPerGame",
              type: "text",
              placeholder: "Enter blocks per game",
              label: "Blocks Per Game",
            },
            {
              name: "stealsPerGame",
              type: "text",
              placeholder: "Enter steals per game",
              label: "Steals Per Game",
            },
            {
              name: "passInterceptionRate",
              type: "text",
              placeholder: "Enter pass interception rate (e.g., 30%)",
              label: "Pass Interception Rate (Percentage)",
            },
          ],
          Goalkeepers: [
            {
              name: "savePercentage",
              type: "text",
              placeholder: "Enter save percentage (e.g., 70%)",
              label: "Save Percentage (Saves/Shots on Goal)",
            },
            {
              name: "goalsAllowedPerGame",
              type: "text",
              placeholder: "Enter goals allowed per game",
              label: "Goals Allowed Per Game",
            },
            {
              name: "blocksPerGame",
              type: "text",
              placeholder: "Enter blocks per game",
              label: "Blocks Per Game",
            },
          ],
        },
      },
    ],
  };
  
  export default waterPolo;
  