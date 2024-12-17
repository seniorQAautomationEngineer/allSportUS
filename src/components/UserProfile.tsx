'use client'

import './styles/globals.css'
import { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Pencil } from 'lucide-react'
import { Textarea } from "./ui/textarea"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import DatePicker from "react-datepicker" // Import DatePicker
import "react-datepicker/dist/react-datepicker.css" // Import DatePicker styles
import styles from './styles/profile-settings.module.css'




interface UserProfile {
  firstName: string
  lastName: string
  email: string
  country: string
  dateOfBirth: Date
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "India",
  "China",
  // Add more countries as needed
]

const deletionReasons = [
  { id: "not-useful", label: "I don't find the service useful" },
  { id: "too-expensive", label: "The service is too expensive" },
  { id: "hard-to-use", label: "The service is difficult to use" },
  { id: "privacy-concerns", label: "I have privacy concerns" },
  { id: "found-alternative", label: "I found a better alternative" },
]

export default function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    country: 'United States',
    dateOfBirth: new Date('1990-01-01')
  })

  const handleSave = (date: Date | null) => {
    console.log("Selected date:", date)
  }

  const handleCancel = () => {
    console.log("Date selection canceled")
  }

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false)
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [deletionReason, setDeletionReason] = useState('')
  const [improvementSuggestion, setImprovementSuggestion] = useState('')
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleEditPersonalInfo = () => {
    setIsEditingPersonalInfo(true)
    setTempProfile({ ...profile })
  }

  const handleSavePersonalInfo = () => {
    setProfile({ ...tempProfile })
    setIsEditingPersonalInfo(false)
  }

  const handleCancelPersonalInfo = () => {
    setTempProfile({ ...profile })
    setIsEditingPersonalInfo(false)
  }

  const handleChange = (field: keyof UserProfile, value: string | Date) => {
    setTempProfile({ ...tempProfile, [field]: value })
  }

  const handleSavePassword = () => {
    console.log('Changing password')
    setIsEditingPassword(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleDeleteAccount = () => {
    setIsConfirmingDelete(true)
  }

  const handleSignOut = () => {
    console.log('Signing out')
  }

  const handleFinalDelete = () => {
    console.log('Deleting account')
    console.log('Selected reasons:', selectedReasons)
    console.log('Other reason:', deletionReason)
    console.log('Improvement suggestion:', improvementSuggestion)
    // Here you would typically make an API call to delete the account
  }

  const renderPersonalInfoFields = () => {
    return Object.entries(tempProfile).map(([key, value]) => {
      let content

      if (key === 'country') {
        content = (
          <Select
            value={tempProfile[key]}
            onValueChange={(value) => handleChange(key as keyof UserProfile, value)}
            disabled={!isEditingPersonalInfo}
          >
            <SelectTrigger className={styles.select}>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      } else if (key === 'dateOfBirth') {
        content = (
          <div className={`${styles.formGroup} space-y-2`}>
            <Button
              variant="outline"
              onClick={() => isEditingPersonalInfo && setIsCalendarOpen(!isCalendarOpen)}
              className={`${styles.button} ${styles.buttonSecondary} w-full justify-start text-left font-normal`}
              disabled={!isEditingPersonalInfo}
            >
              {format(tempProfile.dateOfBirth, 'PP')}
            </Button>
            {isCalendarOpen && isEditingPersonalInfo && (
              <div className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200">
                <Calendar 
                  initialDate={new Date()} 
                  onSave={handleSave} 
                  onCancel={handleCancel} 
                />
              </div>
            )}
          </div>
        )
      } else {
        content = (
          <Input
            id={key}
            type={key === 'email' ? 'email' : 'text'}
            value={value.toString()}
            onChange={(e) => handleChange(key as keyof UserProfile, e.target.value)}
            className={styles.input}
            disabled={!isEditingPersonalInfo}
          />
        )
      }

      return (
        <div key={key} className={`${styles.formGroup} space-y-2`}>
          <Label htmlFor={key} className={`${styles.label} mb-2`}>
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </Label>
          {content}
        </div>
      )
    })
  }

  return (
    <div className={`${styles.container} flex flex-col items-center`}>
      <div className={`${styles.header} text-center pt-16 space-y-2`}>
        <div className={`${styles.headerEmoji} text-7xl`}>🔧</div>
        <h1 className={`${styles.headerTitle} font-bold text-[40px]`}>Profile Settings</h1>
        <p className={`${styles.headerSubtitle} mb-6 pb-10`}>
          Manage your account details and secure your login credentials.
        </p>
      </div>

      {!isConfirmingDelete ? (
        <>
          <Card className={`${styles.card} max-w-[600px] w-full mx-auto pb-10`}>
            <CardHeader className={`${styles.cardHeader} pb-6 border-b`}>
              <div className="flex justify-between items-center w-full">
                <CardTitle className={`${styles.cardTitle} text-2xl font-semibold text-gray-900`}>Personal Information</CardTitle>
                {!isEditingPersonalInfo && (
                  <Button
                    onClick={handleEditPersonalInfo}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className={`${styles.cardContent} space-y-5 pt-5`}>
              <div className={`${styles.formGroup} space-y-5`}>
              {renderPersonalInfoFields()}
              {isEditingPersonalInfo && (
                <div className={`${styles.buttonGroup} mt-6 flex space-x-2`}>
                  <Button onClick={handleSavePersonalInfo} size="sm" className={`${styles.button} ${styles.buttonPrimary} flex-1 bg-blue-500 hover:bg-blue-600`}>
                    Save
                  </Button>
                  <Button onClick={handleCancelPersonalInfo} variant="outline" size="sm" className={`${styles.button} ${styles.buttonSecondary} flex-1`}>
                    Cancel
                  </Button>
                </div>
              )}
              </div>
            </CardContent>
          </Card>

          <Card className={`${styles.card} max-w-[600px] w-full mx-auto my-10 pb-10`}>
            <CardHeader className={`${styles.cardHeader} pb-6 border-b`}>
              <CardTitle className={`${styles.cardTitle} text-2xl font-semibold text-gray-900`}>Account Security</CardTitle>
            </CardHeader>
            <CardContent className={`${styles.cardContent} space-y-6 pt-4`}>
              <div className={`${styles.formGroup} space-y-4`}>
                <div className="flex justify-between items-start">
                  <div className={`${styles.formGroup} space-y-2 flex-grow mr-4`}>
                    <Label htmlFor="current-password" className={`${styles.label} mb-2`}>Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value="••••••••"
                      disabled
                      className={styles.input}
                    />
                  </div>
                  {!isEditingPassword && (
                    <Button
                      onClick={() => setIsEditingPassword(true)}
                      variant="outline"
                      className={`${styles.button} ${styles.buttonSecondary} mt-8`}
                    >
                      Change Password
                    </Button>
                  )}
                </div>
                {isEditingPassword && (
                  <div className={`${styles.editingSection} space-y-4`}>
                    <div className={styles.formGroup}>
                      <Label htmlFor="current-password" className={`${styles.label} mb-2`}>Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="new-password" className={`${styles.label} mb-2`}>New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="confirm-password" className={`${styles.label} mb-2`}>Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={`${styles.buttonGroup} mt-4 flex space-x-2`}>
                      <Button 
                        onClick={handleSavePassword} 
                        size="sm" 
                        className={`${styles.button} ${styles.buttonPrimary} flex-1 bg-blue-500 hover:bg-blue-600`}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditingPassword(false)
                          setCurrentPassword('')
                          setNewPassword('')
                          setConfirmPassword('')
                        }}
                        variant="outline"
                        size="sm"
                        className={`${styles.button} ${styles.buttonSecondary} flex-1`}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Separator className={`${styles.separator} my-5`} />

              <div className="pt-2 flex space-x-4">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className={`bg-gray-900 text-white hover:bg-gray-700 ${styles.buttonSignOut}`} 
                >
                  Sign Out
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  className={`${styles.button} ${styles.buttonDanger} flex-1`}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="pb-10">
          <Card className={`${styles.card} max-w-[600px] w-full mx-auto mb-10`}>
            <CardHeader className={`${styles.cardHeader} text-center`}>
              <CardTitle className={styles.cardTitle}>
                <span className="text-4xl mb-2 inline-block">😢</span>
                <br />
                We are sad to see you go.
              </CardTitle>
            </CardHeader>
            <CardContent className={`${styles.cardContent} space-y-8 pt-8`}>
              <div className={`${styles.formGroup} space-y-6`}>
                <div>
                  <Label className={`${styles.label} text-lg font-semibold mb-4 block`}>Why are you deleting your account?</Label>
                  <div className="space-y-4">
                    {deletionReasons.map((reason) => (
                      <div 
                        key={reason.id}
                        className="flex items-center space-x-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Checkbox
                          id={reason.id}
                          checked={selectedReasons.includes(reason.id)}
                          onCheckedChange={(checked) => {
                            setSelectedReasons(prev =>
                              checked
                                ? [...prev, reason.id]
                                : prev.filter(id => id !== reason.id)
                            )
                          }}
                          className={`${styles.checkbox} h-5 w-5`}
                        />
                        <Label
                          htmlFor={reason.id}
                          className="text-sm font-medium text-gray-700 cursor-pointer flex-grow"
                        >
                          {reason.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${styles.formGroup} space-y-2`}>
                  <Label htmlFor="other-reason" className={`${styles.label} text-base font-semibold`}>Other reason</Label>
                  <Textarea
                    id="other-reason"
                    placeholder="If you have another reason, please let us know"
                    value={deletionReason}
                    onChange={(e) => setDeletionReason(e.target.value)}
                    rows={3}
                    className={`${styles.textarea} w-full px-3 py-2 text-sm`}
                  />
                </div>
              </div>
              <div className={`${styles.formGroup} space-y-2`}>
                <Label htmlFor="improvement-suggestion" className={`${styles.label} text-base font-semibold`}>What can we improve?</Label>
                <Textarea
                  id="improvement-suggestion"
                  placeholder="Your feedback helps us improve our service"
                  value={improvementSuggestion}
                  onChange={(e) => setImprovementSuggestion(e.target.value)}
                  rows={4}
                  className={`${styles.textarea} w-full px-3 py-2 text-sm`}
                />
              </div>
              <div className={`${styles.buttonGroup} mt-8 flex flex-col sm:flex-row sm:justify-between sm:space-x-4 mb-8`}>
                <Button
                  onClick={handleFinalDelete}
                  variant="destructive"
                  className={`${styles.buttonDanger} w-full sm:w-1/2 mb-4 sm:mb-0`}
                >
                  Confirm Account Deletion
                </Button>
                <Button
                  onClick={() => {
                    setIsConfirmingDelete(false)
                    setShowDeleteWarning(false)
                  }}
                  variant="outline"
                  className={`${styles.button} ${styles.buttonSecondary} w-full sm:w-1/2`}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


