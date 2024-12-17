"use client"

import React, { useState } from "react"
import DatePicker from "react-datepicker" // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css" // Import styles
import { Button } from "./button"

export type CalendarProps = {
  onSave?: (date: Date | null) => void
  onCancel?: () => void
  initialDate?: Date | null
}

function Calendar({ onSave, onCancel, initialDate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null)

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow">
      {/* Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd" // Customize format if needed
        placeholderText="Select a date"
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring focus:ring-blue-300"
      />

      {/* Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave && onSave(selectedDate)}>
          Save
        </Button>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
