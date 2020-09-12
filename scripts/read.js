//let id="MpMWLDl3Ext3DVzUuGuW";
const top_img= document.getElementsByClassName('top-img')[0];
const top_title= document.getElementsByClassName('top-title')[0];
const dates= document.getElementsByClassName('dates')[0];
const main_article= document.getElementsByClassName('main-article')[0];
// finding the id in the url
const urls=window.location.search;
let parameters= new URLSearchParams(urls);
const id= parameters.get('id');
//comments sections
const form_comment=document.getElementById("add-comment");
const butt_submit=document.getElementById("submit_comment");


function displayData(doc){
    //create elements
    let content=document.createElement('p');
    let title= document.createElement('h1');
    let date=document.createElement('p');
    let hr=document.createElement('hr');
    
    //set data

    content.innerHTML=doc.data().content;
    title.textContent= doc.data().title;
    date.textContent= doc.data().post_date;

    //append elements

    top_title.appendChild(title);
    main_article.appendChild(content);
    dates.appendChild(date);
    dates.appendChild(hr);
}
let docRef= db.collection('articles').doc(id);
docRef.get().then(function(doc){
    //console.log(doc.data().title);
    displayData(doc);


});


form_comment.addEventListener('submit',(event)=>{
    event.preventDefault();
    let d = new Date();
    let months = ["January","February","March","April","May","June",
        "July","August","September","October","November","December"];

    let comment_date= months[d.getMonth()] + " " + d.getDate() + "," + " " +d.getFullYear() ;
    
    db.collection('articles/'+id+'/comments').add({
        
        name:form_comment.name.value,
        comment:form_comment.comment.value,
        email: form_comment.email.value,
        comment_date:comment_date
        
    }).then(()=>{
        db.collection('articles/'+id+'/comments').onSnapshot(snapshot =>{
            let num_comments=snapshot.docs.length;
            if(num_comments>0){
                console.log('the num_comments :'+ num_comments);
                db.collection('articles').doc(id).update({
                    num_comments: num_comments
                })
            }
        })
         
    
        form_comment.name.value="";
        form_comment.comment.value="";
        form_comment.email.value="";
        console.log('comment added');
    })
});





function d(Elm){
    return document.createElement(Elm);
}
function displayComments(doc){
    let cmmts=document.getElementById("cmmts");


    //creating elements
    let comment_section= d('div');
    let comment_img=d('div');
    let comment_title=d('div');
    let comment_date= d('p');
    let comment= d('p');
    let img= d('img');
    let h2=d('h2');

    //setting attributes

    comment_section.setAttribute('class','comment-section');
    comment_img.setAttribute('class','comment-img');
    comment_title.setAttribute('class','comment-title');
    comment_date.setAttribute('class','comment-date');
    comment.setAttribute('class','comment');
    img.setAttribute('src','../img/prof-img.png');

    //setting data

    h2.textContent= doc.data().name;
    comment_date.textContent= doc.data().comment_date;
    comment.textContent= doc.data().comment;

    //appending elements

    comment_img.appendChild(img);
    comment_title.appendChild(h2);
    comment_title.appendChild(comment_date);
    comment_title.appendChild(comment);
    comment_section.appendChild(comment_img);
    comment_section.appendChild(comment_title);

    cmmts.appendChild(comment_section);
    
}

db.collection('articles/'+id+'/comments').onSnapshot(snapshot =>{
    let changes= snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == "added"){
            displayComments(change.doc);
        }
    })
});