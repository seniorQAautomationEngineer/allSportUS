export const sportsFormData = {
    sports: [
      {
        name: "Basketball",
        fields: [
          { name: "position", type: "multiselect", options: ["Guard", "Forward", "Center"], label: "Position" },
          { name: "height", type: "number", unit: "inches", label: "Height" },
          { name: "weight", type: "number", unit: "lbs", label: "Weight" },
          { name: "verticalJump", type: "number", unit: "inches", label: "Vertical Jump" },
          { name: "generalStats", type: "object", label: "General Statistics", subfields: [
            { name: "pointsPerGame", type: "number", label: "Points Per Game" },
            { name: "reboundsPerGame", type: "number", label: "Rebounds Per Game" },
            { name: "assistsPerGame", type: "number", label: "Assists Per Game" },
            { name: "shootingPercentage", type: "number", unit: "%", label: "Field Goal Percentage" }
          ]},
          { name: "positionSpecificStats", type: "object", label: "Position-Specific Statistics", subfields: [
            { name: "guardStats", type: "object", label: "Guard Statistics", subfields: [
              { name: "pointsPerGame", type: "number", label: "Points Per Game" },
              { name: "assistsPerGame", type: "number", label: "Assists Per Game" },
              { name: "stealsPerGame", type: "number", label: "Steals Per Game" },
              { name: "shootingPercentage", type: "number", unit: "%", label: "Field Goal Percentage" }
            ]},
            { name: "forwardStats", type: "object", label: "Forward Statistics", subfields: [
              { name: "pointsPerGame", type: "number", label: "Points Per Game" },
              { name: "reboundsPerGame", type: "number", label: "Rebounds Per Game" },
              { name: "shootingPercentage", type: "number", unit: "%", label: "Field Goal Percentage" }
            ]},
            { name: "centerStats", type: "object", label: "Center Statistics", subfields: [
              { name: "reboundsPerGame", type: "number", label: "Rebounds Per Game" },
              { name: "blocksPerGame", type: "number", label: "Blocks Per Game" },
              { name: "freeThrowPercentage", type: "number", unit: "%", label: "Free Throw Percentage" }
            ]}
          ]}
        ]
      },
      {
        name: "Soccer",
        fields: [
          { name: "position", type: "multiselect", options: ["Forward", "Midfielder", "Defender", "Goalkeeper"], label: "Position" },
          { name: "height", type: "number", unit: "cm", label: "Height" },
          { name: "weight", type: "number", unit: "kg", label: "Weight" },
          { name: "goalsScored", type: "number", label: "Goals Scored (per season)" },
          { name: "assists", type: "number", label: "Assists (per season)" },
          { name: "passAccuracy", type: "number", unit: "%", label: "Pass Accuracy" },
          { name: "tacklesPerGame", type: "number", label: "Tackles Per Game" },
          { name: "cleanSheets", type: "number", label: "Clean Sheets (Goalkeepers only)" }
        ]
      },
      {
        name: "Swimming",
        fields: [
          { name: "strokes", type: "multiselect", options: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly"], label: "Strokes" },
          { name: "height", type: "number", unit: "cm", label: "Height" },
          { name: "weight", type: "number", unit: "kg", label: "Weight" },
          { name: "bestTimes", type: "object", label: "Best Times", subfields: [
            { name: "50mFreestyle", type: "time", label: "50m Freestyle" },
            { name: "100mFreestyle", type: "time", label: "100m Freestyle" },
            { name: "200mFreestyle", type: "time", label: "200m Freestyle" },
            { name: "100mBackstroke", type: "time", label: "100m Backstroke" },
            { name: "100mBreaststroke", type: "time", label: "100m Breaststroke" },
            { name: "100mButterfly", type: "time", label: "100m Butterfly" }
          ]},
          { name: "personalBest", type: "time", label: "Personal Best Time" },
          { name: "eventSpecialty", type: "select", options: ["Sprint", "Middle Distance", "Distance"], label: "Event Specialty" }
        ]
      },
      {
        name: "Tennis",
        fields: [
          { name: "playingHand", type: "select", options: ["Right", "Left"], label: "Playing Hand" },
          { name: "height", type: "number", unit: "cm", label: "Height" },
          { name: "weight", type: "number", unit: "kg", label: "Weight" },
          { name: "serveSpeed", type: "number", unit: "mph", label: "Serve Speed" },
          { name: "utrRating", type: "number", label: "UTR Rating" },
          { name: "winLossRecord", type: "object", label: "Win/Loss Record", subfields: [
            { name: "wins", type: "number", label: "Wins" },
            { name: "losses", type: "number", label: "Losses" }
          ]},
          { name: "forehandStyle", type: "select", options: ["Eastern", "Semi-Western", "Western"], label: "Forehand Grip" },
          { name: "backhandStyle", type: "select", options: ["One-Handed", "Two-Handed"], label: "Backhand Style" }
        ]
      },
      {
        name: "Track and Field",
        fields: [
          { name: "events", type: "multiselect", options: ["100m", "200m", "400m", "800m", "1500m", "5000m", "10000m", "High Jump", "Long Jump", "Triple Jump", "Shot Put", "Discus", "Javelin", "Pole Vault", "Hurdles"], label: "Events" },
          { name: "height", type: "number", unit: "cm", label: "Height" },
          { name: "weight", type: "number", unit: "kg", label: "Weight" },
          { name: "personalBests", type: "object", label: "Personal Bests", subfields: [
            { name: "100m", type: "time", label: "100m" },
            { name: "200m", type: "time", label: "200m" },
            { name: "400m", type: "time", label: "400m" },
            { name: "800m", type: "time", label: "800m" },
            { name: "1500m", type: "time", label: "1500m" },
            { name: "5000m", type: "time", label: "5000m" },
            { name: "10000m", type: "time", label: "10000m" },
            { name: "highJump", type: "number", unit: "m", label: "High Jump" },
            { name: "longJump", type: "number", unit: "m", label: "Long Jump" },
            { name: "tripleJump", type: "number", unit: "m", label: "Triple Jump" },
            { name: "shotPut", type: "number", unit: "m", label: "Shot Put" },
            { name: "discus", type: "number", unit: "m", label: "Discus" },
            { name: "javelin", type: "number", unit: "m", label: "Javelin" },
            { name: "poleVault", type: "number", unit: "m", label: "Pole Vault" },
            { name: "hurdles", type: "time", label: "Hurdles" }
          ]}
        ]
      }
    ]
  };
  
  