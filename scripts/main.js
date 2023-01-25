


const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android()||
      isMobile.BlackBerry()||
      isMobile.iOS()||
      isMobile.Opera()||
      isMobile.Windows());
 }
};

if(isMobile.any()) {
  document.body.classList.add('_touch');

  const menuArrows = document.querySelectorAll('.menu__arrow');
  menuArrows.forEach((item) => {

    item.addEventListener('click',function (e) {
      item.parentElement.classList.toggle('_active');

    })
  });

} else {
  document.body.classList.add('_pc');
}
// slider
let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const sliderConteiner = document.querySelector('.slider__container');
const sliderContent = document.querySelector('.slider__content');
const buttuonNext =document.querySelector('.next');
const buttuonPrev =document.querySelector('.prev');
const items = document.querySelectorAll('.slider__item');
const sliderItemCount = items.length;
const itemWidth = sliderConteiner.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
const numbers = document.querySelector('.slider-numbers');
let number = 1;

items.forEach((item, i) => {
  item.style.minWindth = `${itemWidth}px`;
});

buttuonNext.addEventListener('click', function () {
  const itemsLeft = sliderItemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
  number++;
  numbers.textContent= number;
});

buttuonPrev.addEventListener('click', function () {
  const itemsLeft = (Math.abs(position)) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth ;
  setPosition();
  checkBtns();
  number--;
  numbers.textContent= number;

});

 function setPosition() {
   sliderContent.style.transform = `translateX(${position}px)`;
 }

 function checkBtns() {
   buttuonPrev.disabled = position === 0;
   buttuonNext.disabled = position <= -(sliderItemCount - slidesToShow) * itemWidth;
 }

// menu

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
iconMenu.addEventListener('click', function () {
  document.body.classList.toggle('_lock'); // запрещеем прокрутку страницы, при открытом меню
  iconMenu.classList.toggle('_active');
  menuBody.classList.toggle('_active');

});


//Прокрутка


const menuLinks = document.querySelectorAll('.link[data-goto]');
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', onMenuLinkClick);
});
function onMenuLinkClick(e) {
  const menuLink = e.target;
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

    if(iconMenu.classList.contains('_active')){
      document.body.classList.remove('_lock'); // запрещеем прокрутку страницы, при открытом меню
      iconMenu.classList.remove('_active');
      menuBody.classList.remove('_active');
    }

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth"
    });
    e.preventDefault();
  }
}




const newsStorage = [
    {
      tag: "Тема",
      title: "Ура! Новое партнерство — с PepsiCo",
      img: "news-0001.jpg",
      text: "Everland совместно с PepsiCo приняли участие в акции «Благотворительность вместо сувениров»",
      date: new Date('2022-08-20')
    }
    ,
    {
      tag: "Тема",
      title: "Трехдневный интенсив для КСО-менеджеров «Бизнес и инклюзия: как строить эффективные программы»",
      img: "",
      text: "Эксперты с инвалидностью, представители бизнеса и некоммерческих организаций поговорили о том, что такое инклюзия, рассмотрели подходы к трудоустройству людей с инвалидностью, обсудили проблемы, к которым нужно быть готовым, и поделились успешными кейсами",
      date: new Date('2022-08-20')
    }
    ,
    {
      tag: "Тема",
      title: "Тестируем супермаркеты на доступность",
      img: "news-0002.jpg",
      text: "Everland совместно с торговой сетью «Перекресток» провели аудит продуктовых магазинов на доступность для людей с разными видами инвалидности",
      date: new Date('2022-08-20')
    }
  ];
  const newsMonth = ["января" , "февраля" , "марта" , "апреля" , "мая" , "июня" , "июля" , "августа" , "сентября" , "октября" , "ноября" , "декабря"]

  const newsCardStorage = document.querySelector(".news__container");
  const cardTemplate = document.querySelector("#card-news-template").content;

  function createNewCard () {
    for (let i = 0; i<=2; i++) {
      const cardNewsNew = cardTemplate.querySelector(".card_news").cloneNode(true);
      const cardNewsNewTag = cardNewsNew.querySelector(".card__tag");
      const cardNewsNewTitle = cardNewsNew.querySelector(".card__title");
      const cardNewsNewImg = cardNewsNew.querySelector(".card__img");
      const cardNewsNewText = cardNewsNew.querySelector(".card__text");
      const cardNewsNewDate = cardNewsNew.querySelector(".card__date");

      const newsDate = Intl.DateTimeFormat('ru').format(newsStorage[0].date);

      const newsDateArray = newsDate.split('.');
      const testT = newsDateArray[1].slice(1);

      newsDateArray[1] = newsMonth[testT];
      let newsDateLetterMonth = newsDateArray.join(' ');

      cardNewsNewTag.textContent = newsStorage[i].tag;
      cardNewsNewTitle.textContent = newsStorage[i].title;
      cardNewsNewText.textContent = newsStorage[i].text;
      cardNewsNewDate.datetime = newsStorage[i].date;
      cardNewsNewDate.textContent = newsDateLetterMonth;

      if (i === 2) {
        cardNewsNewImg.classList.add('card_third');
        cardNewsNewDate.classList.add('card_third');
      }
      if (newsStorage[i].img === "" ) {
        cardNewsNew.classList.add('card_text-only');
        cardNewsNewImg.setAttribute('hidden', true)
        newsCardStorage.append(cardNewsNew);
      } else {
        cardNewsNewImg.src = "./images/" + newsStorage[i].img;
        cardNewsNewText.alt = newsStorage[i].title;
        newsCardStorage.append(cardNewsNew);
      }
    }
  }

  createNewCard ()

console.log();
