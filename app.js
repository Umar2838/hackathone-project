import {app,db} from "./firebase.js"
import { collection, addDoc,query, where,getDocs } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"

let greetings = document.getElementById("greeting")


var currentDate = new Date();
var currentHour = currentDate.getHours();

console.log(currentHour)
let greeting;

if (currentHour < 12) {
  greeting = "Good morning,Readers";
} else if (currentHour < 18) {
  greeting = "Good afternoon,Readers";
} else if (currentHour < 22) {
  greeting = "Good evening,Reader";
} else {
  greeting = "Good night,Readers";
}

greetings.innerHTML += (
`<h3 >${greeting}</h3>`   
)


let getData=async()=>{
  let collectionarray=[]
 
  
    const q = (collection(db, "blogs"))
    
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      collectionarray.push(doc.data());
      console.log(collectionarray.length)
      console.log(collectionarray)
      
  
    } );
    console.log(collectionarray)
  
  for(var j=0;j<collectionarray.length;j++){
  console.log("inside ",collectionarray)

  let mainBlogs = document.getElementById("main-div")


  mainBlogs.innerHTML += 
        
    `
    <div class="blogs">
    <div class="d-flex">
    <img class="blogs-img" src="images/download.png">
<h2 class="blogs-title">${collectionarray[j].Title}</h2> 

</div>
<div class="d-flex ">
    <span>Elon Musk</span>
    <span>-</span>
    <span> 18/08/2023</span>
    </div> 
    
    <p>${collectionarray[j].Content}</p>
</div>
`


  }

}


getData()