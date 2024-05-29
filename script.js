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
});

ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("ymap", {
        center: [55.76, 37.64],
        zoom: 7
    });
}