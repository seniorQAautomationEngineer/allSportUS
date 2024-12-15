import { SportConfig } from '../sportConfigs';

const bowling: SportConfig = {
    name: "Bowling",
    fields: [
      {
        name: "Average Score Per Game",
        type: "text",
        placeholder: "Enter average score per game",
        label: "Average Score Per Game",
      },
      {
        name: "Personal Best Score",
        type: "text",
        placeholder: "Enter personal best score (highest single-game score)",
        label: "Personal Best Score (Highest Single-Game Score)",
      },
      {
        name: "Strike Percentage",
        type: "text",
        placeholder: "Enter strike percentage (e.g., 50%)",
        label: "Strike Percentage",
      },
      {
        name: "Spare Conversion Rate",
        type: "text",
        placeholder: "Enter spare conversion rate (e.g., 75%)",
        label: "Spare Conversion Rate (Percentage of Spares Converted)",
      },
      {
        name: "Open Frame Percentage",
        type: "text",
        placeholder: "Enter open frame percentage (e.g., 20%)",
        label: "Open Frame Percentage (Frames Left Open)",
      },
      {
        name: "Games Played",
        type: "text",
        placeholder: "Enter total games played",
        label: "Games Played",
      },
      {
        name: "Tournaments Competed",
        type: "text",
        placeholder: "Enter tournaments competed",
        label: "Tournaments Competed",
      },
    ],
  };
  
  export default bowling;
  