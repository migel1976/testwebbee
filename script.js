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
            loadMaps();

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
    const loadMaps=()=>{
        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("ymap", {
                center: [55.76, 37.64],
                zoom: 7
            });
        }
    };
});

let observer = new MutationObserver(mutationRecords => {
    console.log(mutationRecords); // console.log(изменения)
  });
  
//   // наблюдать за всем, кроме атрибутов
//   observer.observe(elem, {
//     childList: true, // наблюдать за непосредственными детьми
//     subtree: true, // и более глубокими потомками
//     characterDataOldValue: true // передавать старое значение в колбэк
//   });

// const loadMaps=()=>{
//     ymaps.ready(init);
//     function init(){
//         var myMap = new ymaps.Map("ymap", {
//             center: [55.76, 37.64],
//             zoom: 7
//         });
//     }
// };

// вывести изменения состояния
// document.addEventListener('readystatechange', () => console.log(document.readyState));