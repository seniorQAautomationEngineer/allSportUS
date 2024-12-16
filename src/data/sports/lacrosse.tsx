import { SportConfig } from '../sportConfigs';

const lacrosse: SportConfig = {
    name: "La Crosse",
    fields: [
      {
        name: "Games Played",
        type: "text",
        placeholder: "Enter total games played",
        label: "Games Played",
      },
      {
        name: "Total Goals",
        type: "text",
        placeholder: "Enter total goals scored",
        label: "Total Goals",
      },
      {
        name: "Total Assists",
        type: "text",
        placeholder: "Enter total assists",
        label: "Total Assists",
      },
      {
        name: "positionMetrics",
        type: "checkbox",
        options: ["Attackers", "Midfielders", "Defenders", "Goalies"],
        label: "Position-Specific Metrics",
        conditionalFields: {
          Attackers: [
            {
              name: "Goals Per Game",
              type: "text",
              placeholder: "Enter goals per game",
              label: "Goals Per Game",
            },
            {
              name: "Assists Per Game",
              type: "text",
              placeholder: "Enter assists per game",
              label: "Assists Per Game",
            },
            {
              name: "Shooting Accuracy",
              type: "text",
              placeholder: "Enter shooting accuracy (e.g., 60%)",
              label: "Shooting Accuracy (Percentage)",
            },
          ],
          Midfielders: [
            {
              name: "Ground Balls Per Game",
              type: "text",
              placeholder: "Enter ground balls per game",
              label: "Ground Balls Per Game",
            },
            {
              name: "Transition Speed",
              type: "text",
              placeholder: "Enter transition speed (seconds)",
              label: "Transition Speed (Seconds)",
            },
          ],
          Defenders: [
            {
              name: "Ground Balls Per Game",
              type: "text",
              placeholder: "Enter ground balls per game",
              label: "Ground Balls Per Game",
            },
            {
              name: "Clearing Success Rate",
              type: "text",
              placeholder: "Enter clearing success rate",
              label: "Clearing Success Rate",
            },
          ],
          Goalies: [
            {
              name: "Save Percentage",
              type: "text",
              placeholder: "Enter save percentage",
              label: "Save Percentage",
            },
            {
              name: "Goals Allowed Per Game",
              type: "text",
              placeholder: "Enter goals allowed per game",
              label: "Goals Allowed Per Game",
            },
          ],
        },
      },
    ],
  };
  
  export default lacrosse;
  