
//get form and send button
let form_message= document.getElementById("send-message");

form_message.addEventListener('submit', (event)=>{
    event.preventDefault();
    let d = new Date();
    let months = ["January","February","March","April","May","June",
        "July","August","September","October","November","December"];

    let send_date= months[d.getMonth()] + " " + d.getDate() + "," + " " +d.getFullYear() ;
    let notification=document.getElementById("notification");
    if((form_message.name.value !="" )&& (form_message.message.value!="") && (form_message.email.value!="")){
        db.collection('messages').add({
            name: form_message.name.value,
            email: form_message.email.value,
            message: form_message.message.value,
            send_date: send_date,
            read: false
        });
        notification.innerHTML="Message sent successfully!";
        notification.style.color="green";
        notification.style.background="lightgreen";
        notification.style.borderRadius="10px";
        form_message.reset();
        return true;
    }
    if(form_message.name.value ==""){
        notification.innerHTML="Please write your name!";
        notification.style.color="red";
        notification.style.background="transparent";
        form_message.name.placeholder="Please write your name here";
        
    }
    if(form_message.message.value==""){
        notification.innerHTML="Please write your message!";
        notification.style.color="red";
        notification.style.background="transparent";
        form_message.message.placeholder="Please write your name here";
    }
    if (form_message.email.value==""){
        notification.innerHTML="Please write your email!";
        notification.style.color="red";
        notification.style.display="transparent";
        form_message.email.placeholder="Please write your email here";
        
    }
    if((form_message.name.value =="" )&& (form_message.message.value=="") && (form_message.email.value=="")){
        notification.innerHTML="Nothing to send!";
        notification.style.color="red";
        notification.style.background="transparent";
    }
    
    
    console.log("send clicked");
});


