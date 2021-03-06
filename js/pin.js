'use strict';

const PinCoordinateLimit = {
  MIN_X: 300,
  MAX_X: 1100,
  MIN_Y: 130,
  MAX_Y: 630,
  Y_OFFSET: -70,
  X_OFFSET: -25
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const createPin = (data) => {
  const pin = pinTemplate.cloneNode(true);
  pin.style.left = (data[`location`][`x`] + PinCoordinateLimit.X_OFFSET) + `px`;
  pin.style.top = (data[`location`][`y`] + PinCoordinateLimit.Y_OFFSET) + `px`;
  pin.children[0].src = data[`author`][`avatar`];
  pin.children[0].alt = data[`offer`][`title`];

  const setPinActive = () => {
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
    pin.classList.add(`map__pin--active`);
  };

  const onPinClick = () => {
    const activeCard = document.querySelector(`.map__card`);
    if (activeCard) {
      activeCard.remove();
    }
    window.card.open(data);
    setPinActive();
  };

  const onPinEnterPress = (evt) => {
    if (evt.keyCode === window.util.KeyCode.ENTER) {
      const activeCard = document.querySelector(`.map__card`);
      if (activeCard) {
        activeCard.remove();
      }
      window.card.open(data);
      setPinActive();
    }
  };

  pin.addEventListener(`click`, onPinClick);
  pin.addEventListener(`keydown`, onPinEnterPress);

  return pin;
};

const renderAll = (container, data) => {
  data.forEach((element) => {
    container.appendChild(createPin(element));
  });
};

const removeAll = () => {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((element) => {
    element.remove();
  });
};

window.pin = {
  PinCoordinateLimit,
  renderAll,
  removeAll
};
