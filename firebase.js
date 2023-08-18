
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCcIVGkbZE_pv5vRC-cV4lupNnle0GJWt4",
    authDomain: "hackathone-ebbb2.firebaseapp.com",
    projectId: "hackathone-ebbb2",
    storageBucket: "hackathone-ebbb2.appspot.com",
    messagingSenderId: "424255166365",
    appId: "1:424255166365:web:b661e66a2024ab0c954174",
    measurementId: "G-DCWXKG19LR"
  };


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  export {app,auth}  