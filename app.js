import {app,auth } from "./firebase.js"

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

let loginEmail = document.getElementById("login-email")
let loginPassword = document.getElementById("login-password")
let content = document.getElementById("content")
let loader = document.getElementById("loader")
let LoginBtn = document.getElementById("Login-btn")

LoginBtn.addEventListener("click",()=>{
    loader.style.display="flex"
    content.style.display="none"
    const auth = getAuth();
signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
   console.log(user)
   loader.style.display="none"

   loginEmail.value=("")
 
   window.location.href="./main.html"  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log("error",errorMessage)
  });

    
})


