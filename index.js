const box=document.querySelector('.box');

const pageActivity=document.getElementById('pgActivity');
pageActivity.addEventListener('click', ()=>{
  window.history.pushState({page:'activity'}, 'activity', 'activity.html');
  box.innerHTML=history.state;
})

const pageMap=document.getElementById('pgMap');
pageMap.addEventListener('click', ()=>{
  window.history.pushState({page:'map'}, 'map', 'map.html');
  box.innerHTML=history.state;
})