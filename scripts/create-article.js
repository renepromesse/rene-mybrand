
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
const articles_div=document.getElementsByClassName('articles')[0];
const form_article=document.getElementsByTagName('form')[0];
let id='';
let labelfiles=document.getElementById('labelfile');
let top_preview=document.getElementById('top-img-prev');

/*------------storing new article into firestore-------------*/


form_article.addEventListener('submit', (event) =>{
    event.preventDefault();
    let post_but=document.getElementById('post');
    let button=document.getElementById('create-article');

    if(post_but.innerHTML=="Post"){
       if(form_article.title.value !=="" && form_article.content.value !== "" && form_article.files != "undefined"){
             
            //image

            const img=document.getElementById('files').files[0];

            let imgName=img.name;
            let imgMetadata= {
                contentType: img.type
            };
            const imgUpload= stor.child(imgName).put(img,imgMetadata);
            imgUpload.then(snapshot =>snapshot.ref.getDownloadURL())
            .then(url =>{
                let d = new Date();
                let months = ["January","February","March","April","May","June",
                                "July","August","September","October","November","December"];

                let post_date= months[d.getMonth()] + " " + d.getDate() + "," + " " +d.getFullYear() ;
               
                //adding data into firestore
                db.collection('articles').add({
                    title: form_article.title.value,
                    content: form_article.content.value,
                    num_comments: 0,
                    post_date: post_date,
                    img: url
                }).then(()=>{
                    form_article.reset();
                    labelfiles.innerHTML="Click to choose a cover image";
                    location.reload();
                })
                
            });
        }
    }

    //updates new changes to a selected document 
    if(post_but.innerHTML=="Post changes"){
        db.collection('articles').doc(id).update({
            title: form_article.title.value,
            content: form_article.content.value
            //updates image later
        }).then(()=>{
            id="";
            post_but.innerHTML="Post"; 
            form_article.reset();
            location.reload();
            
        })
        
        
    }
});



/*-------------reading old articles form firestore----------*/

db.collection('articles').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        outputResults(doc);
    })
 });

 /*------------displaying old articles----------*/


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
    img.setAttribute('src',doc.data().img);
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
            //set the image here when all non-image post are removed in firestore
            labelfiles.innerHTML="can't change the cover image";
            labelfiles.style.backgroundImage="url('"+doc.data().img+"')";
            labelfiles.style.backgroundRepeat="no-repeat";
            labelfiles.style.backgroundSize="100% auto";
            labelfiles.style.backgroundPosition="0px -100px";
            document.getElementById('files').disabled="true";
            top_preview.style.backgroundImage="url('"+doc.data().img+"')";
        }
    });









    //deleting data
    dlt.addEventListener('click', (event) =>{
        event.stopPropagation();
        id= event.target.parentElement.getAttribute('data-id');
        dlt.textContent="deleting...";
        db.collection('articles').doc(id).delete().then(() =>{
            location.reload();  
        });
    })

















}


