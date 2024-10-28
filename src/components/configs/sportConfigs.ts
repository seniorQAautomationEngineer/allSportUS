// Define the configuration type for each sport's parameters
interface SportConfigs {
    [key: string]: string[]; // Each sport has a list of string parameters
  }
  
  // Define the configuration object with all sports
  const sportConfigs: SportConfigs = {
    tennis: [
      "Singles Record",
      "Serve Speed (mph)",
      "First Serve Percentage",
      "Second Serve Win Percentage",
      "Break Points Saved",
      "Aces per Match",
      "Double Faults per Match",
      "Winners per Match",
      "Unforced Errors per Match",
    ],
    swimming: [
      "50m Freestyle Time",
      "100m Freestyle Time",
      "200m Freestyle Time",
    ],
    basketball: [
      "Points per Game",
      "Assists per Game",
      "Rebounds per Game",
      "Steals per Game",
      "Blocks per Game",
    ],
    // Add more sports as needed
  };
  
  export default sportConfigs;
  