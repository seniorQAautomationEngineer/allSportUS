import { SportConfig } from '../sportConfigs';

const golf: SportConfig = {
  name: "Golf",
  fields: [
    {
      name: "averageDriveDistance",
      type: "text",
      placeholder: "e.g., 250 yards",
      label: "Average Drive Distance (Yards)",
    },
    {
      name: "drivingAccuracy",
      type: "text",
      placeholder: "Enter percentage (e.g., 75)",
      label: "Driving Accuracy (Percentage of fairways hit)",
    },
    {
      name: "greensInRegulation",
      type: "text",
      placeholder: "Enter percentage (e.g., 60)",
      label: "Greens in Regulation (Percentage)",
    },
    {
      name: "averagePuttsPerRound",
      type: "text",
      placeholder: "e.g., 28.5",
      label: "Average Putts Per Round",
    },
    {
      name: "handicapIndex",
      type: "text",
      placeholder: "Enter handicap index (e.g., 4.2)",
      label: "Handicap Index",
    },
    {
      name: "upAndDownSuccessRate",
      type: "text",
      placeholder: "Enter percentage (e.g., 65)",
      label: "Up and Down Success Rate (Percentage of saves around the green)",
    },
    {
      name: "averageSandSaves",
      type: "text",
      placeholder: "Enter percentage (e.g., 50)",
      label: "Average Sand Saves (Percentage of successful bunker saves)",
    },
    {
      name: "tournamentsPlayed",
      type: "text",
      placeholder: "Enter number of tournaments",
      label: "Tournaments Played",
    },
    {
      name: "scoringAverage",
      type: "text",
      placeholder: "Enter average strokes per round (e.g., 72.3)",
      label: "Scoring Average (Average strokes per round)",
    },
    {
      name: "lowestRoundScore",
      type: "text",
      placeholder: "Enter lowest round score (e.g., 65)",
      label: "Lowest Round Score (Strokes)",
    },
  ],
};

export default golf;
