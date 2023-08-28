import {app,db,signOut,serverTimestamp,auth,collection,doc, query, where,getDocs,getDoc,onAuthStateChanged,addDoc} from "./firebase.js"



// Sign Out User ---------------------------------------------------------------------------------------



let Signout = document.getElementById("signout")
Signout.addEventListener("click",()=>{
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




var uid = localStorage.getItem("userid")


    const docRef = doc(db, "users", uid  );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      var Username = docSnap.data().name
      var Profile = docSnap.data().profile 

      console.log("Profile",Profile)
     
      let dashboardUsername = document.getElementById("dashboard-username")

      dashboardUsername.innerHTML +=(
    
        `    <a class="nav-link nav-login "  aria-current="page" id="signout" href="./profile.html">${docSnap.data().name}</a>
        `
    )

      }

  
 




  let content = document.getElementById("content");
  let loader = document.getElementById("loader");

const submitBlog = async () =>{
   let InputTitle = document.getElementById("input-title")
    let InputContent = document.getElementById("Input-content")
   
    
loader.style.display="flex"
content.style.display="none"
    const docRef = await addDoc(collection(db, "blogs"), {
      Title: InputTitle.value,
      Content: InputContent.value,
      time: serverTimestamp(),
      userid : uid,
      username : Username, 
   profile:  Profile 
     
    });
InputTitle.value=""
InputContent.value=""
loader.style.display="none"
content.style.display="block"
      Swal.fire(
      'Blog!',
      'Blog Published!',
      'success'
    )
    



  }


  const getcurrentuserBlogs  = async(uid)=>{
    let postedBlog = document.getElementById("posted-blog")
  
    const q = query(collection(db, "blogs"), where("userid", "==", uid));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  
    console.log("current user data",doc.data())
  
    postedBlog.innerHTML += (
            
            `
        
        <div class="blogs">
          <div class="d-flex">
          <img class="blogs-img" src="${Profile || Profile == "undefined" ? Profile : "images/download.png"}">
        <h2 class="blogs-title">${doc.data().Title}</h2> 
        
        </div>
        <div class="d-flex ">
          <span>${doc.data().username}</span>
          <span>${doc.data().time.toDate().toDateString()}</span>
          </div>   
          <hr>
          <p>${doc.data().Content}</p>
        </div>
        
        
        `
        
  
        )
     
  
     
  
  
  }
    )}
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(location.pathname !== "/dashboard.html" && flag)
  location.href="dashboard.html"
  getcurrentuserBlogs(user.uid)
  console.log("user found",user)
      const uid = user.uid;
      localStorage.setItem("userid",uid)
      // ...
    } else {
  console.log("user not found")
    }
  });
  

  let publishedpost = document.getElementById("publishedpost")

  publishedpost.addEventListener("click",submitBlog)
    


    

    
 
    



    
    
    
    
    
    


    

  

  
  


  
    
 













