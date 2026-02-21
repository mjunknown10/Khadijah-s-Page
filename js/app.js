import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD6agQJo8GHqVHYOpC2FNnyUqAV8BfDYjg",
  authDomain: "khadiii.firebaseapp.com",
  projectId: "khadiii",
  storageBucket: "khadiii.firebasestorage.app",
  messagingSenderId: "874650695564",
  appId: "1:874650695564:web:448486cbbd4bbbdd8648a9",
  measurementId: "G-TMS88Y175R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore (YOU FORGOT THIS)
const db = getFirestore(app);

const form = document.getElementById("emailForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    await addDoc(collection(db, "Contacts"), {
      email: email,
      createdAt: serverTimestamp(),
      source: "affiliate_landing",
      lastEmailed: null
    });

    window.location.href = "thankyou.html";

  } catch (error) {
    console.error("Error saving email:", error);
    message.textContent = "Something went wrong. Please try again.";
  }
});
