"use client"

import { useState } from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

export default function SearchScreen() {
  const [gender, setGender] = useState("")
  const [sport, setSport] = useState("")
  const [showParameters, setShowParameters] = useState(false)
  const [parameters, setParameters] = useState(["", "", ""])
  const [response, setResponse] = useState("")
  const [toast, setToast] = useState({ show: false, message: "" })

  const sports = {
    male: ["Football", "Basketball", "Baseball"],
    female: ["Volleyball", "Gymnastics", "Soccer"]
  }

  const handleSearch = async () => {
    setResponse(`Based on the provided parameters for ${gender} athlete in ${sport}:
    ${parameters.join(", ")}
    
    This profile indicates a high-potential athlete with strong fundamentals. 
    Key strengths include physical attributes and technical skills. 
    Recommended for further scouting and development programs.`)
  }

  const handleSaveResume = () => {
    setToast({ show: true, message: "Resume has been saved successfully!" })
    setTimeout(() => setToast({ show: false, message: "" }), 3000)
  }

  const handleRate = (isGood: boolean) => {
    setToast({ show: true, message: `You rated this response as ${isGood ? "helpful" : "not helpful"}` })
    setTimeout(() => setToast({ show: false, message: "" }), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Athlete Search</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="w-full p-2 border rounded"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)
                    setSport("")
                    setShowParameters(false)
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <select
                  className="w-full p-2 border rounded"
                  value={sport}
                  onChange={(e) => {
                    setSport(e.target.value)
                    setShowParameters(true)
                  }}
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

              {showParameters && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <input
                      key={i}
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder={`Parameter ${i}`}
                      value={parameters[i-1]}
                      onChange={(e) => {
                        const newParams = [...parameters]
                        newParams[i-1] = e.target.value
                        setParameters(newParams)
                      }}
                    />
                  ))}
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={handleSearch}
                      className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                      disabled={parameters.some(p => !p)}
                    >
                      Search
                    </button>
                    <button 
                      onClick={handleSaveResume}
                      className="flex-1 bg-white text-blue-500 p-2 rounded border border-blue-500 hover:bg-blue-50 disabled:bg-gray-100 disabled:text-gray-400"
                      disabled={!response}
                    >
                      Save Resume
                    </button>
                  </div>
                </div>
              )}

              {response && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
                    {response}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">Rate this response:</div>
                    <div className="flex gap-2">
                      <button
                        className="p-2 border rounded hover:bg-gray-100"
                        onClick={() => handleRate(true)}
                      >
                        👍
                      </button>
                      <button
                        className="p-2 border rounded hover:bg-gray-100"
                        onClick={() => handleRate(false)}
                      >
                        👎
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow">
          {toast.message}
        </div>
      )}
    </div>
  )
}

