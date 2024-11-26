import React, { useState, useEffect } from "react";
import Header from './ui/Header';
import Footer from './ui/Footer';
import sportConfigs from "./configs/sportConfigs";
import Loader from "./loader/Loader";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


// Mock function for Firebase Firestore
const addDoc = async (collection: any, data: any) => {
  console.log("Saving resume:", data);
  // In a real app, this would save to Firestore
  return Promise.resolve();
};

// Mock function for OpenAI API call
const callOpenAI = async (prompt: string) => {
  // In a real app, this would call the OpenAI API
  await new Promise(resolve => setTimeout(resolve, 3000));
  return `Mock response for ${prompt}`;
};

export default function SearchScreen() {
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState("");
  const [parameters, setParameters] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<{[key: string]: string}>({});
  const [response, setResponse] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const sports = {
    male: ["Tennis", "Swimming", "Basketball"],
    female: ["Tennis", "Swimming", "Basketball"]
  };

  useEffect(() => {
    if (sport) {
      setParameters(sportConfigs[sport.toLowerCase()] || []);
      setStatistics({});
    }
  }, [sport]);

  const handleSearch = async () => {
    const isAnyParameterFilled = Object.values(statistics).some(value => value.trim() !== '');
    
    if (!isAnyParameterFilled) {
      setToast({ show: true, message: "Please fill in at least one parameter.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      return;
    }

    setIsSearching(true);
    setResponse("");

    const statEntries = parameters
      .map((param) => `${param}: ${statistics[param] || "N/A"}`)
      .join(', ');

    const prompt = `Based on the provided athletic profile, identify the top 10 NCAA Division 1 universities for a ${gender} ${sport} player. Include detailed responses focusing on academic and athletic reputation, team performance, and program fit. Athletic Stats:\n${statEntries}\nPlease include the names, emails, and contact details of the head coaches, along with a tailored sample outreach email for student-athletes. Ensure the email aligns with the sport and gender context provided, and emphasizes the athlete's suitability for the program.`;

    try {
      const result = await callOpenAI(prompt);
      setResponse(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveResume = async () => {
    if (!gender || !sport) {
      setToast({ show: true, message: "Please select both gender and sport before saving the resume.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      return;
    }

    const isAnyParameterFilled = Object.values(statistics).some(value => value.trim() !== '');
    if (!isAnyParameterFilled) {
      setToast({ show: true, message: "Please fill in at least one parameter before saving the resume.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      return;
    }

    try {
      const resumeData = {
        gender,
        sport,
        parameters: statistics,
        createdAt: new Date().toISOString(),
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      };

      await addDoc(null, resumeData);

      setToast({ show: true, message: "Resume saved successfully!", type: "success" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    } catch (error) {
      console.error("Error saving resume:", error);
      setToast({ show: true, message: "Failed to save resume. Please try again.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">College Scholarship Finder</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="gender-select" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    id="gender-select"
                    className="w-full p-2 border rounded"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      setSport("");
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="sport-select" className="block text-sm font-medium text-gray-700">
                    Sport
                  </label>
                  <select
                    id="sport-select"
                    className="w-full p-2 border rounded"
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    disabled={!gender}
                  >
                    <option value="">Select Sport</option>
                    {gender && sports[gender as keyof typeof sports].map((sport) => (
                      <option key={sport} value={sport.toLowerCase()}>
                        {sport}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {parameters.map((param) => (
                <div key={param} className="space-y-1">
                  <label htmlFor={`param-${param}`} className="block text-sm font-medium text-gray-700">
                    {param}
                  </label>
                  <input
                    id={`param-${param}`}
                    type="text"
                    className="w-full p-2 border rounded"
                    value={statistics[param] || ""}
                    onChange={(e) => setStatistics(prev => ({ ...prev, [param]: e.target.value }))}
                    placeholder={`Enter ${param}`}
                  />
                </div>
              ))}
              
              <div className="flex gap-4">
                <button 
                  onClick={handleSearch}
                  className={`flex-1 text-white p-2 rounded ${
                    isSearching 
                      ? 'bg-blue-300 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  disabled={isSearching}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
                <button 
                  onClick={handleSaveResume}
                  className="flex-1 bg-white text-blue-500 p-2 rounded border border-blue-500 hover:bg-blue-50"
                >
                  Save Resume
                </button>
              </div>

              {isSearching && (
                <div className="flex justify-center items-center mt-6">
                  <Loader />
                </div>
              )}
              
              {!isSearching && response && (
                <div className="markdown-content mt-6">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {toast.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-4 rounded shadow max-w-sm`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}

