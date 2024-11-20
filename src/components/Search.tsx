import React, { useState, useEffect } from "react";
import Select from "react-select";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import Loader from "./loader/Loader";
import "../App.css";
import sportConfigs from "./configs/sportConfigs"; // Configurations for sports parameters
import { auth, db } from "../firebaseConfig"; // Firebase setup
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import axios from 'axios';
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
  { value: "tennis", label: "Tennis" },
  { value: "swimming", label: "Swimming" },
  { value: "basketball", label: "Basketball" },
  // Add additional sports here as needed
];

// Gender options
const genderOptions: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const Search: React.FC = () => {
  const [gender, setGender] = useState<Option | null>(null);
  const [sport, setSport] = useState<Option | null>(null);
  const [statistics, setStatistics] = useState<Statistics>({});
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [parameters, setParameters] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (sport) {
      setParameters(sportConfigs[sport.value] || []);
      setStatistics({});
    }
  }, [sport]);

  useEffect(() => {
    // Simulate fetching user data from context or Firestore after registration/login
    const fetchUserDetails = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const { email, displayName } = currentUser;
        const [firstName, lastName] = displayName?.split(" ") || ["", ""];
        setUserDetails({ firstName, lastName, email: email || "" });
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (param: string, value: string) => {
    setStatistics((prev) => ({ ...prev, [param]: value }));
  };

  const handleSaveResume = async () => {
    if (!gender || !sport) {
      alert("Please select both gender and sport before saving the resume.");
      return;
    }

    try {
      const resumeData = {
        gender: gender.value,
        sport: sport.value,
        parameters: statistics,
        createdAt: new Date().toISOString(),
        firstName: userDetails?.firstName || "Unknown",
        lastName: userDetails?.lastName || "Unknown",
        email: userDetails?.email || "Unknown",
      };

      await addDoc(collection(db, "resumes"), resumeData);

      console.log("Resume saved successfully");
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Failed to save resume. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setResponse('');
    setLoading(true);

    // Construct prompt dynamically using selected sport's parameters
    const statEntries = parameters
      .map((param) => `${param}: ${statistics[param] || "N/A"}`)
      .join(', '); // Join with a comma and space for a single line

   // const prompt = `Identify the top 10 NCAA Division 1 universities for a  ${gender?.label} ${sport?.label} player with the following profile: Athletic Stats: \n${statEntries} \n${universityReportInstruction}`;

   const universityReportInstruction = "Please include the names, emails, and contact details of the head coaches, along with a tailored sample outreach email for student-athletes. Ensure the email aligns with the sport and gender context provided, and emphasizes the athlete's suitability for the program.";

  const prompt = `Based on the provided athletic profile, identify the top 10 NCAA Division 1 universities for a ${gender} ${sport} player. Include detailed responses focusing on academic and athletic reputation, team performance, and program fit. Athletic Stats:\n${statEntries}\n${universityReportInstruction}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        temperature: 0.7, // Control randomness of responses
        max_tokens: 1500, // Adjust for response length
        messages: [
          {
            role: 'system',
            content: `You are an expert in NCAA sports recruitment and university rankings. Your task is to provide comprehensive recommendations, including contact details of head coaches and a professional outreach email template. Ensure responses are concise, relevant, and actionable.`
          },
          {
            role: 'assistant',
            content: `Make sure to address NCAA Division 1 recruitment requirements comprehensively. Use precise and verifiable information to construct recommendations. Include outreach email templates tailored for student-athletes, keeping in mind sport and gender specificity.`
          },
          {
            role: 'assistant',
            content: `In cases where direct contact details are unavailable, provide resources or steps the user can take to find this information on official NCAA or university websites.`
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': ``
,
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
    <>
      <Header />
      <div className="app-container">
        <h1 className="app-title">College Scholarship Finder</h1>

        {/* Gender Selection */}
        <div className="form-group">
          <label>Gender:</label>
          <Select options={genderOptions} value={gender} onChange={setGender} />
        </div>

        {/* Sport Selection */}
        <div className="form-group">
          <label>Sport:</label>
          <Select options={sportOptions} value={sport} onChange={setSport} />
        </div>

        {/* Display input fields based on selected sport */}
        {parameters.map((param) => (
          <div className="form-group" key={param}>
            <label>{param}</label>
            <input
              type="text"
              value={statistics[param] || ""}
              onChange={(e) => handleInputChange(param, e.target.value)}
            />
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        <button className="save-btn" onClick={handleSaveResume}>
          Save Resume
        </button>

        {loading && <Loader />}
        {response && (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
