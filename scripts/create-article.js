/*const db = firebase.firestore();
const auth= firebase.auth();
const articles_div=document.getElementsByClassName('articles')[0];
const form_article=document.getElementsByTagName('form')[0];
let id="";*/

auth.onAuthStateChanged(user =>{
    if(user){
       console.log('user is still in'); 
    }
    else{
        console.log('user not in');
        location.replace('./login.html');
    }
})
/*
form_article.addEventListener('submit', (event) =>{
    event.preventDefault();
    let post_but=document.getElementById('post');
    let button=document.getElementById('create-article');

    if(post_but.innerHTML=="Post"){
       if(form_article.title.value !=="" && form_article.content.value !== ""){
        let d = new Date();
            let months = ["January","February","March","April","May","June",
                            "July","August","September","October","November","December"];

            let post_date= months[d.getMonth()] + " " + d.getDate() + "," + " " +d.getFullYear() ;
            
            db.collection('articles').add({
                title: form_article.title.value,
                content: form_article.content.value,
                num_comments: 0,
                post_date: post_date
            }); 
            console.log('the post is done');
        }else{
            form_article.title.placeholder= "this is not working";
            form_article.title.style.color="red";
        }
    }
    if(post_but.innerHTML=="Post changes"){
        db.collection('articles').doc(id).update({
            title: form_article.title.value,
            content: form_article.content.value
        });
        console.log('updating the id '+ id);
        id="";
        post_but.innerHTML="Post";
        
    }
    
    
    form_article.title.value="";
    form_article.content.value="";
    button.click();
    //button.innerHTML="Hide this Panel";
    
})


/*------------displaying old articles----------*/
/*

function d(Elm){
    return document.createElement(Elm);
}
function outputResults(doc){
    //create elements
    let old_articles_section= d('div');
    let article_img=d('div');
    let article_info=d('div');
    let article_title=d('div');
    let edit_delete= d('div');
    let img= d('img');
    let h2=d('h2');
    let p=d('p');
    let edit=d('h3');
    let dlt= d('h3');
    //setting attributes
    old_articles_section.setAttribute('class','old-articles-section');
    article_img.setAttribute('class','article-img');
    article_info.setAttribute('class','article-info');
    article_title.setAttribute('class','article-title');
    edit_delete.setAttribute('class','edit-delete');
    edit_delete.setAttribute('data-id',doc.id);
    img.setAttribute('src','img/prof-img.png');
    edit.setAttribute('class','edit');
    dlt.setAttribute('class','delete');
    
    //setting content
    h2.textContent=doc.data().title;
    p.textContent= doc.data().post_date;
    edit.textContent="Edit";
    dlt.textContent="Delete";
    // append elements with values
    article_img.appendChild(img);
    
    article_title.appendChild(h2);
    article_title.appendChild(p);
    article_info.appendChild(article_title);

    edit_delete.appendChild(edit);
    edit_delete.appendChild(dlt);
    article_info.appendChild(edit_delete);

    old_articles_section.appendChild(article_img);
    old_articles_section.appendChild(article_info);

    articles_div.appendChild(old_articles_section);
    

    console.log('done');

    //deleting data
    dlt.addEventListener('click', (event) =>{
        event.stopPropagation();
        let id= event.target.parentElement.getAttribute('data-id');
        db.collection('articles').doc(id).delete();
        console.log("deleting this article: "+ id);
        
    });

    //updating data
    edit.addEventListener('click', (event) =>{
        event.stopPropagation();
        let button=document.getElementById('create-article');
        if(button.innerHTML == 'Create new article'){
            button.click();
            form_article.title.focus();
            form_article.title.value= doc.data().title;
            form_article.content.value= doc.data().content;
            document.getElementById('post').innerHTML="Post changes";
            id=event.target.parentElement.getAttribute('data-id');
            //set the image here

        }



        /*let id = event.target.parentElement.getAttribute('data-id');
        db.collection('articles').doc(id).update({
            title: form_article.title.value,
            content: form_article.content.value
        });*/
/*        console.log(id + " is being updated");
    })
    console.log('done');
}

db.collection('articles').onSnapshot((snapshot) => {
    snapshot.docs.forEach(doc =>{
        outputResults(doc);
    })
 });
     console.log(document.getElementById('post').innerHTML);



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
                    location.replace("../ft-login-page/login.html");

                }
            })
        })
        console.log("logout clicked!");
    });*/