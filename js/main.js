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