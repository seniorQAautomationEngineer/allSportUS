import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { Header } from "./Header";
import Loader from './loader/Loader';
import '../App.css';
import sportConfigs from './configs/sportConfigs';
import universityReportInstruction from './../prompts/searchPromt';

// Define the type for options in the Select component
interface Option {
  value: string;
  label: string;
}

// Define state types
interface Statistics {
  [key: string]: string; // Each stat is a key-value pair
}

const sportOptions: Option[] = [
  { value: 'tennis', label: 'Tennis' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'basketball', label: 'Basketball' },
  // Add additional sports here as needed
];

// Gender options
const genderOptions: Option[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const Search: React.FC = () => {
  const [gender, setGender] = useState<Option | null>(null);
  const [sport, setSport] = useState<Option | null>(null);
  const [statistics, setStatistics] = useState<Statistics>({});
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [parameters, setParameters] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (sport) {
      setParameters(sportConfigs[sport.value] || []);
      setStatistics({});
    }
  }, [sport]);

  const handleInputChange = (param: string, value: string) => {
    setStatistics((prev) => ({ ...prev, [param]: value }));
  };

  const handleSubmit = async () => {
    setResponse('');
    setLoading(true);

    // Construct prompt dynamically using selected sport's parameters
    const statEntries = parameters
      .map((param) => `${param}: ${statistics[param] || "N/A"}`)
      .join(', '); // Join with a comma and space for a single line

    const prompt = `Identify the top 10 NCAA Division 1 universities for a  ${gender?.label} ${sport?.label} player with the following profile: Athletic Stats: \n${statEntries} \n${universityReportInstruction}`;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      }, {
        headers: {
          'Authorization': ``,
          'Content-Type': 'application/json',
        },
      });

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
    <>
      <Header />
      <div className="app-container">
        <h1 className="app-title">College Scholarship Finder</h1>

        {/* Gender Selection */}
        <div className="form-group">
          <label>Gender:</label>
          <Select
            options={genderOptions}
            value={gender}
            onChange={setGender}
          />
        </div>

        {/* Sport Selection */}
        <div className="form-group">
          <label>Sport:</label>
          <Select
            options={sportOptions}
            value={sport}
            onChange={setSport}
          />
        </div>

        {/* Display input fields based on selected sport */}
        {parameters.map((param) => (
          <div className="form-group" key={param}>
            <label>{param}</label>
            <input
              type="text"
              value={statistics[param] || ''}
              onChange={(e) => handleInputChange(param, e.target.value)}
            />
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        {loading && <Loader />}
        {response && <ReactMarkdown>{response}</ReactMarkdown>}
      </div>
    </>
  );
};

export default Search;
