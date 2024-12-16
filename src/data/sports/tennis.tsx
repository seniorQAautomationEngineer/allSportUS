import { SportConfig } from '../sportConfigs';


const tennis: SportConfig = {
    name: "Tennis",
    fields: [
      {
        name: "Serve Speed",
        type: "text",
        placeholder: "Enter Serve Speed (MPH)",
        label: "Serve Speed (MPH)",
      },
      {
        name: "First Serve Percentage",
        type: "text",
        placeholder: "Enter First Serve Percentage",
        label: "First Serve Percentage (%)",
      },
      {
        name: "Second Serve Accuracy",
        type: "text",
        placeholder: "Enter Second Serve Accuracy (%)",
        label: "Second Serve Accuracy (Percentage)",
      },
      {
        name: "Matches Played",
        type: "text",
        placeholder: "Enter Matches Played",
        label: "Matches Played",
      },
      {
        name: "Matches Won",
        type: "text",
        placeholder: "Enter Matches Won",
        label: "Matches Won",
      },
      {
        name: "Total Aces Per Match",
        type: "text",
        placeholder: "Enter Total Aces Per Match",
        label: "Total Aces Per Match",
      },
      {
        name: "Double Faults Per Match",
        type: "text",
        placeholder: "Enter Double Faults Per Match",
        label: "Double Faults Per Match",
      },
      {
        name: "Break Points Won",
        type: "text",
        placeholder: "Enter Break Points Won (%)",
        label: "Break Points Won (Percentage)",
      },
    ],
  };
  
  export default tennis;
  