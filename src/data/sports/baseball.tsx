import { SportConfig } from '../sportConfigs';

const baseball: SportConfig = {
  name: "Baseball",
  fields: [
    // General Game Statistics (All Positions)
    {
      name: "Games Played",
      type: "text",
      placeholder: "Enter total games played",
      label: "Games Played",
    },
    {
      name: "Batting Average",
      type: "text",
      placeholder: "Enter batting average",
      label: "Batting Average",
    },
    {
      name: "On-Base Percentage",
      type: "text",
      placeholder: "Enter on-base percentage",
      label: "On-Base Percentage",
    },
    {
      name: "Home Runs",
      type: "text",
      placeholder: "Enter total home runs",
      label: "Home Runs",
    },
    {
      name: "Runs Batted In (RBI)",
      type: "text",
      placeholder: "Enter total runs batted in (RBI)",
      label: "Runs Batted In (RBI)",
    },
    // Position-Specific Metrics
    {
      name: "Position Metrics",
      type: "checkbox",
      options: ["Pitchers", "Catchers", "Infielders", "Outfielders"],
      label: "Position-Specific Metrics",
      conditionalFields: {
        Pitchers: [
          {
            name: "Fastball Velocity",
            type: "text",
            placeholder: "Enter fastball velocity (MPH)",
            label: "Fastball Velocity (MPH)",
          },
          {
            name: "ERA (Earned Run Average)",
            type: "text",
            placeholder: "Enter ERA (earned run average)",
            label: "ERA (Earned Run Average)",
          },
          {
            name: "Strikeout-to-Walk Ratio",
            type: "text",
            placeholder: "Enter strikeout-to-walk ratio",
            label: "Strikeout-to-Walk Ratio",
          },
        ],
        Catchers: [
          {
            name: "Pop Time",
            type: "text",
            placeholder: "Enter pop time (seconds, home to second)",
            label: "Pop Time (Seconds, Home to Second)",
          },
          {
            name: "Throwing Accuracy",
            type: "text",
            placeholder: "Enter throwing accuracy (percentage of successful throws to bases)",
            label: "Throwing Accuracy (Percentage of Successful Throws to Bases)",
          },
        ],
        Infielders: [
          {
            name: "Throwing Velocity",
            type: "text",
            placeholder: "Enter throwing velocity (MPH, infield to first base)",
            label: "Throwing Velocity (MPH, Infield to First Base)",
          },
          {
            name: "Fielding Percentage",
            type: "text",
            placeholder: "Enter fielding percentage",
            label: "Fielding Percentage",
          },
        ],
        Outfielders: [
          {
            name: "Throwing Velocity",
            type: "text",
            placeholder: "Enter throwing velocity (MPH, outfield to home plate)",
            label: "Throwing Velocity (MPH, Outfield to Home Plate)",
          },
          {
            name: "Fielding Percentage",
            type: "text",
            placeholder: "Enter fielding percentage",
            label: "Fielding Percentage",
          },
        ],
      },
    },
  ],
};

export default baseball;
