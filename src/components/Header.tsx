import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
// import { NavLink } from "./NavLink";

const navLinks = [
  { text: "About", width: "w-[50px]" },
  { text: "Pricing", width: "w-14" },
  { text: "Contacts", width: "w-[77px]" },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <nav className="nav-links">
          {/* {navLinks.map((link, index) => (
            // <NavLink key={index} {...link} />
          ))} */}
        </nav>

        <div className="logo">
          <span className="text-blue-600">AllSports</span>
          <span className="text-blue-600">.</span>ai
        </div>

        <button onClick={handleLogout} className="sign-out-btn">
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
