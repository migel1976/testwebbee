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

            // console.log(newContent);
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
            // console.log('navLinks.forEach',url);
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
    // ymaps.ready(init);
    // function init(){
    //     var myMap = new ymaps.Map("ymap", {
    //         center: [55.76, 37.64],
    //         zoom: 7
    //     });
    // }
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("ymap", {
                center: [56.746755, 37.115564],
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
        // Создаем геообъект с типом геометрии "Точка".
            myGeoObject = new ymaps.GeoObject({
                // Описание геометрии.
                geometry: {
                    type: "Point",
                    coordinates: [55.8, 37.8]
                },
                // Свойства.
                properties: {
                    // Контент метки.
                    iconContent: 'Я тащусь',
                    hintContent: 'Ну давай уже тащи'
                }
            }, {
                // Опции.
                // Иконка метки будет растягиваться под размер ее содержимого.
                preset: 'islands#blackStretchyIcon',
                // Метку можно перемещать.
                draggable: true
            // }),
            // myPieChart = new ymaps.Placemark([
            //     55.847, 37.6
            // ], {
            //     // Данные для построения диаграммы.
            //     data: [
            //         {weight: 8, color: '#0E4779'},
            //         {weight: 6, color: '#1E98FF'},
            //         {weight: 4, color: '#82CDFF'}
            //     ],
            //     iconCaption: "Диаграмма"
            // }, {
            //     // Зададим произвольный макет метки.
            //     iconLayout: 'default#pieChart',
            //     // Радиус диаграммы в пикселях.
            //     iconPieChartRadius: 30,
            //     // Радиус центральной части макета.
            //     iconPieChartCoreRadius: 10,
            //     // Стиль заливки центральной части.
            //     iconPieChartCoreFillStyle: '#ffffff',
            //     // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
            //     iconPieChartStrokeStyle: '#ffffff',
            //     // Ширина линий-разделителей секторов и внешней обводки диаграммы.
            //     iconPieChartStrokeWidth: 3,
            //     // Максимальная ширина подписи метки.
            //     iconPieChartCaptionMaxWidth: 200
            });
    
        myMap.geoObjects
            // .add(myGeoObject)
            // .add(myPieChart)
            // .add(new ymaps.Placemark([55.684758, 37.738521], {
            //     balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
            // }, {
            //     preset: 'islands#icon',
            //     iconColor: '#0095b6'
            // }))
            // .add(new ymaps.Placemark([55.833436, 37.715175], {
            //     balloonContent: '<strong>серобуромалиновый</strong> цвет'
            // }, {
            //     preset: 'islands#dotIcon',
            //     iconColor: '#735184'
            // }))
            // .add(new ymaps.Placemark([55.687086, 37.529789], {
            //     balloonContent: 'цвет <strong>влюбленной жабы</strong>'
            // }, {
            //     preset: 'islands#circleIcon',
            //     iconColor: '#3caa3c'
            // }))
            // .add(new ymaps.Placemark([55.782392, 37.614924], {
            //     balloonContent: 'цвет <strong>детской неожиданности</strong>'
            // }, {
            //     preset: 'islands#circleDotIcon',
            //     iconColor: 'yellow'
            // }))
            // .add(new ymaps.Placemark([55.642063, 37.656123], {
            //     balloonContent: 'цвет <strong>красный</strong>'
            // }, {
            //     preset: 'islands#redSportIcon'
            // }))
            // .add(new ymaps.Placemark([55.826479, 37.487208], {
            //     balloonContent: 'цвет <strong>фэйсбука</strong>'
            // }, {
            //     preset: 'islands#governmentCircleIcon',
            //     iconColor: '#3b5998'
            // }))
            .add(new ymaps.Placemark([56.727527, 37.144348] , {
                balloonContent: 'цвет <strong>носика Гены</strong>',
                iconCaption: 'здесь я живу'
            }, {
                preset: 'islands#greenDotIconWithCaption'
            }))
            // .add(new ymaps.Placemark([55.790139, 37.814052], {
            //     balloonContent: 'цвет <strong>голубой</strong>',
            //     iconCaption: 'Очень длиннный, но невероятно интересный текст'
            // }, {
            //     preset: 'islands#blueCircleDotIconWithCaption',
            //     iconCaptionMaxWidth: '50'
            // }));
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
        // console.log(result)
        return result
    // }
  }

    var timer = setInterval(function() {
        // console.log(showPopup());
        if(document.querySelector('.mytimer')!==null){
            document.querySelector('.mytimer').innerHTML=showPopup();
        }
    }, 1000);
