import {app,auth,db,createUserWithEmailAndPassword,setDoc,doc,onAuthStateChanged} from "./firebase.js"
let flag = true;
onAuthStateChanged(auth, (user) => {
  if (user) {
    if(location.pathname !== "/dashboard.html" && flag)
location.href="dashboard.html"
console.log("user found",user)
    const uid = user.uid;
    localStorage.setItem("userid",uid)
    // ...
  } else {
console.log("user not found")
  }
});


let SignBtn = document.getElementById("Signup-btn")



SignBtn.addEventListener("click",()=>{
  let signupEmail = document.getElementById("signup-email")
let signupPassword = document.getElementById("signup-password")
let username = document.getElementById("username")
let content = document.getElementById("content")
let loader = document.getElementById("loader")
let inputbox = document.querySelector(".input-box") 

  
    loader.style.display="flex"
    flag = false 
  content.style.display="none" 
 
    createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
      .then( async (userCredential)  => {
        const user = userCredential.user;
      
        await setDoc(doc(db, "users", user.uid), {
          name: username.value,
          email: signupEmail.value,
          userid: user.uid,
          password:signupPassword.value,
      })
      flag= true
      console.log(user)
      console.log("user data saved")

loader.style.display="none"        
  location.href="./dashboard.html"    
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