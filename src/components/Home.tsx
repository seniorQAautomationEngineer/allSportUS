// Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Home: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/search")}>Go to Search</button> {/* Button to navigate to Search */}
    </div>
  );
};

export default Home;
