import { SportConfig } from '../sportConfigs';

const football: SportConfig = {
  name: "Football",
  fields: [
    // General Game Statistics (All Positions)
    {
      name: "Games Played",
      type: "text",
      placeholder: "Enter total games played",
      label: "Games Played",
    },
    {
      name: "Total Touchdowns",
      type: "text",
      placeholder: "Enter total touchdowns",
      label: "Total Touchdowns",
    },
    {
      name: "Total Tackles",
      type: "text",
      placeholder: "Enter total tackles",
      label: "Total Tackles",
    },
    // Position-Specific Metrics
    {
      name: "Position Metrics",
      type: "checkbox",
      options: [
        "Quarterbacks",
        "Running Backs",
        "Wide Receivers/Tight Ends",
        "Offensive Linemen",
        "Defensive Linemen",
        "Linebackers",
        "Defensive Backs",
        "Kickers/Punters",
      ],
      label: "Position-Specific Metrics",
      conditionalFields: {
        Quarterbacks: [
          {
            name: "Throwing Distance",
            type: "text",
            placeholder: "Enter throwing distance (yards)",
            label: "Throwing Distance (Yards)",
          },
          {
            name: "Throwing Accuracy",
            type: "text",
            placeholder: "Enter throwing accuracy (percentage)",
            label: "Throwing Accuracy (Percentage)",
          },
        ],
        "Running Backs": [
          {
            name: "Yards Per Carry",
            type: "text",
            placeholder: "Enter yards per carry",
            label: "Yards Per Carry",
          },
          {
            name: "Pass Catching Accuracy",
            type: "text",
            placeholder: "Enter pass catching accuracy (percentage)",
            label: "Pass Catching Accuracy (Percentage)",
          },
        ],
        "Wide Receivers/Tight Ends": [
          {
            name: "Catch Percentage",
            type: "text",
            placeholder: "Enter catch percentage",
            label: "Catch Percentage",
          },
          {
            name: "Route Running Speed",
            type: "text",
            placeholder: "Enter route running speed (seconds over 20 yards)",
            label: "Route Running Speed (Seconds over 20 Yards)",
          },
        ],
        "Offensive Linemen": [
          {
            name: "Pancake Blocks Per Game",
            type: "text",
            placeholder: "Enter pancake blocks per game",
            label: "Pancake Blocks Per Game",
          },
          {
            name: "Pass Block Efficiency",
            type: "text",
            placeholder: "Enter pass block efficiency (percentage of successful blocks)",
            label: "Pass Block Efficiency (Percentage of Successful Blocks)",
          },
        ],
        "Defensive Linemen": [
          {
            name: "Sacks Per Game",
            type: "text",
            placeholder: "Enter sacks per game",
            label: "Sacks Per Game",
          },
          {
            name: "Tackles For Loss Per Game",
            type: "text",
            placeholder: "Enter tackles for loss per game",
            label: "Tackles For Loss Per Game",
          },
        ],
        Linebackers: [
          {
            name: "Tackles Per Game",
            type: "text",
            placeholder: "Enter tackles per game",
            label: "Tackles Per Game",
          },
          {
            name: "Pass Coverage Success",
            type: "text",
            placeholder: "Enter pass coverage success (percentage of passes defended)",
            label: "Pass Coverage Success (Percentage of Passes Defended)",
          },
        ],
        "Defensive Backs": [
          {
            name: "Interceptions Per Game",
            type: "text",
            placeholder: "Enter interceptions per game",
            label: "Interceptions Per Game",
          },
          {
            name: "Pass Breakups Per Game",
            type: "text",
            placeholder: "Enter pass breakups per game",
            label: "Pass Breakups Per Game",
          },
        ],
        "Kickers/Punters": [
          {
            name: "Field Goal Accuracy",
            type: "text",
            placeholder: "Enter field goal accuracy (percentage)",
            label: "Field Goal Accuracy (Percentage)",
          },
          {
            name: "Longest Field Goal Made",
            type: "text",
            placeholder: "Enter longest field goal made (yards)",
            label: "Longest Field Goal Made (Yards)",
          },
          {
            name: "Punt Average Distance",
            type: "text",
            placeholder: "Enter punt average distance (yards)",
            label: "Punt Average Distance (Yards)",
          },
        ],
      },
    },
  ],
};

export default football;
