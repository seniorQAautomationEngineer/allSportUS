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

interface AthleteProfileFormProps {
  onSave: (data: any) => void;
  initialData?: {
    gender: 'male' | 'female' | '';
    sport: string;
    additionalData: Record<string, any>;
  };
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

export function AthleteProfileForm({ onSave, initialData = { gender: '', sport: '', additionalData: {} } }: AthleteProfileFormProps) {
  const [formData, setFormData] = useState<{
    gender: 'male' | 'female' | '';
    sport: string;
    additionalData: Record<string, any>;
  }>({
    gender: initialData.gender || '',
    sport: initialData.sport || '',
    additionalData: initialData.additionalData || {},
  });

  const handleDataChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      additionalData: {
        ...prev.additionalData,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderField = (field: SportParameter) => {
    switch (field.type) {
      case 'checkbox':
        return (
          <div key={field.name} className="mb-4"> {/* Added margin-bottom */}
            <h2 className="text-base font-semibold mb-2">{field.label}</h2>
            <div className="grid grid-cols-2 gap-3 mb-4"> {/* Added margin-bottom */}
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${field.name}-${option}`}
                    checked={formData.additionalData[field.name]?.includes(option)}
                    onChange={(e) => {
                      const currentValues = formData.additionalData[field.name] || [];
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
              formData.additionalData[field.name]?.map((selectedOption: string) =>
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
                {/* <div className="space-y-4 p-3 rounded-md"></div>
                <div className="space-y-1 mb-3 last:mb-0"></div> */}
                <Label className="ext-sm font-normal">{field.label}:</Label>
                <Input
                  id={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData.additionalData[field.name] || ''}
                  onChange={(e) => handleDataChange(field.name, e.target.value)}
                  className="w-full h-10 text-base"
                />
              </div>
            </motion.div>
            </AnimatePresence>
          // <div key={field.name}>
          //   <h2 className="text-base font-semibold mb-1">{field.label}</h2>
          //   <input
          //     type="text"
          //     placeholder={field.placeholder}
          //     value={formData.additionalData[field.name] || ''}
          //     onChange={(e) => handleDataChange(field.name, e.target.value)}
          //     className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          //   />
          // </div>
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
          {/* Gender Selection */}
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

            {/* Sport Selection */}
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
                      setFormData({ ...formData, sport: option?.value || '' })
                    }
                    isClearable
                    isSearchable
                    placeholder="Select a sport"
                />
              </div>
            )}

            {/* Sport-Specific Fields */}
            {formData.sport &&
              sportConfigs[formData.sport].fields.map((field) => renderField(field))}
          </div>

          {/* Save Button */}
          {formData.gender && (
            <Button
              type="submit"
              className="w-full py-2.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Save Profile
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
    
  );
}
