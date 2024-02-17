// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA91xujYYdcT6qQolh-lJywEUfzUV77fbA",
  authDomain: "mytwitter-9a0a0.firebaseapp.com",
  projectId: "mytwitter-9a0a0",
  storageBucket: "mytwitter-9a0a0.appspot.com",
  messagingSenderId: "273078736728",
  appId: "1:273078736728:web:d05de000ee10c6a8ca772d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase 콘솔(웹 페이지)에서 설정한 authentication 을 가져오기 위한 방법
export const auth = getAuth(app);
