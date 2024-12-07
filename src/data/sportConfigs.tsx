export interface SportParameter {
    name: string;
    type: "checkbox" | "text";
    options?: string[];
    placeholder?: string;
    label?: string;
    conditionalFields?: { [key: string]: SportParameter[] };
  }
  
  export interface SportConfig {
    name: string;
    fields: SportParameter[];
  }
  
  const sportConfigs: Record<string, SportConfig> = {
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
          label: "Average Drive Distance",
        },
      ],
    },
  };
  
  export default sportConfigs; // Export default for the configs
  