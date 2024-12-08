import React, { useState } from 'react';
import { AthleteProfileForm } from './athlete-profile-form';
import { AthleteProfileCard } from './athlete-profile-card';

const AthleteProfileSearch: React.FC = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [profileData, setProfileData] = useState<{
    gender: '' | 'male' | 'female';
    sport: string;
    additionalData: Record<string, any>;
    name: string;
  }>({
    gender: '',
    sport: '',
    additionalData: {},
    name: 'Athlete',
  });

  const handleSave = (data: any) => {
    setProfileData({ ...data, name: profileData.name });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
      {isEditing ? (
        <AthleteProfileForm onSave={handleSave} initialData={profileData} />
      ) : (
        <AthleteProfileCard
                      name={profileData.name}
                      gender={profileData.gender}
                      sport={profileData.sport}
                      additionalData={profileData.additionalData}
                      onEdit={handleEdit} onSearch={function (): void {
                          throw new Error('Function not implemented.');
                      } }        />
      )}
    </div>
  );
};

export default AthleteProfileSearch;
