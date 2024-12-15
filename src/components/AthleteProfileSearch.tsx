'use client';

import React, { useState, useEffect } from 'react';
import { AthleteProfileForm } from './athlete-profile-form';
import { AthleteProfileCard } from './athlete-profile-card';
import { SearchResults } from './search-results';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AthleteProfileSearch: React.FC = () => {
  const location = useLocation() as { state: { userId?: string } };
  const userId = location.state?.userId || localStorage.getItem("userId");

  const [isEditing, setIsEditing] = useState(true);
  const [profileData, setProfileData] = useState<{
    gender: '' | 'male' | 'female';
    sport: string;
    sportStatistic: Record<string, any>;
    additionalData: Record<string, any>;
    name: string;
  }>({
    gender: '',
    sport: '',
    sportStatistic: {},
    additionalData: {},
    name: 'Athlete',
  });

  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const fetchAthleteData = async () => {
      if (!userId) {
        setError("User ID is missing. Please log in again.");
        console.error("Error: Missing user ID");
        setLoading(false);
        return;
      }
  
      try {
        console.log("Fetching data for user ID:", userId);
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          const fetchedData = userDoc.data().sportData || {};
          console.log("Fetched data:", fetchedData);
  
          setProfileData({
            gender: fetchedData.gender || '',
            sport: fetchedData.sport || '',
            sportStatistic: fetchedData.sportStatistic || {},
            additionalData: fetchedData.additionalData || {},
            name: 'Athlete',
          });
        } else {
          console.warn("No athlete profile found for user ID:", userId);
          setError("Athlete profile not found. Please complete your profile.");
        }
      } catch (err) {
        console.error("Error fetching athlete profile:", err);
        setError("Failed to fetch athlete profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAthleteData();
  }, [userId]);
  

  const handleSave = (data: any) => {
    setProfileData({ ...data, name: profileData.name });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setResponse(null);

    const universityReportInstruction = "Please include the names, emails, and contact details of the head coaches. Ensure the email aligns with the sport and gender context provided, and emphasizes the athlete's suitability for the program.";

    const prompt = `Based on the provided athletic profile, identify the top 20 NCAA Division 1 universities for a ${profileData.gender} ${profileData.sport} player. Include detailed responses focusing on academic and athletic reputation, team performance, and program fit. Athletic Stats:\n${JSON.stringify(profileData.sportStatistic)}\n${universityReportInstruction}`;
    
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

  if (loading) {
    return <p>Loading athlete profile...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6 md:p-8">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AthleteProfileForm onSave={handleSave} profileData={profileData} />
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
                formData={profileData}
                onEdit={handleEdit}
                onSearch={handleSearch}
                isLoading={isSearching}
              />
              {isSearching && (
                <Card className="mt-8 w-full mx-auto overflow-hidden">
                  <CardContent className="p-6 min-h-[200px] flex items-center justify-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-sm">Searching NCAA Programs...</span>
                    </div>
                  </CardContent>
                </Card>
              )}
              {response && <SearchResults results={response} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default AthleteProfileSearch;
