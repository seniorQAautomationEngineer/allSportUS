import React, { useState, useEffect } from "react";
import Select from "react-select";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import sportConfigs from "./configs/sportConfigs";
import Loader from "./loader/Loader";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import femaleSports from "src/data/FemaleSports";
import maleSports from "src/data/MaleSports";

export default function SearchScreen() {
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [sport, setSport] = useState<{ value: string; label: string } | null>(null);
  const [parameters, setParameters] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<{ [key: string]: string }>({});
  const [response, setResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const sportsOptions = {
    male: maleSports.map((sport) => ({ value: sport.toLowerCase(), label: sport })),
    female: femaleSports.map((sport) => ({ value: sport.toLowerCase(), label: sport })),
  };

  useEffect(() => {
    if (sport) {
      setParameters(sportConfigs[sport.value] || []);
      setStatistics({});
    }
  }, [sport]);

  const handleSearch = async () => {
    const isAnyParameterFilled = Object.values(statistics).some(
      (value) => value.trim() !== "" && !isNaN(Number(value))
    );

    if (!isAnyParameterFilled) {
      setToast({
        show: true,
        message: "Please fill in at least one parameter with valid numeric data.",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      return;
    }

    setIsSearching(true);
    setResponse(null);

    const statEntries = parameters
      .map((param) => `${param}: ${statistics[param] || "N/A"}`)
      .join(", ");

    const prompt = `Provide recommendations for a ${gender} ${sport?.label} player based on stats: ${statEntries}`;

    try {
      const apiResponse = await axios.post("https://api.example.com", { prompt });
      const result = apiResponse.data.response || "No response.";
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error fetching data. Try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveResume = async () => {
    if (!gender || !sport) {
      setToast({
        show: true,
        message: "Please select both gender and sport before saving the resume.",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      return;
    }

    const isAnyParameterFilled = Object.values(statistics).some(
      (value) => value.trim() !== ""
    );
    if (!isAnyParameterFilled) {
      setToast({
        show: true,
        message: "Please fill in at least one parameter before saving the resume.",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      return;
    }

    try {
      const resumeData = {
        gender,
        sport: sport.label,
        parameters: statistics,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "resumes"), resumeData);

      setToast({ show: true, message: "Resume saved successfully!", type: "success" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    } catch (error) {
      console.error("Error saving resume:", error);
      setToast({
        show: true,
        message: "Failed to save resume. Please try again.",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">College Scholarship Finder</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender-select" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <Select
                    id="gender-select"
                    className="react-select-container mt-2"
                    classNamePrefix="react-select"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    placeholder="Select Gender"
                    value={gender ? { value: gender, label: gender[0].toUpperCase() + gender.slice(1) } : null}
                    onChange={(selectedOption) => {
                      setGender(selectedOption?.value || "");
                      setSport(null);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="sport-select" className="block text-sm font-medium text-gray-700">
                    Sport
                  </label>
                  <Select
                    id="sport-select"
                    className="react-select-container mt-2"
                    classNamePrefix="react-select"
                    options={gender ? sportsOptions[gender] : []}
                    placeholder="Select a Sport"
                    value={sport}
                    onChange={(selectedOption) => setSport(selectedOption)}
                    isDisabled={!gender}
                  />
                </div>
              </div>

              {parameters.map((param) => (
                <div key={param}>
                  <label htmlFor={`param-${param}`} className="block text-sm font-medium text-gray-700">
                    {param}
                  </label>
                  <input
                    id={`param-${param}`}
                    type="text"
                    className="w-full p-2 border rounded"
                    value={statistics[param] || ""}
                    onChange={(e) =>
                      setStatistics((prev) => ({
                        ...prev,
                        [param]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  onClick={handleSearch}
                  className={`flex-1 text-white p-2 rounded ${
                    isSearching ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isSearching}
                >
                  {isSearching ? "Searching..." : "Search"}
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
        <div className={`fixed inset-0 flex items-center justify-center z-50`}>
          <div className={`${toast.type === "error" ? "bg-red-500" : "bg-green-500"} text-white p-4 rounded`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
