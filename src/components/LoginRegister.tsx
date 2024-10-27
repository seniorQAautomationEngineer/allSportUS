import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginRegister: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Navigate after login/registration

  // Handle login
  const handleLogin = async () => {
    try {
      setErrorMessage(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully:", userCredential.user);
      navigate("/");  // Redirect to Home after successful login
    } catch (error: any) {
      const message = mapFirebaseErrorToMessage(error.code);
      setErrorMessage(message);
    }
  };

  // Handle registration
  const handleRegister = async () => {
    try {
      setErrorMessage(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully:", userCredential.user);
      navigate("/");  // Redirect to Home after successful registration
    } catch (error: any) {
      const message = mapFirebaseErrorToMessage(error.code);
      setErrorMessage(message);
    }
  };

  // Function to map Firebase error codes to user-friendly messages
  const mapFirebaseErrorToMessage = (code: string): string => {
    switch (code) {
      case "auth/missing-password":
        return "Password is required.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/user-not-found":
        return "No account found with this email.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? "Register" : "Login"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default LoginRegister;
