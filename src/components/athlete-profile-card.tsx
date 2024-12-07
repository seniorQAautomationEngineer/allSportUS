// import { Button } from "./ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
// import { useState } from 'react';

// interface AthleteProfileCardProps {
//   name: string
//   sport: string
//   gender: string
//   onEdit: () => void
//   onSearch: () => void
//   sportData: any
//   isLoading: boolean
// }

// export function AthleteProfileCard({ name, sport, gender, onEdit, onSearch, sportData, isLoading }: AthleteProfileCardProps) {
//   const [hasSearched, setHasSearched] = useState(false);
//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//   }

//   const renderSportSpecificDetails = () => {
//     switch (sport.toLowerCase()) {
//       case 'basketball':
//         return (
//           <div className="mt-2">
//             <p className="text-sm text-gray-600">Position: {Object.keys(sportData.positions).filter(pos => sportData.positions[pos]).join(', ')}</p>
//             <p className="text-sm text-gray-600">
//               PPG: {sportData.points_per_game || 'N/A'}, 
//               RPG: {sportData.rebounds_per_game || 'N/A'}, 
//               APG: {sportData.assists_per_game || 'N/A'}
//             </p>
//           </div>
//         )
//       case 'baseball':
//         return (
//           <div className="mt-2">
//             <p className="text-sm text-gray-600">Positions: {Object.keys(sportData.positions || {}).filter(pos => sportData.positions[pos]).join(', ')}</p>
//             <p className="text-sm text-gray-600">
//               Games Played: {sportData.games_played || 'N/A'}, 
//               Batting Avg: {sportData.batting_average || 'N/A'}, 
//               OBP: {sportData.on_base_percentage || 'N/A'}
//             </p>
//             <p className="text-sm text-gray-600">
//               Home Runs: {sportData.home_runs || 'N/A'}, 
//               RBI: {sportData.runs_batted_in || 'N/A'}
//             </p>
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <div className="flex items-center space-x-4">
//           <Avatar className="w-12 h-12">
//             <AvatarFallback>{getInitials(name)}</AvatarFallback>
//           </Avatar>
//           <div>
//             <CardTitle>{name}</CardTitle>
//             <p className="text-sm text-gray-600">{sport} {gender ? `| ${gender}` : ''}</p>
//           </div>
//         </div>
//         <Button variant="outline" size="sm" onClick={onEdit}>
//           Edit Profile
//         </Button>
//       </CardHeader>
//       <CardContent>
//         {renderSportSpecificDetails()}
//       </CardContent>
//       <CardFooter>
//         <Button 
//           className="w-full bg-[#0088FF] hover:bg-[#0066CC]" 
//           onClick={() => {
//             setHasSearched(true);
//             onSearch();
//           }}
//           disabled={isLoading}
//           style={{ opacity: isLoading ? 0.8 : 1 }}
//         >
//           {hasSearched ? "Search Again" : "Search NCAA Programs"}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

