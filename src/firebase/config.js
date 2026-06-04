import app  from 'firebase/app';
import firebase from 'firebase';
 
const firebaseConfig = {
  apiKey: "AIzaSyDDOYCTUamM3Vh6aGwBip3_t6vHQjza7uU",
  authDomain: "trabajo2-f5285.firebaseapp.com",
  projectId: "trabajo2-f5285",
  storageBucket: "trabajo2-f5285.firebasestorage.app",
  messagingSenderId: "834705890803",
  appId: "1:834705890803:web:37ef2b90c8cae25be70686"
};
 
app.initializeApp(firebaseConfig);
 
export const auth = firebase.auth();
export const db = firebase.firestore();
