'use strict';

const pinCoordinateLimits = {
  MIN_X: 320,
  MAX_X: 1100,
  MIN_Y: 130,
  MAX_Y: 630,
  Y_OFFSET: -70,
  X_OFFSET: -25
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

const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomValue = (values) => {
  return values[Math.floor(Math.random() * values.length)];
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

    adverts[i] = {
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
        features: getRandomValue(mockData.FEATURES_LIST),
        description: `строка с описанием`,
        photos: mockData.PHOTOS
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return adverts;
};

const advertsData = createAdverts(advertsCounter);

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const createPin = (data) => {
  const pin = template.cloneNode(true);
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

const pinContainer = document.querySelector(`.map__pins`);

renderPins(pinContainer, advertsData);
