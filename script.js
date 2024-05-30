document.addEventListener('DOMContentLoaded',()=>{

    sessionStorage.clear();

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
        })
    }
    navLinks.forEach(el=>{
        el.addEventListener('click', (e)=>{
            e.preventDefault();
            const url=e.currentTarget.getAttribute('href');
            loadPage(url);
            console.log('navLinks.forEach',url);
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
    // if (spentTime >= 60) {
        const result=`Вы провели на сайте минут: ${Math.floor(spentTime / 60)}, секунд: ${Math.floor(spentTime % 60)}`
        console.log(result)
        return result
    // }
  }

    var timer = setInterval(function() {
        console.log(showPopup());
        if(document.querySelector('.mytimer')!==null){
            document.querySelector('.mytimer').innerHTML=showPopup();
        }
    }, 1000);
