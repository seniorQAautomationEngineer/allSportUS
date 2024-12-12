'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent } from './ui/card';
import Select from 'react-select';
import maleSports from '../data/MaleSports';
import femaleSports from '../data/FemaleSports';
import sportConfigs, { SportParameter } from '../data/sportConfigs';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface AthleteProfileFormProps {
  onSave: (data: any) => void;
}

const sportsOptions: Record<'male' | 'female', { value: string; label: string }[]> = {
  male: maleSports.map((sport) => ({
    value: sport.name.toLowerCase(),
    label: `${sport.emoji} ${sport.name}`,
  })),
  female: femaleSports.map((sport) => ({
    value: sport.name.toLowerCase(),
    label: `${sport.emoji} ${sport.name}`,
  })),
};

export function AthleteProfileForm({ onSave }: AthleteProfileFormProps) {
  const location = useLocation() as { state: { userId?: string } };
  const userId = location.state?.userId || localStorage.getItem("userId");

  const [formData, setFormData] = useState<{
    gender: 'male' | 'female' | '';
    sport: string;
    sportStatistic: Record<string, any>;
  }>({
    gender: '',
    sport: '',
    sportStatistic: {},
  });

  const handleDataChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      sportStatistic: {
        ...prev.sportStatistic,
        [field]: value, // Update or add the field in sportStatistic
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userId) {
      alert("User ID is missing. Please log in and try again.");
      return;
    }
  
    try {
      // Define the new sportData object
      const updatedSportData = {
        gender: formData.gender,
        sport: formData.sport,
        sportStatistic: formData.sportStatistic,
      };
  
      const userRef = doc(db, "users", userId);
  
      // Replace the sportData field explicitly (remove old data)
      await setDoc(
        userRef,
        {
          sportData: updatedSportData, // Fully replace sportData
        },
        { merge: false } // Disable merging to avoid retaining old fields
      );
  
      console.log("Sport data fully replaced successfully.");
      onSave(updatedSportData); // Optional callback for additional actions
    } catch (error) {
      console.error("Error replacing sport data:", error);
      alert("Failed to save profile. Please try again.");
    }
  };
  

  const renderField = (field: SportParameter) => {
    switch (field.type) {
      case 'checkbox':
        return (
          <div key={field.name} className="mb-4">
            <h2 className="text-base font-semibold mb-2">{field.label}</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${field.name}-${option}`}
                    checked={formData.sportStatistic[field.name]?.includes(option)}
                    onChange={(e) => {
                      const currentValues = formData.sportStatistic[field.name] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);

                      handleDataChange(field.name, newValues);
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor={`${field.name}-${option}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {field.conditionalFields &&
              (formData.sportStatistic[field.name] || []).map((selectedOption: string) =>
                field.conditionalFields?.[selectedOption]?.map((conditionalField) =>
                  renderField(conditionalField)
                )
              )}
          </div>
        );
      case 'text':
        return (
          <AnimatePresence key={field.name}>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-1 p-1 pt-0 bg-gray-50 rounded-lg mb-1">
                <Label className="text-sm font-normal">{field.label}:</Label>
                <Input
                  id={field.name}
                  placeholder={field.placeholder}
                  value={formData.sportStatistic[field.name] || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Validate numeric or time formats
                    if (/^\d*\.?\d*\.?\d*$/.test(inputValue)) {
                      handleDataChange(field.name, inputValue);
                    }
                  }}
                  className="w-full h-10 text-base"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white shadow-sm">
      <div className="bg-blue-500 py-3 px-4">
        <h1 className="text-xl font-semibold text-white">Athlete Profile</h1>
      </div>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold mb-1">Gender</h2>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value as 'male' | 'female' })
                }
                className="flex gap-4"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="female" id="female" className="w-5 h-5" />
                  <Label htmlFor="female" className="ml-2 text-sm">
                    Female
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="male" id="male" className="w-5 h-5" />
                  <Label htmlFor="male" className="ml-2 text-sm">
                    Male
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.gender && (
              <div>
                <label htmlFor="sport-select" className="block text-sm font-medium text-gray-700">
                  Sport
                </label>
                <Select
                  id="sport-select"
                  className="react-select-container mt-2"
                  classNamePrefix="react-select"
                  options={sportsOptions[formData.gender]}
                  value={
                    formData.sport
                      ? {
                          value: formData.sport,
                          label: sportConfigs[formData.sport]?.name || '',
                        }
                      : null
                  }
                  onChange={(option) =>
                    setFormData({
                      ...formData,
                      sport: option?.value || '',
                      sportStatistic: {}, // Reset sportStatistic when switching sports
                    })
                  }
                  isClearable
                  isSearchable
                  placeholder="Select a sport"
                />
              </div>
            )}

            {formData.sport &&
              sportConfigs[formData.sport].fields.map((field) => renderField(field))}
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
