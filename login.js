// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zUSflhSfV-o312NmGzMIPIVhOiWMPNQ",
  authDomain: "dolera-17463.firebaseapp.com",
  projectId: "dolera-17463",
  storageBucket: "dolera-17463.appspot.com",
  messagingSenderId: "535352398372",
  appId: "1:535352398372:web:fd87c0ea46b73099607eb1",
  measurementId: "G-BRLNYJQXRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Event listener for login form submission
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  // Retrieve input values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Validate fields
  if (!email || !password) {
    alert("Please fill in all required fields!");
    return;
  }

  // Sign in user with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "profile/main.html"; // Redirect to profile page
    })
    .catch((error) => {
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email. Please sign up first.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please enter a valid email.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Credential issue. Please check your login details.";
          break;
        default:
          errorMessage = error.message;
      }

      alert(errorMessage);
    });
});
