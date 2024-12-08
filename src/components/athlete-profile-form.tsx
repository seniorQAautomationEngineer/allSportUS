'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent } from './ui/card';
import Select from 'react-select';
import sportConfigs, { SportParameter } from '../data/sportConfigs';
import femaleSports from '../data/FemaleSports';
import maleSports from '../data/MaleSports';

interface AthleteProfileFormProps {
  onSave: (data: any) => void;
  initialData?: any;
}

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

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: '38px',
    backgroundColor: 'white',
    borderColor: '#e2e8f0',
    borderRadius: '0.25rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#cbd5e1',
    },
  }),
};

export function AthleteProfileForm({ onSave, initialData = {} }: AthleteProfileFormProps) {
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
          <div key={field.name}>
            <h2 className="text-base font-semibold mb-2">{field.label}</h2>
            <div className="grid grid-cols-2 gap-3">
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
                    className="w-5 h-5 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                  />
                  <label htmlFor={`${field.name}-${option}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {renderConditionalFields(field)}
          </div>
        );
      case 'text':
        return (
          <div key={field.name}>
            <h2 className="text-base font-semibold mb-1">{field.label}</h2>
            <input
              type="text"
              placeholder={field.placeholder}
              value={formData.additionalData[field.name] || ''}
              onChange={(e) => handleDataChange(field.name, e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-[#4285F4] focus:border-[#4285F4]"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderConditionalFields = (field: SportParameter) => {
    if (!field.conditionalFields) return null;

    return Object.entries(field.conditionalFields).map(([option, conditionalFields]) => {
      if (!formData.additionalData[field.name]?.includes(option)) return null;

      return conditionalFields.map((conditionalField) => renderField(conditionalField));
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-sm">
      <div className="bg-[#4285F4] py-3 px-4">
        <h1 className="text-xl font-semibold text-white">Athlete Profile</h1>
      </div>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            {/* Gender Selection */}
            <div>
              <h2 className="text-base font-semibold mb-1">Gender</h2>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value as 'male' | 'female' })}
                className="flex gap-4"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="female" id="female" className="w-5 h-5" />
                  <Label htmlFor="female" className="ml-2 text-sm">Female</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="male" id="male" className="w-5 h-5" />
                  <Label htmlFor="male" className="ml-2 text-sm">Male</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Sport Selection */}
            {formData.gender && (
              <div>
                <h2 className="text-base font-semibold mb-1">Select Sport</h2>
                <Select
                  options={sportsOptions[formData.gender]}
                  value={
                    formData.sport
                      ? { value: formData.sport, label: sportsOptions[formData.gender].find((s) => s.value === formData.sport)?.label || '' }
                      : null
                  }
                  onChange={(option) =>
                    setFormData({ ...formData, sport: option?.value || '' })
                  }
                  placeholder="Select a sport"
                  styles={customSelectStyles}
                />
              </div>
            )}

            {/* Sport-Specific Fields */}
            {formData.sport &&
              sportConfigs[formData.sport]?.fields.map(renderField)}
          </div>

          {/* Save Button */}
          {formData.gender && (
            <Button
              type="submit"
              className="w-full py-2.5 text-sm font-medium bg-[#4285F4] hover:bg-[#3b7de2] text-white rounded"
            >
              Save Profile
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
