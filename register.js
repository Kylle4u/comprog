import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zUSflhSfV-o312NmGzMIPIVhOiWMPNQ",
  authDomain: "dolera-17463.firebaseapp.com",
  projectId: "dolera-17463",
  storageBucket: "dolera-17463.appspot.com",
  messagingSenderId: "535352398372",
  appId: "1:535352398372:web:fd87c0ea46b73099607eb1",
  measurementId: "G-BRLNYJQXRY",
  databaseURL: "https://dolera-17463-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Event listener for form submission
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("cpassword").value;

  // Validate input fields
  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firebase Realtime Database
    await set(ref(db, "users/" + user.uid), {
      username: username,
      email: email
    });

    alert("Account successfully created! Please log in.");

    // Redirect to login page after successful registration
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
    
  } catch (error) {
    let errorMessage = "An error occurred. Please try again.";

    switch (error.code) {
      case "auth/weak-password":
        errorMessage = "Password is too weak. Use a stronger password.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format. Please enter a valid email.";
        break;
      default:
        errorMessage = error.message;
    }

    alert(errorMessage);
  }
});