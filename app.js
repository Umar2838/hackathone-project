import {app,auth,doc,getDoc,db,collection,query, where,getDocs,onAuthStateChanged} from "./firebase.js"



onAuthStateChanged(auth, (user) => {
  let dashboardbtn = document.getElementById("dashboardbtn")
  let loginsignup = document.querySelector(".loginsignup")
  let signuplogin = document.querySelector(".signuplogin")
  if (user) {
dashboardbtn.innerHTML=(

  `
                <a class="nav-link nav-login" href="./dashboard.html">Dashboard</a>
          
  `

)
loginsignup.style.display="none"
signuplogin.style.display="none"
  } else {
console.log("user not found")
  }
});




let greetings = document.getElementById("greeting")





// Convert to 12-hour format

var currentDate = new Date();
var currentHour = currentDate.getHours();
var isMorning = currentHour < 12;
var isAfternoon = currentHour >= 12 && currentHour < 18;
var isEvening = currentHour <= 18 ;

let greeting;

if (isMorning) {
  greeting = `Good morning, Readers`;
} else if (isAfternoon) {
  greeting = `Good afternoon, Readers`;
} else if (isEvening) {
  greeting = `Good evening, Reader`;
} else {
  greeting = `Good night, Readers`;
}
greetings.innerHTML += (
`<h3 >${greeting}</h3>`   
)

let content = document.getElementById("content");
let loader = document.getElementById("loader");


loader.style.display="flex"
content.style.display="none"
const getAllBlogs =  async ()=>{
 
  // var uid = localStorage.getItem("userid")
  // console.log("uid ",uid)
  
  // const docRef = doc(db, "users", uid  );
  
  
  // const docSnap = await getDoc(docRef);


  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   console.log("No such document!");
  // }
  

  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " user data ", doc.data().profile);

    let mainBlogs = document.getElementById("main-div")


    mainBlogs.innerHTML += (
          `
  <div class="blogs">
  <div class="d-flex ">
  <img class="blogs-img" src="${doc.data().profile }">
<h2 class="blogs-title">${doc.data().username}</h2>
</div>
<h5 class="viewblogs"><a href="./viewblog.html?user=${doc.data().userid}" >View All Blogs<i class='bx bxs-right-arrow'></i></a> </h5>
<div class="d-flex ">
  <span>${doc.data().time.toDate().toDateString()}</span>
  </div>   
<h5>${doc.data().Title}</h5>
  <hr>
  <p>${doc.data().Content}</p>

</div>
  `
  
   )
  
  })

  loader.style.display="none"
  content.style.display="block"

  }

getAllBlogs()





