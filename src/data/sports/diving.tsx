import { SportConfig } from '../sportConfigs';

const diving: SportConfig = {
    name: "Diving",
    fields: [
      {
        name: "1-Meter Springboard Best Score",
        type: "text",
        placeholder: "Enter best score for 1-meter springboard",
        label: "1-Meter Springboard Best Score",
      },
      {
        name: "3-Meter Springboard Best Score",
        type: "text",
        placeholder: "Enter best score for 3-meter springboard",
        label: "3-Meter Springboard Best Score",
      },
      {
        name: "Platform Diving Best Score",
        type: "text",
        placeholder: "Enter best score for platform diving",
        label: "Platform Diving Best Score",
      },
      {
        name: "Average Dive Score",
        type: "text",
        placeholder: "Enter average score across all events",
        label: "Average Dive Score (All Events)",
      },
      {
        name: "Highest Dive Score",
        type: "text",
        placeholder: "Enter highest score for a single dive",
        label: "Highest Dive Score (Single Dive)",
      },
      {
        name: "Total Dives Competed",
        type: "text",
        placeholder: "Enter total dives competed per event",
        label: "Total Dives Competed (Per Event)",
      },
    ],
  };
  
  export default diving;
  