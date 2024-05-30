document.addEventListener('DOMContentLoaded',()=>{

    const contentDiv=document.querySelector('.content');
    const navLinks=document.querySelectorAll('.nav-link');

    const loadPage=(url)=>{
        fetch(url)
        .then(response=>response.text())
        .then(html=>{
            const parser=new DOMParser();
            const doc=parser.parseFromString(html, 'text/html');
            const newContent=doc.querySelector('.content').innerHTML;

            console.log(newContent);
            contentDiv.innerHTML=newContent;
            if(url?.includes('map')){
                loadMaps();
            }
            if(url?.includes('timer')){
                var timer = setInterval(function() {
                    console.log(showPopup());
                    document.getElementById("time").innerHTML = showPopup();
                }, 1000);
            }

        // ymaps.ready(init);
        // function init(){
        //     var myMap = new ymaps.Map("ymap", {
        //         center: [55.76, 37.64],
        //         zoom: 7
        //     });
        // }

        })
    }
    navLinks.forEach(el=>{
        el.addEventListener('click', (e)=>{
            e.preventDefault();
            const url=e.currentTarget.getAttribute('href');
            loadPage(url);
            // Если неактивный элемент 
            if (!el.target.className?.includes('active')) {
                // Взять элемент с классом active
                let a = document.querySelector('.active')
                // Убрать класс active
                a.className = a.className.replace('active', '')
                // Добавить класс active в нажатый элемент
                e.target.className += ' active'
            }
        })
    })
    // setTimeout(function() { 
    //     location.reload(); 
    // }, 5000); // 1000 milliseconds = 1 second 
//   if (!sessionStorage.getItem('startTime')) {
    // sessionStorage.setItem('startTime', Date.now());
//   }
//   else{
    // sessionStorage.clear();
//   }
});

const loadMaps=()=>{
    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("ymap", {
            center: [55.76, 37.64],
            zoom: 7
        });
    }
};



  if (!sessionStorage.getItem('startTime')) {
    sessionStorage.setItem('startTime', Date.now());
  }
  const enterTime = sessionStorage.getItem('startTime')
  const showPopup = () => {
    let currentTime = Date.now()
    let spentTime = (currentTime - enterTime) / 1000
    if (spentTime >= 60) {
    //   clearInterval(timer)
    //   alert(`Вы провели на сайте минут: ${Math.floor(spentTime / 60)}, секунд: ${Math.floor(spentTime % 60)}`)

    const result=`Вы провели на сайте минут: ${Math.floor(spentTime / 60)}, секунд: ${Math.floor(spentTime % 60)}`
    console.log(result)
    return result
    // return `Вы провели на сайте минут: ${Math.floor(spentTime / 60)}, секунд: ${Math.floor(spentTime % 60)}`
    }
  }

// var time = setInterval(function() {
//     var date = new Date();
//     document.getElementById("time").innerHTML = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
//   }, 1000);
  
// //   const timer = setInterval(showPopup, 10000)
//     var timer = setInterval(function() {
//         // var date = new Date();
//         // document.getElementById("time").innerHTML = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
//         console.log(showPopup());
//         document.getElementById("time").innerHTML = showPopup();
//     }, 1000);
