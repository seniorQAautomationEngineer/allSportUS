'use client';

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import sportConfigs from '../data/sportConfigs';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
  

  const renderAdditionalData = () => {
    if (!sportData || !sportData.additionalData) {
      return <p>No additional data available.</p>;
    }

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Additional Data:</h3>
        {Object.entries(sportData.additionalData).map(([key, value]) => {
          // Handle "strokes" field differently
          // if (key === "strokes") {
          //   if (Array.isArray(value) && value.length > 0) {
          //     return (
          //       <motion.div
          //         key={key}
          //         initial={{ opacity: 0, height: 0 }}
          //         animate={{ opacity: 1, height: 'auto' }}
          //         exit={{ opacity: 0, height: 0 }}
          //         transition={{ duration: 0.3 }}
          //         className="bg-gray-50 p-2 rounded mb-2"
          //       >
          //         <Label className="text-sm font-semibold">Strokes:</Label>
          //         <p className="text-sm">{value.join(', ')}</p>
          //       </motion.div>
          //     );
          //   }
          //   // Skip rendering "strokes" if it's empty
          //   return null;
          // }

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
        <h3 className="text-lg font-semibold mb-2">Sport Data:</h3>
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
    <div className="w-full max-w-md mx-auto bg-white shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Athlete Profile</h2>
        <button
          onClick={onEdit}
          className="text-sm text-blue-500 underline hover:text-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {renderSportData()}
      {renderAdditionalData()}

      <button
        onClick={onSearch}
        className={`w-full mt-4 py-2 rounded ${
          isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search NCAA Programs"}
      </button>
    </div>
  );
}
