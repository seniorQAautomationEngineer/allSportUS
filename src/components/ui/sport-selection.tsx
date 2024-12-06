import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "./card"

interface SportSelectionProps {
  onSelect: (sport: string) => void
}

const sports = [
  { name: 'Swimming', emoji: '🏊‍♂️' },
  { name: 'Basketball', emoji: '🏀' },
  { name: 'Soccer', emoji: '⚽' },
]

export function SportSelection({ onSelect }: SportSelectionProps) {
  const [hoveredSport, setHoveredSport] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">Choose Your Sport</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sports.map((sport) => (
          <Card
            key={sport.name}
            className="overflow-hidden"
          >
            <motion.div
              className="flex flex-col items-center justify-center p-6 cursor-pointer h-full"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredSport(sport.name)}
              onHoverEnd={() => setHoveredSport(null)}
              onClick={() => onSelect(sport.name.toLowerCase())}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  scale: hoveredSport === sport.name ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {sport.emoji}
              </motion.div>
              <span className="text-lg font-medium text-gray-700">{sport.name}</span>
            </motion.div>
          </Card>
        ))}
      </div>
    </div>
  )
}

