import { SportConfig } from '../sportConfigs';

const triathlon: SportConfig = {
    name: "Triathlon",
    fields: [
      {
        name: "750m Swim Time",
        type: "text",
        placeholder: "MM:SS",
        label: "750m Swim Time",
      },
      {
        name: "20km Bike Time",
        type: "text",
        placeholder: "HH:MM:SS",
        label: "20km Bike Time",
      },
      {
        name: "5km Run Time",
        type: "text",
        placeholder: "MM:SS",
        label: "5km Run Time",
      },
      {
        name: "Personal Best Overall Time",
        type: "text",
        placeholder: "HH:MM:SS",
        label: "Personal Best Overall Time",
      },
    ],
  };
  
  export default triathlon;
  