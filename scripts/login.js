const db=firebase.firestore();
const auth= firebase.auth();
//email: rene@gmail.com
//password: rene1234
const form_login= document.getElementById("login-form");
form_login.addEventListener('submit', event =>{
    event.preventDefault();
    const email= form_login['email'].value;
    const password= form_login['password'].value;
    if(email != "" && password !=""){
        auth.signInWithEmailAndPassword(email,password).then( () =>{
            location.replace('./create-article.html');
        })
    }

    form_login.reset();
});


//lestening to the user status 
auth.onAuthStateChanged( user =>{
    if(user){
        location.replace('./create-article.html');
    }
});

