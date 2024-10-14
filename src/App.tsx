import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchScreen from './screens/SearchScreen'; // Search screen component
import LoginScreen from './screens/LoginScreen'; // Login screen component
import RegisterScreen from './screens/RegisterScreen'; // Register screen component
import Home from './screens/Home'; // Home page component

// Function to check if the user is authenticated
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('userToken'); // Check if token exists in localStorage
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home route: Unauthenticated users see the home page, authenticated users go to the search */}
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/search" /> : <Home />}
        />

        {/* Login and Register routes */}
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <LoginScreen />} />
        <Route path="/register" element={isAuthenticated() ? <Navigate to="/" /> : <RegisterScreen />} />

        {/* Protected route to the search screen */}
        <Route
          path="/search"
          element={isAuthenticated() ? <SearchScreen /> : <Navigate to="/login" />}
        />

        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
