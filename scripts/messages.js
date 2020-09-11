auth.onAuthStateChanged(user =>{
    if(user){
        return 1;
    }
    else{
        location.replace('./login.html');
    }
})