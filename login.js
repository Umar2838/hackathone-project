import {app,auth,provider } from "./firebase.js"

import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

let loginEmail = document.getElementById("login-email")
let loginPassword = document.getElementById("login-password")
let content = document.getElementById("content")
let loader = document.getElementById("loader")
let LoginBtn = document.getElementById("Login-btn")
let googleLogin = document.getElementById("googlelogin")

LoginBtn && LoginBtn.addEventListener("click",()=>{
    loader.style.display="flex"
    content.style.display="none"
    const auth = getAuth();
signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
   console.log(user)
   loader.style.display="none"
   window.location.href="./dashboard.html"  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorMessage ){

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
      loader.style.display="none"
      content.style.display="block"
    }

  

    
  });


})

// googleLogin.addEventListener("click",()=>{

//   signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     const user = result.user;
 
//   }).catch((error) => {
 
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

// })
