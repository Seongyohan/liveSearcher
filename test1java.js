

let nodeInput = document.getElementsByTagName('input'),
    nodeInputButton = nodeInput[0].nextElementSibling,
    nodeModal = document.querySelector('.modal')

function ajax() {
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
    nodeInput[0].value = '';
    let nodeCardButton = document.querySelector('.card-body .btn');
    
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
  ajax()
})


nodeInputButton.addEventListener('click',function(clicker){
  clicker.preventDefault()
  ajax()
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
        <aside>${data.data.mal_id}</aside>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>`
    }
  })

})