import React, { useState } from 'react';
import { AthleteProfileForm } from './athlete-profile-form';
import { AthleteProfileCard } from './athlete-profile-card';
import { SearchResults } from './search-results'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Card, CardContent } from "./ui/card"
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { CollegeMatchCard } from './CollegeMatchCard(';

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
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[] | null>(null)

  const handleSearch = async () => {
    setIsSearching(true)
    setSearchResults(null)

    // Simulating an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock results
    const mockResults = [
      {
        name: "Stanford University",
        scholarshipType: "Full athletic scholarships; combined with academic scholarships for qualified students",
        averagePlayerStats: "Top players often have singles records of 20-5 or better; serve speeds around 100 mph",
        coachInfo: "Lele Forood / lelef@stanford.edu",
        recruitingTimeline: "Begin contact in junior year; provide match footage, academic transcripts, and standardized test scores",
        averagePracticeSchedule: "5-6 days per week; 3-4 hours per day",
        teamRankings: "Consistently ranked in top 5",
        scholarshipRenewalConditions: "Maintain top performance in matches and practices; GPA of 3.5 or higher"
      },
      // Add more universities here...
    ]

    setSearchResults(mockResults)
    setIsSearching(false)
  }

  const handleSave = (data: any) => {
    setProfileData({ ...data, name: profileData.name });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container mx-auto p-6 md:p-8">
    <AnimatePresence mode="wait">
      {isEditing ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <AthleteProfileForm onSave={handleSave} initialData={profileData} />
          {/* <CollegeMatchCard></CollegeMatchCard> */}
        </motion.div>
      ) : (
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <AthleteProfileCard
               name={profileData.name}
               gender={profileData.gender}
               sport={profileData.sport}
               additionalData={profileData.additionalData}
               onEdit={handleEdit}
               onSearch={handleSearch}
               isLoading={isSearching}    
              />
          {isSearching && (
            <Card className="mt-8 w-full mx-auto overflow-hidden">
              <CardContent className="p-6 min-h-[200px] flex items-center justify-center">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-sm">Searching NCAA Programs...</span>
                </div>
              </CardContent>
            </Card>
          )}
          {searchResults && (
            <SearchResults results={searchResults} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
    </main>
    <Footer />
    </div>
  );
};

export default AthleteProfileSearch;
