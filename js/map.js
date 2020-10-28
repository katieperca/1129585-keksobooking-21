'use strict';

(() => {
  const PINTIP_HEIGHT = 22;
  const map = document.querySelector(`.map`);
  const mapMainPin = map.querySelector(`.map__pin--main`);

  const getPinCoords = () => {
    let coordinateX;
    let coordinateY;
    if (map.classList.contains(`map--faded`)) {
      coordinateX = Math.floor(mapMainPin.offsetLeft + mapMainPin.offsetWidth / 2);
      coordinateY = Math.floor(mapMainPin.offsetTop + mapMainPin.offsetHeight / 2);
    } else {
      coordinateX = Math.floor(mapMainPin.offsetLeft + mapMainPin.offsetWidth / 2);
      coordinateY = Math.floor(mapMainPin.offsetTop + mapMainPin.offsetHeight + PINTIP_HEIGHT);
    }
    const coordinates = coordinateX + `, ` + coordinateY;

    return coordinates;
  };

  mapMainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newPinCoords = {
        x: mapMainPin.offsetLeft - shift.x,
        y: mapMainPin.offsetTop - shift.y
      };

      const getNewCoords = (coords) => {
        return {
          x: coords.x + mapMainPin.offsetWidth / 2,
          y: coords.y + (mapMainPin.offsetHeight + PINTIP_HEIGHT)
        };
      };

      const newCoords = getNewCoords(newPinCoords);

      if (newCoords.x <= window.pin.pinCoordinateLimits.MAX_X && newCoords.x >= window.pin.pinCoordinateLimits.MIN_X) {
        mapMainPin.style.left = newPinCoords.x + `px`;
      }
      if (newCoords.y <= window.pin.pinCoordinateLimits.MAX_Y && newCoords.y >= window.pin.pinCoordinateLimits.MIN_Y) {
        mapMainPin.style.top = newPinCoords.y + `px`;
      }

      window.form.setAddressField(getPinCoords(newCoords));
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mapMainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mapMainPin.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.map = {
    getPinCoords
  };
})();
