'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronRight } from 'lucide-react';
import Select from 'react-select';
import maleSports from 'src/data/MaleSports';
import femaleSports from 'src/data/FemaleSports';
import sportConfigs from './configs/sportConfigs';

interface AthleteProfileFormProps {
  onSave: (data: any) => void;
  initialData: { gender: string; sport: string; additionalData: Record<string, any> };
}

interface SportOption {
  value: string;
  label: string;
}

const sportsOptions: Record<string, SportOption[]> = {
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
    minHeight: '42px',
    height: '42px',
    backgroundColor: 'white',
    borderColor: '#e2e8f0',
    borderRadius: '0.75rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#cbd5e1'
    }
  }),
  valueContainer: (base: any) => ({
    ...base,
    height: '42px',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    padding: '8px 12px',
    fontSize: '0.875rem',
    backgroundColor: state.isSelected ? '#0088FF' : state.isFocused ? '#f1f5f9' : 'white',
    '&:active': {
      backgroundColor: '#0088FF'
    }
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  }),
  singleValue: (base: any) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  placeholder: (base: any) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: '8px',
  }),
};

export function AthleteProfileForm({ onSave, initialData }: AthleteProfileFormProps) {
  const [gender, setGender] = useState<string>(initialData.gender || '');
  const [sport, setSport] = useState<SportOption | null>(initialData.sport ? { value: initialData.sport, label: initialData.sport } : null);
  const [additionalData, setAdditionalData] = useState<Record<string, any>>(initialData.additionalData || {});
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  useEffect(() => {
    setShowAdditionalFields(!!gender && !!sport);
  }, [gender, sport]);

  const handleDataChange = (field: string, value: any) => {
    setAdditionalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender || !sport) {
      alert('Please select both gender and sport.');
      return;
    }
    onSave({ gender, sport: sport.value, additionalData });
  };

  const renderSportSpecificFields = () => {
    if (!sport) return null;

    switch (sport.value) {
      case 'swimming':
        return (
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Best Times</Label>
            {['50m Freestyle', '100m Freestyle'].map((event) => (
              <div key={event} className="space-y-2">
                <Label htmlFor={event} className="text-sm">
                  {event}
                </Label>
                <Input
                  id={event}
                  type="text"
                  placeholder="MM:SS.ms"
                  value={additionalData[event] || ''}
                  onChange={(e) => handleDataChange(event, e.target.value)}
                />
              </div>
            ))}
          </div>
        );
      default:
        return <p className="text-sm text-gray-500">No specific fields for the selected sport.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
        <CardHeader className="p-6 bg-[#0088FF]">
          <CardTitle className="text-3xl font-bold text-white">Athlete Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Gender</h2>
                <p className="text-base text-gray-600">
                  Select your gender for appropriate team placement
                </p>
                <RadioGroup value={gender} onValueChange={setGender} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="w-5 h-5" />
                    <Label htmlFor="male" className="text-base">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="w-5 h-5" />
                    <Label htmlFor="female" className="text-base">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Select Sport</h2>
                <p className="text-base text-gray-600">
                  Choose the sport you participate in
                </p>
                <Select
                  options={gender ? sportsOptions[gender] : []}
                  value={sport}
                  onChange={(option) => setSport(option)}
                  isDisabled={!gender}
                  placeholder="Select a sport"
                  styles={customSelectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>

              <AnimatePresence>
                {showAdditionalFields && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {renderSportSpecificFields()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-[#0088FF] hover:bg-[#0070CC] text-white rounded-xl"
            >
              Save Profile
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

