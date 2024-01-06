// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth, getReactNativePersistence} from '@firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAxZr24IaJajYy5WHNCoNGfLqPjJBR6yok',
  authDomain: 'ruskrupees.firebaseapp.com',
  databaseURL: 'https://ruskrupees-default-rtdb.firebaseio.com',
  projectId: 'ruskrupees',
  storageBucket: 'ruskrupees.appspot.com',
  messagingSenderId: '744554475013',
  appId: '1:744554475013:web:8f5d483bf081b477e3f66c',
  measurementId: 'G-RJ5TFY5162',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
