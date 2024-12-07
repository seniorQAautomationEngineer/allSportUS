// 'use client'

// import { useState } from 'react'
// import { AthleteProfileForm } from './athlete-profile-form';
// import { AthleteProfileCard } from './athlete-profile-card'
// import { SearchResults } from './search-results'
// import { AnimatePresence, motion } from 'framer-motion'
// import { Loader2 } from 'lucide-react'
// import { Card, CardContent } from "./ui/card"

// interface AthleteProfileProps {
//   name: string
// }

// export function AthleteProfile({ name }: AthleteProfileProps) {
//   const [isEditing, setIsEditing] = useState(true)
//   const [profileData, setProfileData] = useState<any>({})
//   const [isSearching, setIsSearching] = useState(false)
//   const [searchResults, setSearchResults] = useState<any[] | null>(null)

//   const handleSave = (data: any) => {
//     setProfileData({ ...data, name })
//     setIsEditing(false)
//   }

//   const handleEdit = () => {
//     setIsEditing(true)
//     setSearchResults(null)
//   }

//   const handleSearch = async () => {
//     setIsSearching(true)
//     setSearchResults(null)

//     // Simulating an API call with a delay
//     await new Promise(resolve => setTimeout(resolve, 2000))

//     // Mock results
//     const mockResults = [
//       {
//         name: "Stanford University",
//         scholarshipType: "Full athletic scholarships; combined with academic scholarships for qualified students",
//         averagePlayerStats: "Top players often have singles records of 20-5 or better; serve speeds around 100 mph",
//         coachInfo: "Lele Forood / lelef@stanford.edu",
//         recruitingTimeline: "Begin contact in junior year; provide match footage, academic transcripts, and standardized test scores",
//         averagePracticeSchedule: "5-6 days per week; 3-4 hours per day",
//         teamRankings: "Consistently ranked in top 5",
//         scholarshipRenewalConditions: "Maintain top performance in matches and practices; GPA of 3.5 or higher"
//       },
//       // Add more universities here...
//     ]

//     setSearchResults(mockResults)
//     setIsSearching(false)
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <AnimatePresence mode="wait">
//         {isEditing ? (
//           <motion.div
//             key="form"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <AthleteProfileForm onSave={handleSave} initialData={profileData} />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="card"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <AthleteProfileCard
//               name={name}
//               sport={profileData.sport || 'Sport'}
//               gender={profileData.gender || 'Gender'}
//               onEdit={handleEdit}
//               onSearch={handleSearch}
//               sportData={profileData.sportData || {}}
//               isLoading={isSearching}
//             />
//             {isSearching && (
//               <Card className="mt-8 w-full mx-auto overflow-hidden">
//                 <CardContent className="p-6 min-h-[200px] flex items-center justify-center">
//                   <div className="flex items-center justify-center space-x-2">
//                     <Loader2 className="h-5 w-5 animate-spin text-primary" />
//                     <span className="text-sm">Searching NCAA Programs...</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//             {searchResults && (
//               <SearchResults results={searchResults} />
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }



