import {app,db} from "./firebase.js"
import { getAuth,signOut  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc,query, where,getDocs } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"



let Signout = document.getElementById("signout")

const auth = getAuth(app);

Signout.addEventListener("click",()=>{
  signOut(auth).then(() => {
    console.log()
    window.location.assign("../index.html")
 
    
  
  }).catch((error) => {
    Swal.fire({
      icon: 'error',
      title: ' Unexpeccted Error',
      text: 'Signout Error',
    })
  });

})



// Posted Blog

let InputTitle = document.getElementById("input-title")
let InputContent = document.getElementById("Input-content")
let sortedcollectionarray=[]


// Getting data from firebase and writig it
var uid = localStorage.getItem("refuid")
let getData=async()=>{
  let collectionarray=[]
  console.log(uid)
    const q = query(collection(db, "blogs"), where("userid", "==", uid));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      collectionarray.push(doc.data());      
  
    } );
    console.log(collectionarray)
    for(var i=0;i<collectionarray.length;i++){
     if(collectionarray[i].userid==uid){
      sortedcollectionarray.push(collectionarray[i])
      console.log("sortedcollection",sortedcollectionarray)
     }
     else{
      console.log("Error is not sorted")
     }
  }

  console.log("soreghsghdsg",sortedcollectionarray);
  for(var j=0 ; j<sortedcollectionarray.length ; j++){
    console.log([j])
    
    postedBlog.innerHTML += (
        
      `
  
  <div class="blogs">
    <div class="d-flex">
    <img class="blogs-img" src="images/download.png">
  <h2 class="blogs-title">${sortedcollectionarray[j].Title}</h2> 
  
  </div>
  <div class="d-flex ">
    <span>${username}</span>
    <span>-</span>
    <span> 18/08/2023</span>
    </div>   
    <hr>
    <p>${sortedcollectionarray[j].Content}</p>
  </div>
  
  
  `
  
  )
 
  }

   
}




  

let postedBlog = document.getElementById("posted-blog")

publishedpost.addEventListener(("click"), async()=>{


  
  if(InputTitle.value == "".trim() && InputContent.value == "".trim() ){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please Input Something " ,
        // footer: '<a href="">Why do I have this issue?</a>'
      })

      postedBlog.innerHTML =""
}else if(InputTitle.value.length < 3 ){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Title Characters must be greather than 3 " ,
    // footer: '<a href="">Why do I have this issue?</a>'
  })
}
else if(InputContent.value.length < 100 ){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Content Characters must be greather than 100 " ,
    // footer: '<a href="">Why do I have this issue?</a>'
  })
} 


postedBlog.innerHTML += (
        
  `

<div class="blogs">
<div class="d-flex">
<img class="blogs-img" src="images/download.png">
<h2 class="blogs-title">${sortedcollectionarray.Title}</h2> 

</div>
<div class="d-flex ">
<span>${username}</span>
<span>-</span>
<span> 18/08/2023</span>
</div> 

<p>${sortedcollectionarray.Content}</p>
</div>


`

)



  var uid = localStorage.getItem("refuid")
  const docRef = await addDoc(collection(db, "blogs"), {
   Title: InputTitle.value,
   Content:InputContent.value,
   userid: uid,
  });

  console.log("Document written with ID: ", docRef.id);

   
   getData()
       
    })
    

let dashboardUsername = document.getElementById("dashboard-username")
var username = localStorage.getItem("username")

dashboardUsername.innerHTML +=(
    
    `                    <a class="nav-link nav-login "  aria-current="page" id="signout" href="./dashboard.html">${username}</a>
    `
)

getData()
  
