import React, { useState, useEffect } from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { AthleteProfileForm } from "./athlete-profile-form";
import { AthleteProfileCard } from "./athlete-profile-card";
import { SearchResults } from "./search-results";
import Select from "react-select";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import Loader from "./loader/Loader"; // Custom Loader Component
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import axios from "axios";
import femaleSports from "src/data/FemaleSports";
import maleSports from "src/data/MaleSports";
import sportConfigs from "./configs/sportConfigs";

const AthleteProfileSearch = ({ name }: { name: string }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [profileData, setProfileData] = useState<any>({});
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [sport, setSport] = useState<{ value: string; label: string } | null>(null);
  const [parameters, setParameters] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const sportsOptions = {
    male: maleSports.map((sport) => ({
      value: sport.name.toLowerCase(),
      label: `${sport.emoji} ${sport.name}`,
    })),
    female: femaleSports.map((sport) => ({
      value: sport.name.toLowerCase(),
      label: `${sport.emoji} ${sport.name}`,
    })),
  };

  useEffect(() => {
    if (sport) {
      setParameters(sportConfigs[sport.value] || []);
      setStatistics({});
    }
  }, [sport]);

  const handleSave = (data: any) => {
    setProfileData({ ...data, name });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSearchResults(null);
  };

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
    setSearchResults(null);

    const statEntries = parameters
      .map((param) => `${param}: ${statistics[param] || "N/A"}`)
      .join(", ");

    const prompt = `Provide recommendations for a ${gender} ${sport?.label} player based on stats: ${statEntries}`;

    try {
      const apiResponse = await axios.post("https://api.openai.com/v1/completions", {
        model: "text-davinci-003",
        prompt,
        max_tokens: 500,
        temperature: 0.7,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`, // Ensure API key is set in environment
        },
      });

      const result = apiResponse.data.choices[0]?.text.trim() || "No response.";
      const parsedResults = result.split("\n").map((line: any) => ({ name: line, details: line })); // Mock parsing for simplicity
      setSearchResults(parsedResults);
    } catch (error) {
      console.error("Error:", error);
      setToast({
        show: true,
        message: "Error fetching data. Try again.",
        type: "error",
      });
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
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AthleteProfileForm onSave={handleSave} initialData={profileData} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AthleteProfileCard
              name={name}
              sport={profileData.sport || "Sport"}
              gender={profileData.gender || "Gender"}
              onEdit={handleEdit}
              onSearch={handleSearch}
              sportData={profileData.sportData || {}}
              isLoading={isSearching}
            />
            {isSearching && (
              <Card className="mt-8 w-full mx-auto overflow-hidden">
                <CardContent className="p-6 min-h-[200px] flex items-center justify-center">
                  <Loader />
                  <span className="text-sm">Searching NCAA Programs...</span>
                </CardContent>
              </Card>
            )}
            {searchResults && <SearchResults results={searchResults} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* <div className="mt-4">
        <h2 className="text-lg font-bold">Advanced Search</h2>
        <div className="grid grid-cols-2 gap-4">
          <Select
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            placeholder="Select Gender"
            value={gender ? { value: gender, label: gender.charAt(0).toUpperCase() + gender.slice(1) } : null}
            onChange={(option) => {
              setGender(option?.value || "");
              setSport(null);
            }}
          />
          <Select
            options={gender ? sportsOptions[gender] : []}
            placeholder="Select Sport"
            value={sport}
            onChange={(option) => setSport(option)}
            isDisabled={!gender}
          />
        </div>
        {parameters.map((param) => (
          <div key={param} className="mt-2">
            <label>{param}</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={statistics[param] || ""}
              onChange={(e) =>
                setStatistics((prev) => ({ ...prev, [param]: e.target.value }))
              }
            />
          </div>
        ))}
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSaveResume}
        >
          Save Resume
        </button>
      </div> */}
      <Footer />
      {toast.show && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AthleteProfileSearch;
