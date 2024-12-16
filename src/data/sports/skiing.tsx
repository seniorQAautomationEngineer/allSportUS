import { SportConfig } from '../sportConfigs';

const skiing: SportConfig = {
  name: "Skiing",
  fields: [
    {
      name: "bestTimeSlalom",
      type: "text",
      placeholder: "MM:SS",
      label: "Best Time in Slalom",
    },
    {
      name: "bestTimeGiantSlalom",
      type: "text",
      placeholder: "MM:SS",
      label: "Best Time in Giant Slalom",
    },
    {
      name: "bestTimeSuperG",
      type: "text",
      placeholder: "MM:SS",
      label: "Best Time in Super-G",
    },
    {
      name: "bestTimeDownhill",
      type: "text",
      placeholder: "MM:SS",
      label: "Best Time in Downhill",
    },
    {
      name: "totalRacesCompeted",
      type: "text",
      placeholder: "Enter total races",
      label: "Total Races Competed",
    },
  ],
};

export default skiing;
