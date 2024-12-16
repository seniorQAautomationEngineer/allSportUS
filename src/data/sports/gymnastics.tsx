import { SportConfig } from '../sportConfigs';

const gymnastics: SportConfig = {
  name: "Gymnastics",
  fields: [
    // General Performance Metrics
    {
      name: "Total All-Around Score",
      type: "text",
      placeholder: "Enter total all-around score (sum of scores across all events in a meet)",
      label: "Total All-Around Score",
    },
    {
      name: "Average Event Score",
      type: "text",
      placeholder: "Enter average event score (across all competitions)",
      label: "Average Event Score",
    },
    {
      name: "Highest Event Score",
      type: "text",
      placeholder: "Enter highest event score (best score achieved in any event)",
      label: "Highest Event Score",
    },
    {
      name: "Highest All-Around Score",
      type: "text",
      placeholder: "Enter highest all-around score (best total score in a meet)",
      label: "Highest All-Around Score",
    },
    {
      name: "Meets Competed",
      type: "text",
      placeholder: "Enter total number of meets competed",
      label: "Meets Competed (Total Number)",
    },
    // Event-Specific Metrics
    {
      name: "Event Metrics",
      type: "checkbox",
      options: ["Vault", "Bars", "Beam", "Floor"],
      label: "Event-Specific Metrics",
      conditionalFields: {
        Vault: [
          {
            name: "Vault Difficulty Score",
            type: "text",
            placeholder: "Enter vault difficulty score (based on vault performed)",
            label: "Vault Difficulty Score",
          },
          {
            name: "Vault Execution Score",
            type: "text",
            placeholder: "Enter vault execution score (deduction-free score based on form and landing)",
            label: "Vault Execution Score",
          },
        ],
        Bars: [
          {
            name: "Release Move Success Rate",
            type: "text",
            placeholder: "Enter release move success rate (percentage of successful releases during routines)",
            label: "Release Move Success Rate",
          },
          {
            name: "Cast to Handstand Success Rate",
            type: "text",
            placeholder: "Enter cast to handstand success rate (percentage of handstands achieved during routines)",
            label: "Cast to Handstand Success Rate",
          },
        ],
        Beam: [
          {
            name: "Beam Balance Check Count",
            type: "text",
            placeholder: "Enter beam balance check count (average number of balance deductions per routine)",
            label: "Beam Balance Check Count",
          },
          {
            name: "Series Completion Rate",
            type: "text",
            placeholder: "Enter series completion rate (percentage of successfully connected acro or dance series)",
            label: "Series Completion Rate",
          },
        ],
        Floor: [
          {
            name: "Tumbling Pass Success Rate",
            type: "text",
            placeholder: "Enter tumbling pass success rate (percentage of cleanly landed tumbling passes)",
            label: "Tumbling Pass Success Rate",
          },
          {
            name: "Leap Series Completion Rate",
            type: "text",
            placeholder: "Enter leap series completion rate (percentage of successful dance sequences)",
            label: "Leap Series Completion Rate",
          },
        ],
      },
    },
  ],
};

export default gymnastics;
