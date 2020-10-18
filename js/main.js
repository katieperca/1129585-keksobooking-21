'use strict';

const keyCodes = {
  ENTER: 13,
  ESC: 27,
  MOUSE_MAIN_BUTTON: 0
};
const pinCoordinateLimits = {
  MIN_X: 320,
  MAX_X: 1100,
  MIN_Y: 130,
  MAX_Y: 630,
  Y_OFFSET: -70,
  X_OFFSET: -25
};
const mainPinParams = {
  X: 570,
  Y: 375,
  WIDTH: 65,
  HEIGHT: 84
};
const mockData = {
  PRICES: [1000, 2000, 5000, 10000, 20000, 50000],
  TYPES: [`palace`, `flat`, `house`, `bungalow`],
  CHECKINS: [`12:00`, `13:00`, `14:00`],
  CHECKOUTS: [`12:00`, `13:00`, `14:00`],
  FEATURES_LIST: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
};
const advertsCounter = 8;
const housingTypes = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const map = document.querySelector(`.map`);
const mapMainPin = map.querySelector(`.map__pin--main`);
const filtersFormFields = document.querySelector(`.map__filters`).children;
const pinContainer = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.children;
const adFormAddressField = adForm.querySelector(`#address`);
const adFormRoomNumberSelect = adForm.querySelector(`#room_number`);
const adFormCapacitySelect = adForm.querySelector(`#capacity`);
const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const deactivateForm = (data) => {
  Array.from(data).forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });
};

deactivateForm(filtersFormFields);
deactivateForm(adFormFields);

const activateForm = (data) => {
  Array.from(data).forEach((element) => {
    element.removeAttribute(`disabled`);
  });
};

const activatePage = () => {
  map.classList.remove(`map--faded`);
  activateForm(filtersFormFields);
  adForm.classList.remove(`ad-form--disabled`);
  activateForm(adFormFields);
};

const setAddressField = () => {
  adFormAddressField.value =
    (mainPinParams.X + Math.floor(mainPinParams.WIDTH / 2)) + `, ` + (mainPinParams.Y + mainPinParams.HEIGHT);
};

setAddressField();

const checkRooms = (quantity) => {
  const capacityOptions = adFormCapacitySelect.querySelectorAll(`option`);
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });
  roomValues[quantity].forEach((setAmount) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === setAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

adFormRoomNumberSelect.addEventListener(`change`, () => {
  checkRooms(adFormRoomNumberSelect.value);
});

const switchPageToActiveMode = () => {
  activatePage();
  setAddressField();
  renderPins(pinContainer, advertsData);
  renderCard(cardContainer, advertsData[0]);
  checkRooms(adFormRoomNumberSelect.value);
};

mapMainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === keyCodes.MOUSE_MAIN_BUTTON) {
    switchPageToActiveMode();
  }
});

mapMainPin.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === keyCodes.ENTER) {
    switchPageToActiveMode();
  }
});

const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomValue = (values) => {
  return values[Math.floor(Math.random() * values.length)];
};

const getRandomArray = (arr) => {
  const newArr = [];
  const incomeArr = arr.slice();
  const randomLength = randomInteger(1, arr.length);
  for (let i = 0; i < randomLength; i++) {
    const currentIndex = Math.floor(Math.random() * incomeArr.length);
    newArr.push(incomeArr[currentIndex]);
    incomeArr.splice(currentIndex, 1);
  }

  return newArr;
};

const getRandomTitle = () => {
  const randomWords = {
    randomAdjectives: [`Уютный`, `Заброшенный`, `Проклятый старый`, `Старинный`, `Комфортный`],
    randomNouns: [`дом`, `барак`, `сарай`, `дворец`, `хлев`],
    randomCharacteristics: [`для самоизоляции`, `в заросшем парке`, `с жутко злым дедом`, `с площадкой для барбекю`, `для уточки Медведева`]
  };
  const randomTitle = [getRandomValue(randomWords.randomAdjectives), getRandomValue(randomWords.randomNouns), getRandomValue(randomWords.randomCharacteristics)].join(` `);

  return randomTitle;
};

const createAdverts = (count) => {
  const adverts = [];

  for (let i = 0; i < count; i++) {
    const locationX = randomInteger(pinCoordinateLimits.MIN_X, pinCoordinateLimits.MAX_X);
    const locationY = randomInteger(pinCoordinateLimits.MIN_Y, pinCoordinateLimits.MAX_Y);

    adverts.push({
      author: {
        avatar: `img/avatars/user0` + [i + 1] + `.png`
      },
      offer: {
        title: getRandomTitle(),
        address: locationX + `, ` + locationY,
        price: getRandomValue(mockData.PRICES),
        type: getRandomValue(mockData.TYPES),
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 20),
        checkin: getRandomValue(mockData.CHECKINS),
        checkout: getRandomValue(mockData.CHECKOUTS),
        features: getRandomArray(mockData.FEATURES_LIST),
        description: `строка с описанием`,
        photos: getRandomArray(mockData.PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return adverts;
};

const advertsData = createAdverts(advertsCounter);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const createPin = (data) => {
  const pin = pinTemplate.cloneNode(true);
  pin.style.left = (data[`location`][`x`] + pinCoordinateLimits.X_OFFSET) + `px`;
  pin.style.top = (data[`location`][`y`] + pinCoordinateLimits.Y_OFFSET) + `px`;
  pin.children[0].src = data[`author`][`avatar`];
  pin.children[0].alt = data[`offer`][`title`];

  return pin;
};

const renderPins = (container, data) => {
  data.forEach((element) => {
    container.appendChild(createPin(element));
  });
};

const fillElement = (value, container, attribute) => {
  if (!value) {
    container.setAttribute(`style`, `display: none`);
  } else {
    container[attribute] = value;
  }

  return container;
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

  return card;
};

const cardContainer = document.querySelector(`.map`);
const filtersContainer = document.querySelector(`.map__filters-container`);
const renderCard = (container, data) => {
  container.insertBefore(createCard(data), filtersContainer);
};

