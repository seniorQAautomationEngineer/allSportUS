import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Home: React.FC<{ user: any }> = ({ user }) => {
  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out");
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
