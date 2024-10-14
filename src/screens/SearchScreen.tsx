import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Define the types for gender and sport options
interface Option {
  value: string;
  label: string;
}

// Define the type for statistics state
interface Statistics {
  singlesRecord: string;
  doublesRecord: string;
  serveSpeed: string;
  firstServePercentage: string;
  secondServeWinPercentage: string;
  breakPointsSaved: string;
  acesPerMatch: string;
  doubleFaultsPerMatch: string;
  winnersPerMatch: string;
  unforcedErrorsPerMatch: string;
}

// Options for gender and sport
const genderOptions: Option[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const sportOptions: Option[] = [
  { value: 'tennis', label: 'Tennis' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'basketball', label: 'Basketball' },
];

const SearchScreen: React.FC = () => {
  const [gender, setGender] = useState<Option | null>(null);
  const [sport, setSport] = useState<Option | null>(null);
  const [statistics, setStatistics] = useState<Statistics>({
    singlesRecord: '',
    doublesRecord: '', // Add this field
    serveSpeed: '',
    firstServePercentage: '',
    secondServeWinPercentage: '',
    breakPointsSaved: '',
    acesPerMatch: '',
    doubleFaultsPerMatch: '',
    winnersPerMatch: '',
    unforcedErrorsPerMatch: '',
  });
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Log Out function
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  // Handle form submission
  const handleSubmit = async () => {
    setResponse('');
    setLoading(true);

    const prompt = `Give me the top 20 colleges in ${sport?.label} among NCAA divisions I and II where the results below could realistically grant a high athletic scholarship based on last season’s data.
    
    Gender: ${gender?.label}

    Athletic Statistics:
    Singles Record: ${statistics.singlesRecord}
    Serve Speed: ${statistics.serveSpeed} mph
    First Serve Percentage: ${statistics.firstServePercentage}%
    Second Serve Win Percentage: ${statistics.secondServeWinPercentage}%
    Break Points Saved: ${statistics.breakPointsSaved}%
    Aces per Match: ${statistics.acesPerMatch}
    Double Faults per Match: ${statistics.doubleFaultsPerMatch}
    Winners per Match: ${statistics.winnersPerMatch}
    Unforced Errors per Match: ${statistics.unforcedErrorsPerMatch}`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`, // Replace with actual API key
            'Content-Type': 'application/json',
          },
        }
      );

      const rawResponse = response.data.choices[0]?.message?.content || 'No valid response received.';
      setResponse(rawResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">College Scholarship Finder</h1>

      {/* Log Out Button */}
      {localStorage.getItem('userToken') && (
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      )}

      {/* Gender Selection */}
      <div className="form-group">
        <label>Gender:</label>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={genderOptions}
          value={gender}
          onChange={setGender}
        />
      </div>

      {/* Sport Selection */}
      <div className="form-group">
        <label>Sport:</label>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={sportOptions}
          value={sport}
          onChange={setSport}
        />
      </div>

      {/* Show Tennis-Specific Fields */}
      {sport?.value === 'tennis' && (
        <div className="tennis-stats">
          <div className="form-group">
            <label>Singles Record:</label>
            <input
              type="text"
              value={statistics.singlesRecord}
              onChange={(e) =>
                setStatistics({ ...statistics, singlesRecord: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Serve Speed (mph):</label>
            <input
              type="text"
              value={statistics.serveSpeed}
              onChange={(e) =>
                setStatistics({ ...statistics, serveSpeed: e.target.value })
              }
            />
          </div>
          {/* Add other tennis fields similarly */}
        </div>
      )}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {/* Show Loading Spinner or Results */}
      {loading ? (
        <div className="loading-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
          <p>Waiting for response...</p>
        </div>
      ) : (
        response && (
          <div className="response-container">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )
      )}
    </div>
  );
};

export default SearchScreen;
