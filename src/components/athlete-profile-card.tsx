'use client';

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from 'framer-motion';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';

interface AthleteProfileCardProps {
  onEdit: () => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function AthleteProfileCard({
  onEdit,
  onSearch,
  isLoading,
}: AthleteProfileCardProps) {
  const location = useLocation() as { state: { userId?: string } };
  const userId = location.state?.userId || localStorage.getItem("userId");

  const [sportData, setSportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
  
    const fetchSportData = async () => {
      if (!userId) {
        console.error("User ID is missing.");
        setError("User ID is missing. Please log in again.");
        setLoading(false);
        return;
      }
  
      console.log("Fetching data for userId:", userId);
      try {
        const userRef = doc(db, "users", userId);
        let retries = 3;
  
        while (retries > 0) {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            if (isMounted) {
              setSportData(userDoc.data().sportData || {});
              return;
            }
          }
          retries--;
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        }
  
        if (isMounted) {
          console.error("User data not found in the database.");
          setError("User data not found. Please complete your profile.");
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching sport data:", err);
          setError("Failed to fetch sport data. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchSportData();
  
    return () => {
      isMounted = false; // Prevent state updates after unmount
    };
  }, [userId]);
  

  const renderSportStatistic = () => {
    if (!sportData || !sportData.sportStatistic) {
      return <p>No sport statitic available.</p>;
    }

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Statistic:</h3>
        {Object.entries(sportData.sportStatistic).map(([key, value]) => {
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 p-2 rounded mb-2"
            >
              <Label className="text-sm font-semibold">{key}:</Label>
              <p className="text-sm">
                {typeof value === 'string' || typeof value === 'number'
                  ? value
                  : JSON.stringify(value)}
              </p>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderSportData = () => {
    if (!sportData) {
      return <p>No sport data available.</p>;
    }

    return (
      <div className="mt-4">
        {/* <h3 className="text-lg font-semibold mb-2">Sport Data:</h3> */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 p-2 rounded mb-2"
        >
          <Label className="text-sm font-semibold">Sport:</Label>
          <p className="text-sm">{sportData.sport || 'N/A'}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 p-2 rounded mb-2"
        >
          <Label className="text-sm font-semibold">Gender:</Label>
          <p className="text-sm">{sportData.gender || 'N/A'}</p>
        </motion.div>
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-white shadow-sm">
      <div className="bg-blue-500 py-3 px-4">
        <h1 className="text-xl font-semibold text-white">Athlete Profile</h1>
      </div>
      <CardContent className="p-4">
      <button
        onClick={onEdit}
        className="text-sm text-blue-500 underline hover:text-blue-600"
      >
        Edit Profile
      </button>
      {renderSportData()}
      {renderSportStatistic()}
      <button
        onClick={onSearch}
        className={`w-full mt-4 py-2 rounded ${
          isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search NCAA Programs"}
      </button>
    </CardContent>
  </Card>
  );
}
