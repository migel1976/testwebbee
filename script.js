document.addEventListener('DOMContentLoaded',()=>{

    sessionStorage.clear();

    const contentDiv=document.querySelector('.content');
    const navLinks=document.querySelectorAll('.nav-link');
    const loadingOverlay=document.querySelector('.loading-overlay');

    const showLoadingOverlay=()=>{
        loadingOverlay.style.opacity='1';
    }
    const hideLoadingOverlay=()=>{
        loadingOverlay.style.opacity='0';
    }

    const loadPage=(url)=>{
        showLoadingOverlay();
        fetch(url)
        .then(response=>response.text())
        .then(html=>{
            const parser=new DOMParser();
            const doc=parser.parseFromString(html, 'text/html');
            const newContent=doc.querySelector('.content').innerHTML;
            contentDiv.classList.add('fade-out');

            contentDiv.innerHTML=newContent;
            document.title=doc.title;
            setTimeout(() => {
                contentDiv.classList.remove('fade-out');
                history.pushState({}, '', url);
                hideLoadingOverlay();
            }, 500);
            if(url?.includes('map')){
                loadMaps();
            }
        })
    }
    navLinks.forEach(el=>{
        el.addEventListener('click', (e)=>{
            e.preventDefault();
            const url=e.currentTarget.getAttribute('href');
            showLoadingOverlay();
            loadPage(url);
            if (!el.target.className?.includes('active')) {
                let a = document.querySelector('.active')
                a.className = a.className.replace('active', '')
                e.target.className += ' active'
            }
        })
    })
    loadPage(window.location.pathname);
    window.addEventListener('popstate', ()=>{
        loadPage(window.location.pathname);
    })
});

const loadMaps=()=>{
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("ymap", {
                center: [56.746755, 37.115564],
                zoom: 12
            }, {
                searchControlProvider: 'yandex#search'
            });
    
        myMap.geoObjects
            .add(new ymaps.Placemark([56.727527, 37.144348] , {
                iconCaption: 'Я здесь живу'
            }, {
                preset: 'islands#greenDotIconWithCaption'
            }))
    }
};


  if (!sessionStorage.getItem('startTime')) {
    sessionStorage.setItem('startTime', Date.now());
  }
  const enterTime = sessionStorage.getItem('startTime')
  const showPopup = () => {
    let currentTime = Date.now()
    let spentTime = (currentTime - enterTime) / 1000
        const result=`Вы провели на сайте минут: ${Math.floor(spentTime / 60)}, секунд: ${Math.floor(spentTime % 60)}`
        // console.log(result)
        return result
  }

    var timer = setInterval(function() {
        // console.log(showPopup());
        if(document.querySelector('.mytimer')!==null){
            document.querySelector('.mytimer').innerHTML=showPopup();
        }
    }, 1000);
