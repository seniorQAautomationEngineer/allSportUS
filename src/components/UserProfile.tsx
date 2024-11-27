"use client"

import React, { useState, useEffect } from 'react';
import Header from './ui/Header';
import Footer from './ui/Footer';
import { Edit2, Save, X } from 'lucide-react';
import Toast from './ui/toast';


interface AthleteEvent {
  event: string;
  time: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  country: string;
  sport: string;
  events: AthleteEvent[];
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany",
  "France", "Spain", "Italy", "Japan", "China", "Brazil", "Mexico",
  "Argentina", "India", "Russia", "South Africa", "Egypt", "Nigeria",
  "Kenya", "Saudi Arabia", "United Arab Emirates", "Singapore", "South Korea"
];

const genders = ["Male", "Female", "Other"];

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    firstName: "Pepito Rodrick",
    lastName: "Coronel Sifuentes",
    email: "pepito.c.sifuentes@uni.pe",
    gender: "Male",
    age: 20,
    country: "Peru",
    sport: "Swimming",
    events: [
      { event: "50 freestyle", time: "27.56" },
      { event: "100 freestyle", time: "59.23" },
      { event: "200 freestyle", time: "2:08.45" }
    ]
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirmNew: ""
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAthlete, setIsEditingAthlete] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState<UserData>(userData);
  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const handleSaveChanges = () => {
    setUserData(editedUserData);
    setIsEditingProfile(false);
    showToast("Profile updated successfully!", "success");
    console.log("Saving changes:", editedUserData);
  };

  const handleSaveAthleteChanges = () => {
    setUserData(editedUserData);
    setIsEditingAthlete(false);
    showToast("Athletic profile updated successfully!", "success");
    console.log("Saving athlete changes:", editedUserData);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirmNew) {
      showToast("New passwords do not match", "error");
      return;
    }
    console.log("Changing password:", passwords);
    showToast("Password updated successfully!", "success");
    setIsChangingPassword(false);
    setPasswords({ current: "", new: "", confirmNew: "" });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account");
      showToast("Account deleted successfully", "success");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-8">
              {/* Left Column - Profile and Athletic Info */}
              <div className="w-full md:w-1/3 space-y-6">
                {/* Profile Card */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-white">
                        {userData.firstName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{`${userData.firstName} ${userData.lastName}`}</h2>
                      <p className="text-gray-500 text-sm">{userData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Athletic Profile */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Athletic Profile</h2>
                    {isEditingAthlete ? (
                      <button
                        onClick={handleSaveAthleteChanges}
                        className="flex items-center space-x-1 text-white bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditingAthlete(true)}
                        className="flex items-center space-x-1 text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Sport</span>
                      {isEditingAthlete ? (
                        <input
                          type="text"
                          className="w-1/2 p-1 bg-gray-50 border border-gray-300 rounded-md"
                          value={editedUserData.sport}
                          onChange={(e) => setEditedUserData({ ...editedUserData, sport: e.target.value })}
                        />
                      ) : (
                        <span className="text-gray-900">{userData.sport}</span>
                      )}
                    </div>
                    {editedUserData.events.map((event, index) => (
                      <React.Fragment key={index}>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Event {index + 1}</span>
                          {isEditingAthlete ? (
                            <input
                              type="text"
                              className="w-1/2 p-1 bg-gray-50 border border-gray-300 rounded-md"
                              value={event.event}
                              onChange={(e) => {
                                const newEvents = [...editedUserData.events];
                                newEvents[index].event = e.target.value;
                                setEditedUserData({ ...editedUserData, events: newEvents });
                              }}
                            />
                          ) : (
                            <span className="text-gray-900">{event.event}</span>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Time</span>
                          {isEditingAthlete ? (
                            <input
                              type="number"
                              step="0.01"
                              className="w-1/2 p-1 bg-gray-50 border border-gray-300 rounded-md"
                              value={event.time}
                              onChange={(e) => {
                                const newEvents = [...editedUserData.events];
                                newEvents[index].time = e.target.value;
                                setEditedUserData({ ...editedUserData, events: newEvents });
                              }}
                            />
                          ) : (
                            <span className="text-gray-900">{event.time}</span>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - User Settings */}
              <div className="w-full md:w-2/3 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">User Settings</h2>
                  {isEditingProfile ? (
                    <button
                      onClick={handleSaveChanges}
                      className="flex items-center space-x-1 text-white bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center space-x-1 text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                        value={editedUserData.firstName}
                        onChange={(e) => setEditedUserData({ ...editedUserData, firstName: e.target.value })}
                        placeholder="Enter your first name"
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                        value={editedUserData.lastName}
                        onChange={(e) => setEditedUserData({ ...editedUserData, lastName: e.target.value })}
                        placeholder="Enter your last name"
                        disabled={!isEditingProfile}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                        value={editedUserData.email}
                        onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                        placeholder="Enter your email"
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                        value={editedUserData.gender}
                        onChange={(e) => setEditedUserData({ ...editedUserData, gender: e.target.value })}
                        disabled={!isEditingProfile}
                      >
                        {genders.map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                        value={editedUserData.age}
                        onChange={(e) => setEditedUserData({ ...editedUserData, age: parseInt(e.target.value) })}
                        placeholder="Enter your age"
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                        value={editedUserData.country}
                        onChange={(e) => setEditedUserData({ ...editedUserData, country: e.target.value })}
                        disabled={!isEditingProfile}
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {isEditingProfile && (
                    <button
                      onClick={handleSaveChanges}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      Save changes
                    </button>
                  )}
                  {toast.show && (
                    <Toast message={toast.message} type={toast.type} />
                  )}
                </div>

                {/* Password Section */}
                <div className="mt-8 space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Password</h3>
                  {!isChangingPassword ? (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Change password
                    </button>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="password"
                          className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          placeholder="Current password"
                        />
                        <div></div>
                        <input
                          type="password"
                          className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          placeholder="New password"
                        />
                        <input
                          type="password"
                          className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                          value={passwords.confirmNew}
                          onChange={(e) => setPasswords({ ...passwords, confirmNew: e.target.value })}
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={handlePasswordChange}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          Save changes
                        </button>
                        <button
                          onClick={() => setIsChangingPassword(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                  {toast.show && (
                    <Toast message={toast.message} type={toast.type} />
                  )}
                </div>

                {/* Delete Account */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleDeleteAccount}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete Account
                  </button>
                  {toast.show && (
                    <Toast message={toast.message} type={toast.type} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

