import { app, db, signOut, serverTimestamp, auth, collection, deleteDoc, doc, query, where, getDocs, getDoc, onAuthStateChanged, updateDoc, addDoc } from "./firebase.js"



// Sign Out User ---------------------------------------------------------------------------------------
var uid = localStorage.getItem("userid")

let content = document.getElementById("content");
let loader = document.getElementById("loader");

let Signout = document.getElementById("signout")
Signout.addEventListener("click", () => {
  signOut(auth).then(() => {
    location.href("../index.html")

  }).catch((error) => {
    Swal.fire({
      icon: 'error',
      title: ' Unexpeccted Error',
      text: 'Signout Error',
    })
  });

})

// -----------------------------------------------------

loader.style.display="flex"
content.style.display="none"
const getcurrentuserBlogs = async (uid) => {

  let postedBlog = document.getElementById("posted-blog")
  postedBlog.innerHTML = ""
  const q = query(collection(db, "blogs"), where("userid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {


    postedBlog.innerHTML += (

      `
      
      <div class="blogs">
      <div class="edittrash">
<i class='bx bxs-edit edit' onclick="editBlog('${doc.id}','${doc.data().Title}','${doc.data().Content}')"  style="color:red;"></i>
<i class='bx bxs-trash-alt trash' onclick="deleteBlog('${doc.id}')" style="color:red;"></i>
</div>
        <div class="d-flex ">
        <img class="blogs-img" src="${Profile || Profile == "undefined" ? Profile : "images/download.png"}">
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
  
  }
  )
  loader.style.display="none"
  content.style.display="block"
 


}
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (location.pathname !== "/dashboard.html" && flag)
      location.href = "dashboard.html"
    getcurrentuserBlogs(user.uid)
    const uid = user.uid;
    localStorage.setItem("userid", uid)
    // ...
  } else {
    console.log("user not found")
  }
});







const docRef = doc(db,"users",uid);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  var Username = docSnap.data().name
  var Profile = docSnap.data().profile


  let dashboardUsername = document.getElementById("dashboard-username")

  dashboardUsername.innerHTML += (

    `    <a class="nav-link nav-login "  aria-current="page" id="signout" href="./profile.html">${docSnap.data().name}</a>
        `
  )

}



const submitBlog = async () => {
  let InputTitle = document.getElementById("input-title")
  let InputContent = document.getElementById("Input-content")


  loader.style.display = "flex"
  content.style.display = "none"
  const docRef = await addDoc(collection(db, "blogs"), {
    Title: InputTitle.value,
    Content: InputContent.value,
    time: serverTimestamp(),
    userid: uid,
    username: Username,
    profile: Profile

  });
  getcurrentuserBlogs(uid)
  InputTitle.value = ""
  InputContent.value = ""
  loader.style.display = "none"
  content.style.display = "block"
  Swal.fire(
    'Blog!',
    'Blog Published!',
    'success'
  )
}

let publishedpost = document.getElementById("publishedpost")

publishedpost.addEventListener("click", submitBlog)



const deleteBlog = async (id) => {
  loader.style.display = "flex"
  content.style.display = "none"
  console.log(id)
  await deleteDoc(doc(db, "blogs", id));
  loader.style.display = "none"
  Swal.fire(
    'Delete!',
    'Blog Deleted!',
    'success'
  )
  content.style.display = "block"

  getcurrentuserBlogs(uid)
}


window.deleteBlog = deleteBlog

let customModal = document.getElementById("customModal")

let updateContent = document.getElementById("update-content")
let updateTitle = document.getElementById("update-title")
let updateid;
const editBlog = (id, title, content) => {
  customModal.style.display = "block"
  updateid = id
  updateTitle.value = title
  updateContent.value = content


}
window.editBlog = editBlog

let updatePost = document.getElementById("updatepost")

updatePost && updatePost.addEventListener("click", async () => {
  loader.style.display = "flex"
  content.style.display = "none"
  customModal.style.display = "none"
  const updateBlog = doc(db, "blogs", updateid);
  await updateDoc(updateBlog, {
    Title: updateTitle.value,
    Content: updateContent.value
  });
  loader.style.display = "none"
  Swal.fire(
    'Updtaed!',
    'Blog Updated!',
    'success'
  )
  getcurrentuserBlogs(uid)
  content.style.display = "block"
  console.log(updateTitle.value, updateContent.value, updateid)

})















const closemodal = () => {

  customModal.style.display = "none"

}























window.closemodal = closemodal































