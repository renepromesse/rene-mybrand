
/*------------------some global variables---------------*/

 const articles_div=document.getElementsByClassName('article-container')[0];

/*-------------------requesting blog posts-------------*/

db.collection('articles').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        outputResults(doc);
    })
 });



 /*------------------displaying blog posts--------------*/
let elms='';
function outputResults(doc){
    console.log('Here we go!');
    let url='./read-article.html?id='+ doc.id;


    let elm=`
    <div class="article-section">
    <div class="article-img">
        <a href=`+url+` target="_blank"><img src="`+doc.data().img+`" alt="the image of the blog post"></a>
    </div>
    <div class="article-title">
        <a href=`+url+` target="_blank"><h2>`+doc.data().title+`</h2></a>
        <div class="article-info">
            <a href=`+url+` target="_blank"><p>`+doc.data().post_date+`</p> </a> 
            <a href=`+url+` target="_blank"><p>`+doc.data().num_comments+`comments</p></a> 
        </div>
    </div>
    </div>
        `;

    elms+=elm;

    articles_div.innerHTML=elms;
}
