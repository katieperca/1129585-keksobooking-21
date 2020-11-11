'use strict';

const mockData = {
  PRICES: [1000, 2000, 5000, 10000, 20000, 50000],
  TYPES: [`palace`, `flat`, `house`, `bungalow`],
  CHECKINS: [`12:00`, `13:00`, `14:00`],
  CHECKOUTS: [`12:00`, `13:00`, `14:00`],
  FEATURES_LIST: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
};

const createAdverts = (count) => {
  const adverts = [];

  for (let i = 0; i < count; i++) {
    const locationX = window.util.getRandomInteger(window.pin.PinCoordinateLimit.MIN_X, window.pin.PinCoordinateLimit.MAX_X);
    const locationY = window.util.getRandomInteger(window.pin.PinCoordinateLimit.MIN_Y, window.pin.PinCoordinateLimit.MAX_Y);

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

window.data = {
  createAdverts
};
