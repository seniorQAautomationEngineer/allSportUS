'use client';

import { useState } from "react";
import sportConfigs from '../data/sportConfigs';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input'
import { Label } from './ui/label'


interface AthleteProfileCardProps {
  name: string;
  sport: string;
  gender: string;
  additionalData: Record<string, any>;
  onEdit: () => void;
  onSearch: () => void;
  isLoading: boolean; // Pass isSearching state from parent
}

export function AthleteProfileCard({
  name,
  sport,
  gender,
  additionalData,
  onEdit,
  onSearch,
  isLoading, // Use the isLoading prop here
}: AthleteProfileCardProps) {
  const renderAdditionalData = () => {
    if (!sport || !sportConfigs[sport]) return null;

    const config = sportConfigs[sport];

    return (
      <div className="mt-4">
      {config.fields.map((field) => {
        if (field.type === 'checkbox' && Array.isArray(additionalData[field.name])) {
          // Render checkboxes and conditional fields
          return (
            <div key={field.name} className="mb-4">
              <h3 className="text-base font-semibold">{field.label}:</h3>
              <p className="text-sm">{additionalData[field.name].join(', ') || 'N/A'}</p>

              <AnimatePresence>
                {additionalData[field.name].map((option: string) => {
                  const conditionalFields = field.conditionalFields?.[option];
                  if (!conditionalFields) return null;

                  return conditionalFields.map((conditionalField) => {
                    const value = additionalData[conditionalField.name] || 'N/A';
                    return (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-semibold mb-2 block">{conditionalField.label}:</Label>
                          <p className="text-sm">{value}</p>
                        </div>
                      </motion.div>
                    );
                  });
                })}
              </AnimatePresence>
            </div>
          );
          } else if (field.type === 'text') {
            // Render text fields
            return (
              <AnimatePresence key={field.name}>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-semibold">{field.label}:</Label>
                    <Input
                      id={field.name}
                      type="text"
                      placeholder="Enter value"
                      value={additionalData[field.name] || 'N/A'}
                      className="w-full h-10 text-base"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              // <div key={field.name}>
              //   <h3 className="text-base font-semibold">{field.label}:</h3>
              //   <p className="text-sm">{additionalData[field.name] || 'N/A'}</p>
              // </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          {name} | {sport} | {gender}
        </h2>
        <button
          onClick={onEdit}
          className="text-sm text-blue-500 underline hover:text-blue-600"
        >
          Edit Profile
        </button>
      </div>

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
