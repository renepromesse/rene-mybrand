auth.onAuthStateChanged(user =>{
    if(user){
       console.log('user is still in'); 
    }
    else{
        console.log('user not in');
        location.replace('./login.html');
    }
})