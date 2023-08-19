
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
  import { getFirestore} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signOut  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);


  export {app,auth,provider,db}  