import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAiyb5LCjUot-yruJlZfDq6ti6Hh2p0PAY',
  authDomain: 'react-mantine.firebaseapp.com',
  projectId: 'react-mantine',
  storageBucket: 'react-mantine.appspot.com',
  messagingSenderId: '427777979881',
  appId: '1:427777979881:web:2b5e6f87666fb746434778',
  measurementId: 'G-KX36XXS0M0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
