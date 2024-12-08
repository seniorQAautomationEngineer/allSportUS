'use client';

import sportConfigs, { SportParameter, SportConfig } from '../data/sportConfigs';

interface AthleteProfileCardProps {
  name: string;
  sport: string;
  gender: string;
  additionalData: Record<string, any>;
  onEdit: () => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function AthleteProfileCard({
  name,
  sport,
  gender,
  additionalData,
  onEdit,
  onSearch,
}: AthleteProfileCardProps) {
  const renderAdditionalData = () => {
    if (!sport || !sportConfigs[sport]) return null;

    const config = sportConfigs[sport];

    return (
      <div className="mt-4">
        {config.fields.map((field) => {
          if (field.type === 'checkbox' && additionalData[field.name]?.length > 0) {
            // Render checkboxes
            return (
              <div key={field.name}>
                <h3 className="text-base font-semibold">{field.label}:</h3>
                <p className="text-sm">{additionalData[field.name]?.join(', ') || 'N/A'}</p>

                {/* Conditional Fields */}
                {additionalData[field.name].map((option: string) => {
                  const conditionalFields = field.conditionalFields?.[option];
                  if (!conditionalFields) return null;

                  return conditionalFields.map((conditionalField) => {
                    const value = additionalData[conditionalField.name] || 'N/A';
                    return (
                      <p key={conditionalField.name} className="text-sm">
                        <strong>{conditionalField.label}:</strong> {value}
                      </p>
                    );
                  });
                })}
              </div>
            );
          } else if (field.type === 'text') {
            // Render text fields
            return (
              <div key={field.name}>
                <h3 className="text-base font-semibold">{field.label}:</h3>
                <p className="text-sm">{additionalData[field.name] || 'N/A'}</p>
              </div>
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
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Search NCAA Programs
      </button>
    </div>
  );
}
