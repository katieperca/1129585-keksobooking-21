'use strict';

(() => {
  const KeyCode = {
    ENTER: 13,
    ESC: 27,
    MOUSE_MAIN_BUTTON: 0
  };
  const MainPinParam = {
    WIDTH: 65,
    HEIGHT: 82,
    PINTIP_HEIGHT: 17
  };
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const isEnterEvent = (evt, action) => {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  };

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };

  const isMouseMainButtonEvent = (evt, action) => {
    if (evt.button === KeyCode.MOUSE_MAIN_BUTTON) {
      action();
    }
  };

  const getRandomInteger = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const getRandomValue = (values) => {
    return values[Math.floor(Math.random() * values.length)];
  };

  const getRandomArray = (arr) => {
    const newArr = [];
    const incomeArr = arr.slice();
    const randomLength = getRandomInteger(1, arr.length);
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

  const getMainPinCoords = () => {
    let coordinateX;
    let coordinateY;
    if (map.classList.contains(`map--faded`)) {
      coordinateX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      coordinateY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    } else {
      coordinateX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      coordinateY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight + MainPinParam.PINTIP_HEIGHT);
    }
    const coordinates = coordinateX + `, ` + coordinateY;

    return coordinates;
  };

  window.util = {
    KeyCode,
    MainPinParam,
    isEnterEvent,
    isEscEvent,
    isMouseMainButtonEvent,
    getRandomInteger,
    getRandomValue,
    getRandomArray,
    getRandomTitle,
    getMainPinCoords
  };
})();
