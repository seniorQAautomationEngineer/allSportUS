import { SportConfig } from '../sportConfigs';

const volleyball: SportConfig = {
    name: "Volleyball",
    fields: [
      {
        name: "Total Matches Played",
        type: "text",
        placeholder: "Enter total matches played",
        label: "Total Matches Played",
      },
      {
        name: "positionMetrics",
        type: "checkbox",
        options: ["Outside Hitters/Right Side Hitters", "Middle Blockers", "Setters", "Liberos/Defensive Specialists"],
        label: "Position-Specific Metrics",
        conditionalFields: {
          "Outside Hitters/Right Side Hitters": [
            {
              name: "Kills Per Set",
              type: "text",
              placeholder: "Enter kills per set",
              label: "Kills Per Set",
            },
            {
              name: "Hitting Percentage",
              type: "text",
              placeholder: "Enter hitting percentage (e.g., 50%)",
              label: "Hitting Percentage",
            },
          ],
          "Middle Blockers": [
            {
              name: "Blocks Per Set",
              type: "text",
              placeholder: "Enter blocks per set",
              label: "Blocks Per Set",
            },
            {
              name: "Attack Success Rate",
              type: "text",
              placeholder: "Enter attack success rate (e.g., 60%)",
              label: "Attack Success Rate (Percentage)",
            },
          ],
          "Setters": [
            {
              name: "Assists Per Set",
              type: "text",
              placeholder: "Enter assists per set",
              label: "Assists Per Set",
            },
            {
              name: "Passing Accuracy",
              type: "text",
              placeholder: "Enter passing accuracy (e.g., 3 or 75%)",
              label: "Passing Accuracy (Percentage or Scale 1–3)",
            },
          ],
          "Liberos/Defensive Specialists": [
            {
              name: "Digs Per Set",
              type: "text",
              placeholder: "Enter digs per set",
              label: "Digs Per Set",
            },
            {
              name: "Serve Receive Success",
              type: "text",
              placeholder: "Enter serve receive success (e.g., 85%)",
              label: "Serve Receive Success (Percentage)",
            },
          ],
        },
      },
    ],
  };
  
  export default volleyball;
  