
/*-------------checking authentication------------*/

auth.onAuthStateChanged(user =>{
    if(user){
        return 1;
    }
    else{
        location.replace('./login.html');
    }
});


/*-------------some global variables-------------*/
const mssgs= document.getElementById('messages');




/*--------------requests data from firestore----------*/


db.collection('messages').get().then(snapshot => {
    snapshot.docs.forEach(doc =>{
        displayMessages(doc);
    })
    
}).then(()=>{

    //after displaying unread messages, set them to read status
    db.collection('messages').where('read','==',false).get().then((snapshot) => {
        snapshot.docs.forEach(doc =>{
            db.collection('messages').doc(doc.id).update({
                read: true
            });
        });
    })
});

/*-------------display messages on the page-------------*/



function d(Elm){
    return document.createElement(Elm);
}

function displayMessages(doc){
    //creating elements
    let comment_section= d('div');
    let comment_img=d('div');
    let comment_title=d('div');
    let name_reply= d('div');
    let h2=d('h2');
    let reply_a=d('a');
    let comment_date= d('p');
    let comment= d('p');
    let img= d('img');
    
    //setting attributes

    comment_section.setAttribute('class','comment-section');
    comment_img.setAttribute('class','comment-img');
    comment_title.setAttribute('class','comment-title');
    name_reply.setAttribute('class','name-reply');
    name_reply.setAttribute('data-id',doc.id);
    reply_a.setAttribute('href','#');
    comment_date.setAttribute('class','comment-date');
    comment.setAttribute('class','comment');
    img.setAttribute('src','../img/prof-img.png');
    img.setAttribute('width','70px');
    img.setAttribute('height','70px');
    // set data

    reply_a.textContent="Reply";
    h2.textContent= doc.data().name;
    comment_date.textContent= doc.data().send_date;
    comment.textContent= doc.data().message;
    //appending elements

    comment_img.appendChild(img);
    name_reply.appendChild(h2);
    name_reply.appendChild(reply_a);
    comment_title.appendChild(name_reply);
    comment_title.appendChild(comment_date);
    comment_title.appendChild(comment);
    comment_section.appendChild(comment_img);
    comment_section.appendChild(comment_title);


    
    if(!(doc.data().read)){
        comment_section.style.background="rgb(224,224,240)";
    }
    else{
        comment_section.style.background="transparent";

    }

    mssgs.appendChild(comment_section);
}
