'use strict';

const ImageParam = {
  IMG_WIDTH: 45,
  IMG_HEIGHT: 40,
  IMG_ALT: `Фотография жилья`
};
const housingTypes = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
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
      img.setAttribute(`width`, ImageParam.IMG_WIDTH);
      img.setAttribute(`height`, ImageParam.IMG_HEIGHT);
      img.setAttribute(`alt`, ImageParam.IMG_ALT);
      container.appendChild(img);
    });
  }
  return container;
};

const openCard = (data) => {
  const map = document.querySelector(`.map`);
  const isMapCard = map.querySelector(`.map__card`);
  if (isMapCard) {
    isMapCard.remove();
  }
  window.card.renderCard(map, data);
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
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
    card.remove();
  };

  const onCardEscPress = (evt) => {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      const activePin = document.querySelector(`.map__pin--active`);
      if (activePin) {
        activePin.classList.remove(`map__pin--active`);
      }
      closeCard();
      document.removeEventListener(`keydown`, onCardEscPress);
    }
  };

  const onPopupCloseClick = () => {
    closeCard();
    popupClose.removeEventListener(`click`, onPopupCloseClick);
  };

  popupClose.addEventListener(`click`, onPopupCloseClick);
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};

const renderCard = (container, data) => {
  const filtersContainer = document.querySelector(`.map__filters-container`);
  if (data) {
    container.insertBefore(createCard(data), filtersContainer);
  }
};

const removeCard = () => {
  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
};

window.card = {
  openCard,
  renderCard,
  removeCard
};

