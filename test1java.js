

let nodeInput = document.getElementsByTagName('input'),
    nodeInputButton = nodeInput[0].nextElementSibling,
    nodeModal = document.querySelector('.modal')

function ajax(confirm) {
   $.ajax(
{
  type:"GET",
  url:`https://api.jikan.moe/v3/search/anime?q=${nodeInput[0].value || ''}`,
  dataType:"json",
  success : function(him){
    let cards = ``;
    him.results.forEach(function(data){
          cards += `<div class="card" style="width: 18rem;background-color:transparent;"><img src=${data.image_url} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">score ${data.score} </p>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"data-id=${data.mal_id}>
  Detail
</button>
  </div>
</div>

`
    })
    document.querySelector('.result_box').innerHTML = cards;
    
    if(confirm){
       nodeInput[0].value = '';
    }
  
    
  },
  error: function(mi){
        let emote = ['<i class="fa-solid fa-face-grin-beam-sweat" style="font-size:12vw;margin-left:20vw;color:lightpink;"><p>empty</p></i>',]
        if(mi.status == 404){
          document.querySelector('.result_box').innerHTML = emote[0]
        }
  }
   
}
  );
} 
window.addEventListener('load',function(){
  ajax(true)
})


nodeInputButton.addEventListener('click',function(clicker){
  clicker.preventDefault()
  ajax(true)
})

$('.result_box').on('click','.card .btn',function(){
  $.ajax({
    type:"GET",
    url:`https://api.jikan.moe/v4/anime/${this.getAttribute('data-id')}`,
    dataType:"json",
    success:function(data){
    nodeModal.innerHTML = `<div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${data.data.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <iframe src="${data.data.trailer.embed_url}" frameborder="0"></iframe>
        <aside style="justify-self:stretch;display:grid;align-content:start;">
        <div class="info-item"><b>-Type<b/> : ${data.data.type}</div>
        <div class="info-item">-Status : ${data.data.status}</div>
        <div class="info-item">-Rank : ${data.data.rank}</div>
        <div class="info-item">-Rating : ${data.data.rating}</div>
        <div class="info-item">-Episodes : ${data.data.episodes}</div>
        <div class="info-item">-Duration : ${data.data.duration}</div>
        <div class="info-item">-Genre : ${data.data.genres.map(function(data){
            return data.name
        })}</div>
        <div class="info-item">-Synopsis :<br>${data.data.synopsis}</div>
        
        </aside>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>`
    }
  })

})


nodeInput[0].addEventListener('keyup',function(key){
   if (key.keyCode == 13) {
    ajax(true)
   }
   ajax(false)
})




