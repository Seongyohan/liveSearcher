

let nodeInput = document.getElementsByTagName('input'),
    nodeInputButton = nodeInput[0].nextElementSibling,
    nodeModal = document.querySelector('.modal');


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
    <p class="card-text">score <span style="color:#f5646b;">${data.score}</span> </p>
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
        let emote = ['<i class="fa-solid fa-face-grin-beam-sweat" style="font-size:12vw;margin-left:20vw;color:#f5646b;"><p>empty</p></i>',]
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
        <h5 class="modal-title" id="exampleModalLabel"><span>${data.data.title}</span></h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <iframe src="${data.data.trailer.embed_url}" frameborder="0"></iframe>
        <aside style="justify-self:stretch;display:grid;align-content:start;">
        <div class="info-item"><b><span style="color:#f5646b;">-Type</span><b/> : ${data.data.type}</div>
        <div class="info-item"><span>-Status</span> : ${data.data.status}</div>
        <div class="info-item"><span>-Rank</span> : ${data.data.rank}</div>
        <div class="info-item"><span>-Rating</span> : ${data.data.rating}</div>
        <div class="info-item"><span>-Episodes</span> : ${data.data.episodes}</div>
        <div class="info-item"><span>-Duration</span> : ${data.data.duration}</div>
        <div class="info-item"><span>-Genre</span> : ${data.data.genres.map(function(data){
            return data.name
        })}</div>
        <div class="info-item"><span>-Synopsis</span> :<br>${data.data.synopsis}</div>
        
        </aside>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>`
    }
  })

})
$('.modal').on('click','button',function(){
  nodeModal.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>`;
})

nodeInput[0].addEventListener('keyup',function(key){
   if (key.keyCode == 13) {
    ajax(true)
    nodeInput[0].value = '';
    return null;
   }
  ajax(false)
  console.log("myy")
})




