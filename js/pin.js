'use strict';

(() => {
  const pinCoordinateLimits = {
    MIN_X: 320,
    MAX_X: 1100,
    MIN_Y: 130,
    MAX_Y: 630,
    Y_OFFSET: -70,
    X_OFFSET: -25
  };
  const map = document.querySelector(`.map`);
  const cardContainer = document.querySelector(`.map`);

  const openCard = function (data) {
    const isMapCard = map.querySelector(`.map__card`);
    if (isMapCard) {
      isMapCard.remove();
    }
    window.map.renderCard(cardContainer, data);
  };

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const createPin = (data) => {
    const pin = pinTemplate.cloneNode(true);
    pin.style.left = (data[`location`][`x`] + pinCoordinateLimits.X_OFFSET) + `px`;
    pin.style.top = (data[`location`][`y`] + pinCoordinateLimits.Y_OFFSET) + `px`;
    pin.children[0].src = data[`author`][`avatar`];
    pin.children[0].alt = data[`offer`][`title`];

    pin.addEventListener(`click`, function () {
      openCard(data);
    });

    pin.addEventListener(`keydown`, function (evt) {
      window.util.isEnterEvent(evt, openCard(data));
    });

    return pin;
  };

  window.pin = {
    pinCoordinateLimits,
    createPin
  };
})();
