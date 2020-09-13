/*-------------dealing with the modal and processing the image------------*/





		let labelfile=document.getElementById('labelfile');
        //generating a blob image
        let link='';
		let loadFile = function(event) {
		let d=document.getElementById('top-img-prev');
        let out=URL.createObjectURL(event.target.files[0]);
        link=out;
		d.style.backgroundImage="url('"+out+"')";
        
        //on the label
        labelfile.innerHTML=document.getElementById('files').value.replace(/^.*[\\\/]/, '');
        labelfile.style.backgroundImage="url('"+out+"')";
        labelfile.style.backgroundRepeat="no-repeat";
        labelfile.style.backgroundSize="100% auto";
        labelfile.style.backgroundPosition="0px -100px";
		};
		//dealing with text

		let t=document.getElementById('title');
		let cont=document.getElementsByClassName('write-article')[0];
		let t_prev=document.getElementById('t-prev');
		let cont_prev= document.getElementById('cont-prev');

		
		let modal=document.getElementById('modal');
		let preview=document.getElementById('preview');
		let closes= document.getElementById('close');
		preview.onclick=function () {
			modal.style.display="block";
			t_prev.innerHTML= t.value;
			
		}
		closes.onclick=function(){
			modal.style.display="none";
		}
		window.onclick=function (event) {
			if (event.target===modal) {
				modal.style.display="none";
			}
		}

        //cancel and free memory
        let cancel= document.getElementById('cancel');
        cancel.addEventListener('click',() =>{
            URL.revokeObjectURL(link);
            labelfile.style.background="#3377CC";
            labelfile.innerHTML="Click to Choose a cover image";
            document.getElementById('top-img-prev').style.backgroundImage="";
        })


