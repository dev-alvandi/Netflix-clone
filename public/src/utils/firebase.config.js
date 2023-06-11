// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAXNTSV771GpBHXLtiS_Rmr0cYBq5SgFMA',
  authDomain: 'react-netflix-clone-2bd1a.firebaseapp.com',
  projectId: 'react-netflix-clone-2bd1a',
  storageBucket: 'react-netflix-clone-2bd1a.appspot.com',
  messagingSenderId: '363724550035',
  appId: '1:363724550035:web:2deab0f2113ea84c294266',
  measurementId: 'G-Y0H0HJZPKK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
