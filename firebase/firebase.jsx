// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnm4axBcrxFaamTAy0lsUavBODuFOsFlg",
  authDomain: "ecommerce-food-1c181.firebaseapp.com",
  projectId: "ecommerce-food-1c181",
  storageBucket: "ecommerce-food-1c181.appspot.com",
  messagingSenderId: "472209364042",
  appId: "1:472209364042:web:bf139d58a07d73b37ec2b3"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
  
  export default db;


