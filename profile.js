import {getDoc,doc,db,updateDoc,storage,uploadBytesResumable,getDownloadURL, ref} from "./firebase.js"

let content = document.getElementById("content");
let loader = document.getElementById("loader");




 

    var fileInput = document.getElementById("fileInput")

  fileInput.addEventListener("change",(e)=>{
    profilepicture.src = URL.createObjectURL(e.target.files[0])
    
    })
  
  
    const uploadFile  = (file) =>{

      return new Promise((resolve,reject)=>{
      const mountainImagesRef = ref(storage, `images/${file.name}`);
       
      const uploadTask = uploadBytesResumable(mountainImagesRef, file);
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          reject(error);
    console.log(reject)
        }, 
        
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve( downloadURL);
          });
           }
      );
      
      })
      }
    
      
var userid = localStorage.getItem("userid")

let email = document.getElementById("login-email")
let fullname = document.getElementById("fullname")
let infotext = document.querySelector(".info-text")
var profilepicture = document.getElementById("profilepicture")


const docRef = doc(db, "users", userid  );
loader.style.display="flex"
content.style.display="none"
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  fullname.value =  docSnap.data().name
  email.value = docSnap.data().email
  profilepicture.src = docSnap.data().profile && docSnap.data().profile !== "undefined" ? docSnap.data().profile : "images/download.png"
  loader.style.display="none"
  content.style.display="block"
} 

else {
  console.log("No such document!");
}


infotext.innerHTML = (

  `
  <h3><i class='bx bxs-left-arrow' style='color:#f5f0f0'  ></i><a href="./dashboard.html">My BLogs</a></h3>
  <h2 id="usernameheading">Welcome ${docSnap.data().name}</h2>
  <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>


  `
)





let updateBtn = document.getElementById("updatebtn")

updateBtn.addEventListener("click",async()=>{
  let fullname = document.getElementById("fullname") 


loader.style.display="flex"
content.style.display="none" 
 const user = {
  name: fullname.value,
 
 }
  if(fileInput.files[0]){
    user.profile =  await uploadFile(fileInput.files[0])
  }
  const userRef = doc(db, "users", userid );
  await updateDoc(userRef, user );
loader.style.display="none"
content.style.display="block"
Swal.fire(
  'Profile!',
  'Your Profile is Updated!',
  'success'
)

})
