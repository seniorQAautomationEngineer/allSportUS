import { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

interface University {
  name: string
  scholarshipType: string
  averagePlayerStats: string
  coachInfo: string
  recruitingTimeline: string
  averagePracticeSchedule: string
  teamRankings: string
  scholarshipRenewalConditions: string
}

interface SearchResultsProps {
  results: string
}

export function SearchResults({ results }: SearchResultsProps) {
  const [rating, setRating] = useState<'helpful' | 'not helpful' | null>(null)

  const handleRating = (value: 'helpful' | 'not helpful') => {
    setRating(value)
    console.log(`User rated the response as ${value}`)
  }

  return (
    <Card className="mt-8 w-full mx-auto overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-8 h-8 bg-primary">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="space-y-4 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-primary">
                USPORT.AI • {new Date().toLocaleString()}
              </span>
            </div>
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <p>Based on your impressive athletic and academic profile, here is a tailored list of top NCAA Division I universities renowned for their women's tennis programs. This selection considers your performance metrics and academic achievements.</p>
              
              {/* {results.map((university, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{university.name}</h3>
                  <p><strong>Scholarship:</strong> {university.scholarshipType}</p>
                  <p><strong>Rankings:</strong> {university.teamRankings}</p>
                  <p><strong>Renewal Conditions:</strong> {university.scholarshipRenewalConditions}</p>
                  <p><strong>Coach:</strong> {university.coachInfo}</p>
                  <p><strong>Recruiting Timeline:</strong> {university.recruitingTimeline}</p>
                  <p><strong>Average Player Stats:</strong> {university.averagePlayerStats}</p>
                  <p><strong>Practice Schedule:</strong> {university.averagePracticeSchedule}</p>
                </div>
              ))} */}

                <ReactMarkdown 
                 remarkPlugins={[remarkGfm]}
                 components={{
                   h1: ({ node, ...props }) => (
                     <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />
                   ),
                   h2: ({ node, ...props }) => (
                     <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2" {...props} />
                   ),
                   p: ({ node, ...props }) => (
                     <p className="text-base leading-relaxed mb-2" {...props} />
                   ),
                   a: ({ node, ...props }) => (
                     <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />
                   ),
                   strong: ({ node, ...props }) => (
                     <strong className="font-semibold text-gray-900" {...props} />
                   ),
                 }}
               >
                 {results}
               </ReactMarkdown>

              <p>Please note that scholarship offerings and renewal conditions can vary annually based on university policies and available funding. It's advisable to contact the respective coaches directly for the most current information.</p>
              
              <p>Was this response helpful?</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button 
            onClick={() => handleRating('helpful')} 
            variant={rating === 'helpful' ? 'default' : 'outline'}
            className={rating === 'helpful' ? 'bg-[#0088FF] hover:bg-[#0066CC]' : ''}
            size="sm"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Helpful
          </Button>
          <Button 
            onClick={() => handleRating('not helpful')} 
            variant={rating === 'not helpful' ? 'default' : 'outline'}
            className={rating === 'not helpful' ? 'bg-[#FF0000] hover:bg-[#CC0000]' : ''}
            size="sm"
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            Not Helpful
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

