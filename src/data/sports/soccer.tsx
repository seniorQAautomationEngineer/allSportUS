import { SportConfig } from '../sportConfigs';


const soccer: SportConfig = {
    name: "Soccer",
    fields: [
      {
        name: "Games Played",
        type: "text",
        placeholder: "Enter total games played",
        label: "Games Played",
      },
      {
        name: "Total Goals Scored",
        type: "text",
        placeholder: "Enter total goals scored",
        label: "Total Goals Scored",
      },
      {
        name: "Total Assists",
        type: "text",
        placeholder: "Enter total assists",
        label: "Total Assists",
      },
      {
        name: "Total Tackles",
        type: "text",
        placeholder: "Enter total tackles",
        label: "Total Tackles",
      },
      {
        name: "positionMetrics",
        type: "checkbox",
        options: ["Forwards", "Midfielders", "Defenders", "Goalkeepers"],
        label: "Position-Specific Metrics",
        conditionalFields: {
          Forwards: [
            {
              name: "Goals Per Game",
              type: "text",
              placeholder: "Enter goals per game",
              label: "Goals Per Game",
            },
            {
              name: "Shots on Target Percentage",
              type: "text",
              placeholder: "Enter shots on target percentage",
              label: "Shots on Target Percentage",
            },
            {
              name: "Assists Per Game",
              type: "text",
              placeholder: "Enter assists per game",
              label: "Assists Per Game",
            },
          ],
          Midfielders: [
            {
              name: "Pass Accuracy Percentage",
              type: "text",
              placeholder: "Enter pass accuracy percentage",
              label: "Pass Accuracy Percentage",
            },
            {
              name: "Assists Per Game",
              type: "text",
              placeholder: "Enter assists per game",
              label: "Assists Per Game",
            },
            {
              name: "Tackles Per Game",
              type: "text",
              placeholder: "Enter tackles per game",
              label: "Tackles Per Game",
            },
          ],
          Defenders: [
            {
              name: "Tackles Per Game",
              type: "text",
              placeholder: "Enter tackles per game",
              label: "Tackles Per Game",
            },
            {
              name: "Clearances Per Game",
              type: "text",
              placeholder: "Enter clearances per game",
              label: "Clearances Per Game",
            },
            {
              name: "Interceptions Per Game",
              type: "text",
              placeholder: "Enter interceptions per game",
              label: "Interceptions Per Game",
            },
          ],
          Goalkeepers: [
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
            {
              name: "Clean Sheets",
              type: "text",
              placeholder: "Enter clean sheets (games with no goals conceded)",
              label: "Clean Sheets",
            },
          ],
        },
      },
    ],
  };
  
  export default soccer;

  