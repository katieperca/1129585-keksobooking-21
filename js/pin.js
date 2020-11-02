'use strict';

(() => {
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

    const onPinClick = () => {
      window.card.openCard(data);
    };

    const onPinEnterPress = () => {
      window.card.openCard(data);
    };

    pin.addEventListener(`click`, onPinClick);

    pin.addEventListener(`keydown`, (evt) => {
      window.util.isEnterEvent(evt, onPinEnterPress);
    });

    return pin;
  };

  const renderPins = (container, data) => {
    data.forEach((element) => {
      container.appendChild(createPin(element));
    });
  };

  window.pin = {
    PinCoordinateLimit,
    createPin,
    renderPins
  };
})();
