// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Select from "react-select";
// import { executeMutation } from 'firebase/data-connect';
// import { createUserRef } from "../dataconnect-generated/js/default-connector";
// import { v4 as uuidv4 } from 'uuid';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// // Sample list of countries for the dropdown
// const countryOptions = [
//   { value: "United States", label: "United States" },
//   { value: "Canada", label: "Canada" },
//   { value: "United Kingdom", label: "United Kingdom" },
//   { value: "Australia", label: "Australia" },
//   // Add more countries or fetch dynamically if needed
// ];

// const LoginRegister: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [country, setCountry] = useState<{ value: string; label: string } | null>(null);
//   const [age, setAge] = useState<string>(""); // New age field
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       setErrorMessage(null);

//       if (isRegistering) {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         navigate("/"); 
//         const user = userCredential.user;
//         const id = uuidv4() as `${string}-${string}-${string}-${string}-${string}`;
//         const createdAt = new Date().toISOString();
//         const authUid = user.uid;

//         const createUserMutationRef = createUserRef({
//           id,
//           authUid,
//           firstName,
//           lastName,
//           email,
//           country: country?.value || "", // Get the country value
//           age: parseInt(age, 10) || null, // Convert age to number or set to null if empty
//           createdAt,
//         });

//         const result = await executeMutation(createUserMutationRef);
//         console.log("User created successfully in Data Connect:", result);
//       } else {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         console.log("User logged in successfully:", userCredential.user);
//         navigate("/");
//       }
//     } catch (error: any) {
//       console.error("Error:", error);
//       const message = mapFirebaseErrorToMessage(error.code);
//       setErrorMessage(message || "Failed to register. Please try again.");
//     }
//   };

//   const mapFirebaseErrorToMessage = (code: string): string => {
//     switch (code) {
//       case "auth/missing-password":
//         return "Password is required.";
//       case "auth/invalid-email":
//         return "Please enter a valid email address.";
//       case "auth/email-already-in-use":
//         return "This email is already registered.";
//       case "auth/weak-password":
//         return "Password should be at least 6 characters.";
//       case "auth/wrong-password":
//         return "Incorrect password.";
//       case "auth/user-not-found":
//         return "No account found with this email.";
//       default:
//         return "An unexpected error occurred. Please try again.";
//     }
//   };

//   return (
//     <div>
//       <h2>{isRegistering ? "Register" : "Login"}</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {isRegistering && (
//         <>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
//           <Select
//             options={countryOptions}
//             value={country}
//             onChange={(selected) => setCountry(selected)}
//             placeholder="Select or type country"
//             isClearable
//             isSearchable
//           />
//         </>
//       )}
//       <button onClick={handleRegister}>
//         {isRegistering ? "Register" : "Login"}
//       </button>
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       <p onClick={() => setIsRegistering(!isRegistering)}>
//         {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
//       </p>
//     </div>
//   );
// };

// export default LoginRegister;
