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


const menuLinks = document.querySelectorAll('.links__item[data-goto]');
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
