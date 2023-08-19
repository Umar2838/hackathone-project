import {app,auth,db} from "./firebase.js"

import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {  doc, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


let SignBtn = document.getElementById("Signup-btn")

let signupEmail = document.getElementById("signup-email")
let signupPassword = document.getElementById("signup-password")
let username = document.getElementById("username")
let content = document.getElementById("content")
let loader = document.getElementById("loader")

SignBtn.addEventListener("click",()=>{
 
  loader.style.display="flex"
content.style.display="none"

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
      .then(async(userCredential)  => {

        await setDoc(doc(db, "users", uid), {
          name: username.value,
          email: signupEmail.value,
          uid: uid,
        });

        const user = userCredential.user;
        console.log(user)

        var uid = localStorage.getItem("refuid")
        localStorage.setItem("refuid",user.uid)
       localStorage.setItem("username",username.value)
    
       window.location.href="./dashboard.html"
  
            })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    
     if(errorMessage){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage ,
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      console.log(errorMessage)
      loader.style.display="none"
      content.style.display="block"
    }
      });

 

})