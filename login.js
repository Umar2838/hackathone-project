import { app, auth, signInWithEmailAndPassword, onAuthStateChanged ,provider,GoogleAuthProvider,signInWithPopup} from "./firebase.js";


onAuthStateChanged(auth, (user) => {
  if (user) {
    // if(location.pathname !== "/dashboard.html")
location.href="dashboard.html"
console.log("user found",user)
    const uid = user.uid;
    localStorage.setItem("loginuserid",uid)
    
    // ...
  } else {
console.log("user not found")
  }
});

let LoginBtn = document.getElementById("Login-btn");

LoginBtn.addEventListener("click", () => {
  let loginEmail = document.getElementById("login-email");
  let loginPassword = document.getElementById("login-password");
  let content = document.getElementById("content");
  let loader = document.getElementById("loader");

 

  LoginBtn.disabled = true;
  loader.style.display = "flex";
  content.style.display = "none";

  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then(() => {
      loader.style.display = "none";

      // Check for user authentication state change
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log("user found");
        } else {
          // console.log("user not found");
        }
        LoginBtn.disabled = false;

      });
    })
    .catch((error) => {
      const errorMessage = error.message;

      console.log("error",errorMessage)
      if (errorMessage) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
        loader.style.display = "none";
        content.style.display = "block";
        LoginBtn.disabled = false;

      }
    });
});

let googleLogin = document.getElementById("googlelogin")
googleLogin.addEventListener("click",()=>{

  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
   console.log("user",user)
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
  
    const email = error.customData.email;
    console.log("error",error,email)
    const credential = GoogleAuthProvider.credentialFromError(error);
  
  });
})

let infotext = document.querySelector(".info-text")

infotext.innerHTML +=(
`
<h3><i class='bx bxs-left-arrow' style='color:#f5f0f0'  ></i><a href="./index.html">All BLogs</a></h3>
<h2>Welcome Back!</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
`

)