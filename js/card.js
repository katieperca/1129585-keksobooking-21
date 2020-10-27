'use strict';

(() => {
  const mockData = {
    PRICES: [1000, 2000, 5000, 10000, 20000, 50000],
    TYPES: [`palace`, `flat`, `house`, `bungalow`],
    CHECKINS: [`12:00`, `13:00`, `14:00`],
    CHECKOUTS: [`12:00`, `13:00`, `14:00`],
    FEATURES_LIST: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
  };
  const housingTypes = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  const createAdverts = (count) => {
    const adverts = [];

    for (let i = 0; i < count; i++) {
      const locationX = window.util.getRandomInteger(window.pin.pinCoordinateLimits.MIN_X, window.pin.pinCoordinateLimits.MAX_X);
      const locationY = window.util.getRandomInteger(window.pin.pinCoordinateLimits.MIN_Y, window.pin.pinCoordinateLimits.MAX_Y);

      adverts.push({
        author: {
          avatar: `img/avatars/user0` + [i + 1] + `.png`
        },
        offer: {
          title: window.util.getRandomTitle(),
          address: locationX + `, ` + locationY,
          price: window.util.getRandomValue(mockData.PRICES),
          type: window.util.getRandomValue(mockData.TYPES),
          rooms: window.util.getRandomInteger(1, 5),
          guests: window.util.getRandomInteger(1, 20),
          checkin: window.util.getRandomValue(mockData.CHECKINS),
          checkout: window.util.getRandomValue(mockData.CHECKOUTS),
          features: window.util.getRandomArray(mockData.FEATURES_LIST),
          description: `строка с описанием`,
          photos: window.util.getRandomArray(mockData.PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }
    return adverts;
  };

  const renderList = (data, container) => {
    if (!data) {
      container.setAttribute(`style`, `display: none`);
    } else {
      container.innerHTML = ``;
      data.forEach((element) => {
        const li = document.createElement(`li`);
        li.classList.add(`popup__feature`, `popup__feature--` + element);
        container.appendChild(li);
      });
    }

    return container;
  };

  const fillElement = (value, container, attribute) => {
    if (!value) {
      container.setAttribute(`style`, `display: none`);
    } else {
      container[attribute] = value;
    }

    return container;
  };

  const renderPhotos = (data, container) => {
    if (!data) {
      container.setAttribute(`style`, `display: none`);
    } else {
      container.innerHTML = ``;
      data.forEach((element) => {
        const img = document.createElement(`img`);
        img.classList.add(`popup__photo`);
        img.setAttribute(`src`, element);
        img.setAttribute(`width`, `45`);
        img.setAttribute(`height`, `40`);
        img.setAttribute(`alt`, `Фотография жилья`);
        container.appendChild(img);
      });
    }
    return container;
  };

  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const createCard = (data) => {
    const card = cardTemplate.cloneNode(true);
    fillElement(data[`author`][`avatar`], card.querySelector(`.popup__avatar`), `src`);

    fillElement(data[`offer`][`title`], card.querySelector(`.popup__title`), `textContent`);

    fillElement(data[`offer`][`address`], card.querySelector(`.popup__text--address`), `textContent`);

    const priceForNight =
      (data[`offer`][`price`]) ?
        data[`offer`][`price`] + `₽/ночь` :
        ``;
    fillElement(priceForNight, card.querySelector(`.popup__text--price`), `textContent`);

    fillElement(housingTypes[data[`offer`][`type`]], card.querySelector(`.popup__type`), `textContent`);

    const roomsForGuests =
      (data[`offer`][`rooms`] && data[`offer`][`guests`]) ?
        data[`offer`][`rooms`] + ` комнаты для ` + data[`offer`][`guests`] + ` гостей` :
        ``;
    fillElement(roomsForGuests, card.querySelector(`.popup__text--capacity`), `textContent`);

    const checkinAndCheckout =
      (data[`offer`][`checkin`] && data[`offer`][`checkout`]) ?
        `Заезд после ` + data[`offer`][`checkin`] + `, выезд до ` + data[`offer`][`checkout`] :
        ``;
    fillElement(checkinAndCheckout, card.querySelector(`.popup__text--time`), `textContent`);

    fillElement(data[`offer`][`description`], card.querySelector(`.popup__description`), `textContent`);

    renderList(data[`offer`][`features`], card.querySelector(`.popup__features`));

    renderPhotos(data[`offer`][`photos`], card.querySelector(`.popup__photos`));

    const popupClose = card.querySelector(`.popup__close`);

    const closeCard = function () {
      card.remove();
    };

    popupClose.addEventListener(`click`, function () {
      closeCard();
    });

    popupClose.addEventListener(`keydown`, function (evt) {
      window.util.isEnterEvent(evt, closeCard());
    });
    return card;
  };

  window.card = {
    createAdverts,
    fillElement,
    renderList,
    renderPhotos,
    createCard
  };
})();
