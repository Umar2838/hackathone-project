import {app,auth} from "./firebase.js"

import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";


let SignBtn = document.getElementById("Signup-btn")

let signupEmail = document.getElementById("signup-email")
let signupPassword = document.getElementById("signup-password")
let content = document.getElementById("content")
let loader = document.getElementById("loader")

SignBtn.addEventListener("click",()=>{
 
  loader.style.display="flex"
content.style.display="none"

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        loader.style.display="none"
      
        signupEmail.value=("")
       
        window.location.href="./main.html"  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
     console.log("error:" ,errorMessage)
      });

  

})