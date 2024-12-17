/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths based on your project
    ],
    theme: {
      extend: {
        colors: {
          border: "#D1D5DB", // Replace with your desired border color
          primary: "#1D4ED8", // Replace with your desired primary color
          destructive: "#ef4444",
          "primary-foreground": "#FFFFFF", // Replace with your desired text color
        },
      },
    },
    plugins: [],
  };
  