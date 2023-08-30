import {app,db,collection,query,where,getDocs} from "./firebase.js"


let content = document.getElementById("content");
let loader = document.getElementById("loader");

loader.style.display="flex"
content.style.display="none"
const getuserBlogs = async() =>{

    const urlParam = new URLSearchParams(location.search)
    const userid = urlParam.get('user')
console.log("userid",userid)

    let postedBlog = document.getElementById("posted-blog")
    let userview = document.getElementById("userview")
  postedBlog.innerHTML = ""

    const q = query(collection(db, "blogs"), where("userid", "==", userid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  
userview.innerHTML =(

    `
    <img class="userimg" src="${doc.data().profile && doc.data().profile !== "undefined" ? doc.data().profile : "images/download.png"}">
    <h2>${doc.data().username}</h2>
    `

)
  
    postedBlog.innerHTML += (
            
            `
        
        <div class="blogs">
        <div class="edittrash">
  <i class='bx bxs-edit edit' onclick="editBlog('${doc.id}','${doc.data().Title}','${doc.data().Content}')"  style="color:red;"></i>
  <i class='bx bxs-trash-alt trash' onclick="deleteBlog('${doc.id}')" style="color:red;"></i>
  </div>
          <div class="d-flex ">
          <img class="blogs-img" src="${doc.data().profile}">
        <h2 class="blogs-title">${doc.data().username}</h2> 
  </div>
  
  
  <div class="d-flex ">
  <span>${doc.data().time.toDate().toDateString()}</span>
  </div>   
  <h5>${doc.data().Title}</h5>
  <hr>
  <p>${doc.data().Content}</p>
  
        </div>
        
        
        `
        
  
        )
     

  loader.style.display="none"
content.style.display="block"
  }
    )}
  


getuserBlogs()