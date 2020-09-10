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
        auth.signInWithEmailAndPassword(email,password).then( cred =>{
            console.log('this user logged in: '+cred.user);
            location.replace('./create-article.html');
        })
    }else{
        console.log('Please enter correct email and password');
        //document.getElementById('errors').innerHTML="Please check your network or creds";
    }




    form_login.reset();
});


//lestening to the user status 
auth.onAuthStateChanged( user =>{
    if(user){
        location.replace('./create-article.html');
    }
    else{
        //document.getElementById('errors').innerHTML="Admin Login";
        console.log('The user is not logged in');
    }
});

