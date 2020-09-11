auth.onAuthStateChanged(user =>{
    if(user){
        continue;
    }
    else{
        location.replace('./login.html');
    }
})