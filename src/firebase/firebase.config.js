import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDxRNW019aLpriylaLHpIwMG1N8VrOlcbY",
  authDomain: "camera-crew.firebaseapp.com",
  projectId: "camera-crew",
  storageBucket: "camera-crew.appspot.com",
  messagingSenderId: "867704606944",
  appId: "1:867704606944:web:4705fd258d10194ab7c085"
};
const app = initializeApp(firebaseConfig);

export default app;