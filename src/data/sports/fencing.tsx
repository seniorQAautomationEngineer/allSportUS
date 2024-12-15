import { SportConfig } from '../sportConfigs';

const fencing: SportConfig = {
  name: "Fencing",
  fields: [
    // General Performance Metrics (All Weapons)
    {
      name: "Bout Win Percentage",
      type: "text",
      placeholder: "Enter bout win percentage (e.g., 70%)",
      label: "Bout Win Percentage",
    },
    {
      name: "Average Touches Scored Per Bout",
      type: "text",
      placeholder: "Enter average touches scored per bout",
      label: "Average Touches Scored Per Bout",
    },
    {
      name: "Average Touches Received Per Bout",
      type: "text",
      placeholder: "Enter average touches received per bout",
      label: "Average Touches Received Per Bout",
    },
    {
      name: "Tournaments Competed",
      type: "text",
      placeholder: "Enter number of tournaments competed",
      label: "Tournaments Competed",
    },
    {
      name: "Weekly Training Hours",
      type: "text",
      placeholder: "Enter weekly training hours",
      label: "Weekly Training Hours",
    },
    // Weapon-Specific Metrics
    {
      name: "Weapon Metrics",
      type: "checkbox",
      options: ["Foil", "Épée", "Saber"],
      label: "Weapon-Specific Metrics",
      conditionalFields: {
        Foil: [
          {
            name: "Attack Success Rate",
            type: "text",
            placeholder: "Enter attack success rate (e.g., 75%)",
            label: "Attack Success Rate (Percentage of Successful Attacks on Target Area)",
          },
          {
            name: "Parry-Riposte Success Rate",
            type: "text",
            placeholder: "Enter parry-riposte success rate (e.g., 60%)",
            label: "Parry-Riposte Success Rate",
          },
        ],
        Épée: [
          {
            name: "Double Touch Percentage",
            type: "text",
            placeholder: "Enter double touch percentage (e.g., 20%)",
            label: "Double Touch Percentage",
          },
          {
            name: "Defensive Touch Success Rate",
            type: "text",
            placeholder: "Enter defensive touch success rate (e.g., 50%)",
            label: "Defensive Touch Success Rate (Percentage of Touches Scored Through Counterattacks)",
          },
        ],
        Saber: [
          {
            name: "Attack Success Rate in Preparation",
            type: "text",
            placeholder: "Enter attack success rate in preparation (e.g., 80%)",
            label: "Attack Success Rate in Preparation",
          },
          {
            name: "Counterattack Timing Success Rate",
            type: "text",
            placeholder: "Enter counterattack timing success rate (e.g., 70%)",
            label: "Counterattack Timing Success Rate",
          },
        ],
      },
    },
  ],
};

export default fencing;
