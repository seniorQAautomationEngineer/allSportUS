import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore configuration
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import allCountries from "src/data/AllCountries";

// const countryOptions = [
//   { value: "United States", label: "United States" },
//   { value: "Canada", label: "Canada" },
//   { value: "United Kingdom", label: "United Kingdom" },
//   { value: "Australia", label: "Australia" },
//   { value: "India", label: "India" },
// ];

const AdditionalInfo: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState<{ value: string; label: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      if (!country) {
        throw new Error("Please select a country.");
      }

      // Save additional user information to Firestore
      await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        age: parseInt(age, 10),
        country: country.value,
        createdAt: new Date().toISOString(),
      });

      console.log("Additional information saved successfully.");
      navigate("/"); // Redirect to home or dashboard
    } catch (error: any) {
      console.error("Error saving additional information:", error);
      setErrorMessage(error.message || "Failed to save information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Additional Information</h1>
          <p className="text-gray-600">
            Complete your registration by providing the details below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Field */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Country Dropdown */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <Select
              id="country"
              className="react-select-container mt-2"
              classNamePrefix="react-select"
              options={allCountries}
              placeholder="Select a country"
              isClearable
              isSearchable
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {loading ? "Saving..." : "Save Information"}
          </button>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdditionalInfo;
