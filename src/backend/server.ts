import express from 'express';
import cors from 'cors'; // Import cors middleware
import registrationRoute from './registration'; // Adjust path to your routes file

const app = express();

// Enable CORS for all routes
app.use(cors()); // Use CORS middleware here

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Use the registration route
app.use('/api', registrationRoute);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
