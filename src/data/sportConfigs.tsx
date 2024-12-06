interface SportParameter {
    name: string;
    type: "checkbox" | "text" | "number" | "noCheckbox"; // Added "noCheckbox"
    options?: string[]; // For select or multiselect types
    placeholder?: string;
    unit?: string; // Optional unit (e.g., "mph", "seconds")
    label?: string;
    dependsOn?: string; // Specifies dependency on another parameter
    conditionalFields?: { [key: string]: SportParameter[] }; // Conditional fields based on selected options
  }
  
  interface SportConfig {
    name: string;
    fields: SportParameter[]; // List of parameters for this sport
  }
  
  interface SportConfigs {
    [key: string]: SportConfig;
  }
  
  const sportConfigs: SportConfigs = {
    swimming: {
      name: "Swimming",
      fields: [
        {
          name: "strokes",
          type: "checkbox",
          options: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly"],
          label: "Strokes",
          conditionalFields: {
            Freestyle: [
              {
                name: "50m Freestyle Time",
                type: "text",
                placeholder: "MM:SS.ms",
                label: "50m Freestyle Time",
              },
              {
                name: "100m Freestyle Time",
                type: "text",
                placeholder: "MM:SS.ms",
                label: "100m Freestyle Time",
              },
            ],
            Backstroke: [
              {
                name: "50m Backstroke Time",
                type: "text",
                placeholder: "MM:SS.ms",
                label: "50m Backstroke Time",
              },
              {
                name: "100m Backstroke Time",
                type: "text",
                placeholder: "MM:SS.ms",
                label: "100m Backstroke Time",
              },
            ],
            Breaststroke: [
              {
                name: "50m Breaststroke Time",
                type: "text",
                placeholder: "MM:SS.ms",
                label: "50m Breaststroke Time",
              },
            ],
            Butterfly: [
              {
                name: "50m Butterfly Time",
                type: "text",
                placeholder: "MM:SS.ms",
                label: "50m Butterfly Time",
              },
            ],
          },
        },
      ],
    },
    golf: {
      name: "Golf",
      fields: [
        {
          name: "Average Drive Distance",
          type: "text",
          placeholder: "e.g., 250 yards",
          label: "Average Drive Distance (Yards)",
        },
        {
          name: "Driving Accuracy",
          type: "text",
          placeholder: "e.g., 80%",
          label: "Driving Accuracy (Percentage of fairways hit)",
        },
        {
          name: "Greens in Regulation",
          type: "text",
          placeholder: "e.g., 75%",
          label: "Greens in Regulation (Percentage)",
        },
        {
          name: "Average Putts Per Round",
          type: "text",
          placeholder: "e.g., 30",
          label: "Average Putts Per Round",
        },
        {
          name: "Handicap Index",
          type: "text",
          placeholder: "e.g., 5",
          label: "Handicap Index",
        },
        {
          name: "Up and Down Success Rate",
          type: "text",
          placeholder: "e.g., 60%",
          label: "Up and Down Success Rate (Percentage of saves around the green)",
        },
        {
          name: "Average Sand Saves",
          type: "text",
          placeholder: "e.g., 50%",
          label: "Average Sand Saves (Percentage of successful bunker saves)",
        },
        {
          name: "Tournaments Played",
          type: "text",
          placeholder: "e.g., 20",
          label: "Tournaments Played",
        },
        {
          name: "Scoring Average",
          type: "text",
          placeholder: "e.g., 72",
          label: "Scoring Average (Average strokes per round)",
        },
        {
          name: "Lowest Round Score",
          type: "text",
          placeholder: "e.g., 65",
          label: "Lowest Round Score (Strokes)",
        },
      ],
    },
  };
  
  export default sportConfigs;
  