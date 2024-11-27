import React, { useState, useEffect } from "react";
import Header from './ui/Header';
import Footer from './ui/Footer';
import sportConfigs from "./configs/sportConfigs";
import Loader from "./loader/Loader";
import axios from 'axios';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";;

export default function SearchScreen() {
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState("");
  const [parameters, setParameters] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<{ [key: string]: string }>({});
  const [response, setResponse] = useState<string | null>(null);
  const [parsedResponse, setParsedResponse] = useState<any[]>([]);
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
    const isAnyParameterFilled = Object.values(statistics).some(value => value.trim() !== '' && !isNaN(Number(value)));

    if (!isAnyParameterFilled) {
      setToast({ show: true, message: "Please fill in at least one parameter with valid numeric data.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      return;
    }

    setIsSearching(true);
    setResponse(null);
    setParsedResponse([]);

    const statEntries = parameters
      .map((param) => `${param}: ${statistics[param] || "N/A"}`)
      .join(', ');

 
      const universityReportInstruction = "Please include the names, emails, and contact details of the head coaches. Ensure the email aligns with the sport and gender context provided, and emphasizes the athlete's suitability for the program.";

      const prompt = `Based on the provided athletic profile, identify the top 20 NCAA Division 1 universities for a ${gender} ${sport} player. Include detailed responses focusing on academic and athletic reputation, team performance, and program fit. Athletic Stats:\n${statEntries}\n${universityReportInstruction}`;
    try {
      const apiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4-turbo",
          temperature: 0.7,
          max_tokens: 1500,
          messages: [
            {
              role: 'system',
              content: `You are an expert in NCAA sports recruitment and university rankings. Your task is to provide comprehensive recommendations, including contact details of head coaches. Ensure responses are concise, relevant, and actionable.`
            },
            {
              role: 'assistant',
              content: `Make sure to address NCAA Division 1 recruitment requirements comprehensively. Use precise and verifiable information to construct recommendations, keeping in mind sport and gender specificity.`
            },
            {
              role: 'assistant',
              content: `In cases where direct contact details are unavailable, provide resources or steps the user can take to find this information on official NCAA or university websites.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
        },
        {
          headers: {
            Authorization: ``,
            "Content-Type": "application/json",
          },
        }
      );

      const result = apiResponse.data.choices[0]?.message?.content || "No valid response.";
      setResponse(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data. Please try again later.");
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
      };

      await addDoc(collection(db, "resumes"), resumeData);

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
        <div className="container mx-auto px-4 max-w-4xl"> {/* Increased max-width for table */}
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
               <div className="markdown-content mt-6 space-y-6">
               <ReactMarkdown 
                 remarkPlugins={[remarkGfm]}
                 components={{
                   h1: ({ node, ...props }) => (
                     <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />
                   ),
                   h2: ({ node, ...props }) => (
                     <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2" {...props} />
                   ),
                   p: ({ node, ...props }) => (
                     <p className="text-base leading-relaxed mb-2" {...props} />
                   ),
                   a: ({ node, ...props }) => (
                     <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />
                   ),
                   strong: ({ node, ...props }) => (
                     <strong className="font-semibold text-gray-900" {...props} />
                   ),
                 }}
               >
                 {response}
               </ReactMarkdown>
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