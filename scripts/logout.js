
     //logout function
     document.getElementById('logout').addEventListener('click', ()=>{
        auth.signOut().then(() =>{
            auth.onAuthStateChanged( user =>{
                if(user != null){
                    location.replace("../html/login.html");

                }
                
            })
        })
    });