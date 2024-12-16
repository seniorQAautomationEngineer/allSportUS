import { SportConfig } from '../sportConfigs';

const swimming: SportConfig = {
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
          {
            name: "200m Freestyle Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "200m Freestyle Time",
          },
          {
            name: "400m Freestyle Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "400m Freestyle Time",
          },
          {
            name: "800m Freestyle Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "800m Freestyle Time",
          },
          {
            name: "1500m Freestyle Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "1500m Freestyle Time",
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
          {
            name: "200m Backstroke Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "200m Backstroke Time",
          },
        ],
        Breaststroke: [
          {
            name: "50m Breaststroke Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "50m Breaststroke Time",
          },
          {
            name: "100m Breaststroke Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "100m Breaststroke Time",
          },
          {
            name: "200m Breaststroke Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "200m Breaststroke Time",
          },
        ],
        Butterfly: [
          {
            name: "50m Butterfly Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "50m Butterfly Time",
          },
          {
            name: "100m Butterfly Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "100m Butterfly Time",
          },
          {
            name: "200m Butterfly Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "200m Butterfly Time",
          },
        ],
        "Individual Medley (IM)": [
          {
            name: "100m IM Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "100m IM Time",
          },
          {
            name: "200m IM Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "200m IM Time",
          },
          {
            name: "400m IM Time",
            type: "text",
            placeholder: "MM:SS.ms",
            label: "400m IM Time",
          },
        ],
      },
    },
  ],
};

export default swimming;
