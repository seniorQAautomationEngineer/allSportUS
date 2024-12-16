import { SportConfig } from '../sportConfigs';

const basketball: SportConfig = {
  name: "Basketball",
  fields: [
    // General Game Statistics (All Positions)
    {
      name: "Games Played",
      type: "text",
      placeholder: "Enter total games played",
      label: "Games Played",
    },
    {
      name: "Total Points",
      type: "text",
      placeholder: "Enter total points scored",
      label: "Total Points",
    },
    {
      name: "Total Rebounds",
      type: "text",
      placeholder: "Enter total rebounds",
      label: "Total Rebounds",
    },
    {
      name: "Total Assists",
      type: "text",
      placeholder: "Enter total assists",
      label: "Total Assists",
    },
    // Position-Specific Metrics
    {
      name: "Position Metrics",
      type: "checkbox",
      options: ["Guards", "Forwards", "Centers"],
      label: "Position-Specific Metrics",
      conditionalFields: {
        Guards: [
          {
            name: "Points Per Game",
            type: "text",
            placeholder: "Enter points per game",
            label: "Points Per Game",
          },
          {
            name: "Assists Per Game",
            type: "text",
            placeholder: "Enter assists per game",
            label: "Assists Per Game",
          },
          {
            name: "Steals Per Game",
            type: "text",
            placeholder: "Enter steals per game",
            label: "Steals Per Game",
          },
          {
            name: "Shooting Percentage (Field Goals)",
            type: "text",
            placeholder: "Enter shooting percentage (field goals)",
            label: "Shooting Percentage (Field Goals)",
          },
        ],
        Forwards: [
          {
            name: "Points Per Game",
            type: "text",
            placeholder: "Enter points per game",
            label: "Points Per Game",
          },
          {
            name: "Rebounds Per Game",
            type: "text",
            placeholder: "Enter rebounds per game",
            label: "Rebounds Per Game",
          },
          {
            name: "Shooting Percentage (Field Goals)",
            type: "text",
            placeholder: "Enter shooting percentage (field goals)",
            label: "Shooting Percentage (Field Goals)",
          },
        ],
        Centers: [
          {
            name: "Rebounds Per Game",
            type: "text",
            placeholder: "Enter rebounds per game",
            label: "Rebounds Per Game",
          },
          {
            name: "Blocks Per Game",
            type: "text",
            placeholder: "Enter blocks per game",
            label: "Blocks Per Game",
          },
          {
            name: "Free Throw Percentage",
            type: "text",
            placeholder: "Enter free throw percentage",
            label: "Free Throw Percentage",
          },
        ],
      },
    },
  ],
};

export default basketball;
