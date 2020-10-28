'use strict';

(() => {
  const keyCodes = {
    ENTER: 13,
    ESC: 27,
    MOUSE_MAIN_BUTTON: 0
  };

  const isEnterEvent = (evt, action) => {
    if (evt.keyCode === keyCodes.ENTER) {
      action();
    }
  };

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === keyCodes.ESC) {
      action();
    }
  };

  const isMouseMainButtonEvent = (evt, action) => {
    if (evt.button === keyCodes.MOUSE_MAIN_BUTTON) {
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

  window.util = {
    keyCodes,
    isEnterEvent,
    isEscEvent,
    isMouseMainButtonEvent,
    getRandomInteger,
    getRandomValue,
    getRandomArray,
    getRandomTitle
  };
})();
