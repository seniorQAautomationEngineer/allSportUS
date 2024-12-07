'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent } from './ui/card';
import Select from 'react-select';
import sportConfigs, { SportParameter } from '../data/sportConfigs';

interface AthleteProfileFormProps {
  onSave: (data: any) => void;
  initialData?: any;
}

interface SportOption {
  value: string;
  label: string;
}

const sportsOptions: SportOption[] = Object.entries(sportConfigs).map(([key, value]) => ({
  value: key,
  label: `${value.name}`,
}));

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: '40px',
    backgroundColor: 'white',
    borderColor: '#e2e8f0',
    borderRadius: '0.5rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#cbd5e1'
    }
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0 12px',
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    padding: '8px 12px',
    backgroundColor: state.isSelected ? '#4285F4' : state.isFocused ? '#f8fafc' : 'white',
    fontSize: '0.875rem',
  }),
  menu: (base: any) => ({
    ...base,
    marginTop: '4px',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }),
  placeholder: (base: any) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  singleValue: (base: any) => ({
    ...base,
    fontSize: '0.875rem',
  }),
};

export function AthleteProfileForm({ onSave, initialData = {} }: AthleteProfileFormProps) {
  const [formData, setFormData] = useState({
    gender: initialData.gender || '',
    sport: initialData.sport || '',
    additionalData: initialData.additionalData || {},
    strokes: initialData.strokes || [],
  });

  const handleDataChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      additionalData: {
        ...prev.additionalData,
        [field]: value,
      },
    }));
  };

  const handleStrokeChange = (stroke: string) => {
    setFormData((prev) => ({
      ...prev,
      strokes: prev.strokes.includes(stroke)
        ? prev.strokes.filter((s: string) => s !== stroke)
        : [...prev.strokes, stroke],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderSportFields = () => {
    if (!formData.sport) return null;

    const config = sportConfigs[formData.sport];
    if (!config) return null;

    return config.fields.map((field: SportParameter) => {
      if (field.type === 'checkbox' && field.options) {
        return (
          <div key={field.name} className="space-y-4">
            <h2 className="text-lg font-semibold">{field.label}</h2>
            <div className="grid grid-cols-2 gap-6">
              {field.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={option.toLowerCase()}
                    checked={formData.additionalData[field.name]?.includes(option)}
                    onChange={(e) => {
                      const currentValues = formData.additionalData[field.name] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      handleDataChange(field.name, newValues);
                    }}
                    className="w-6 h-6 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                  />
                  <label htmlFor={option.toLowerCase()} className="text-lg">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {renderConditionalFields(field, formData.additionalData[field.name] || [])}
          </div>
        );
      } else if (field.type === 'text') {
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-lg font-semibold">
              {field.label}
            </Label>
            <input
              type="text"
              id={field.name}
              placeholder={field.placeholder}
              value={formData.additionalData[field.name] || ''}
              onChange={(e) => handleDataChange(field.name, e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-[#4285F4] focus:border-[#4285F4]"
            />
          </div>
        );
      }
      return null;
    });
  };

  const renderConditionalFields = (field: SportParameter, selectedOptions: string[]) => {
    if (!field.conditionalFields) return null;

    return selectedOptions.flatMap((option) => {
      const conditionalFields = field.conditionalFields?.[option];
      if (!conditionalFields) return [];

      return conditionalFields.map((conditionalField) => (
        <div key={conditionalField.name} className="mt-4 space-y-2">
          <Label htmlFor={conditionalField.name} className="text-lg font-semibold">
            {conditionalField.label}
          </Label>
          <input
            type="text"
            id={conditionalField.name}
            placeholder={conditionalField.placeholder}
            value={formData.additionalData[conditionalField.name] || ''}
            onChange={(e) => handleDataChange(conditionalField.name, e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-[#4285F4] focus:border-[#4285F4]"
          />
        </div>
      ));
    });
  };

  return (
    <Card className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-sm">
      <div className="bg-[#4285F4] p-4">
        <h1 className="text-2xl font-semibold text-white">Athlete Profile</h1>
      </div>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Gender</h2>
              <p className="text-sm text-gray-600 mb-3">
                Select your gender for appropriate team placement
              </p>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                className="flex gap-6"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="female" id="female" className="w-4 h-4" />
                  <Label htmlFor="female" className="ml-2 text-sm">Female</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="male" id="male" className="w-4 h-4" />
                  <Label htmlFor="male" className="ml-2 text-sm">Male</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Select Sport</h2>
              <p className="text-sm text-gray-600 mb-3">
                Choose the sport you participate in
              </p>
              <Select
                options={sportsOptions}
                value={formData.sport ? { value: formData.sport, label: sportConfigs[formData.sport].name } : null}
                onChange={(option) => setFormData({ ...formData, sport: option?.value || '' })}
                placeholder="Select a sport"
                styles={{
                  ...customSelectStyles,
                  control: (base) => ({
                    ...base,
                    minHeight: '40px',
                    fontSize: '0.875rem',
                  }),
                }}
              />
            </div>

            {renderSportFields()}
            {formData.sport === 'swimming' && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Strokes</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'].map((stroke) => (
                    <div key={stroke} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={stroke.toLowerCase()}
                        checked={formData.strokes.includes(stroke)}
                        onChange={() => handleStrokeChange(stroke)}
                        className="w-4 h-4 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                      />
                      <label htmlFor={stroke.toLowerCase()} className="text-sm">
                        {stroke}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full py-2 text-sm font-medium bg-[#4285F4] hover:bg-[#3b7de2] text-white rounded-lg mt-4"
          >
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

