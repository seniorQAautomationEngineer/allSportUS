import { SportConfig } from '../sportConfigs';

const iceHockey: SportConfig = {
  name: "Ice Hockey",
  fields: [
    // General Game Statistics (All Positions)
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
      name: "Total Points",
      type: "text",
      placeholder: "Enter total points (Goals + Assists)",
      label: "Total Points",
    },
    // Position-Specific Metrics
    {
      name: "positionMetrics",
      type: "checkbox",
      options: ["Forwards", "Defensemen", "Goalies"],
      label: "Position-Specific Metrics",
      conditionalFields: {
        // Forwards Metrics
        Forwards: [
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
            name: "Shots on Goal Percentage",
            type: "text",
            placeholder: "Enter shots on goal percentage (e.g., 70%)",
            label: "Shots on Goal Percentage",
          },
        ],
        // Defensemen Metrics
        Defensemen: [
          {
            name: "Plus-Minus Rating",
            type: "text",
            placeholder: "Enter plus-minus rating",
            label: "Plus-Minus Rating (Goal Differential While on Ice)",
          },
          {
            name: "Blocked Shots Per Game",
            type: "text",
            placeholder: "Enter blocked shots per game",
            label: "Blocked Shots Per Game",
          },
          {
            name: "Clearing Success Rate",
            type: "text",
            placeholder: "Enter clearing success rate (e.g., 85%)",
            label: "Clearing Success Rate (Percentage of Successful Zone Exits)",
          },
        ],
        // Goalies Metrics
        Goalies: [
          {
            name: "Save Percentage",
            type: "text",
            placeholder: "Enter save percentage (e.g., 92%)",
            label: "Save Percentage",
          },
          {
            name: "Goals Allowed Per Game",
            type: "text",
            placeholder: "Enter goals allowed per game",
            label: "Goals Allowed Per Game",
          },
          {
            name: "Shutouts",
            type: "text",
            placeholder: "Enter total shutouts",
            label: "Shutouts (Total)",
          },
        ],
      },
    },
  ],
};

export default iceHockey;
