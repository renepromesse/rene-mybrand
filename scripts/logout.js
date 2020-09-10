
     //logout function
     document.getElementById('logout').addEventListener('click', ()=>{
        //location.replace('../ft-login-page/login.html');
        auth.signOut().then(() =>{
            auth.onAuthStateChanged( user =>{
                if(user){
                    console.log('user not logget out');
                }
                else{
                    console.log('user logged out');
                    location.replace("../html/login.html");

                }
            })
        })
        console.log("logout clicked!");
    });