/*----------------reading messages with a status of read:false-------------*/


db.collection('messages').where('read','==',false).onSnapshot(snapshot => {

    let spanNotification= document.getElementById('spanNotification');
    if(snapshot.docs.length>0){
        spanNotification.style.visibility="visible";
        spanNotification.textContent= snapshot.docs.length;
    }
    else{
        spanNotification.style.visibility="hidden";
    }
});

