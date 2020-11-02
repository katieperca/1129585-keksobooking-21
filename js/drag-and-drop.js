'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPinsList = map.querySelector(`.map__pins`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const POSITION_MIN_X = 0 - (window.util.MainPinParam.WIDTH / 2);
  const POSITION_MAX_X = mapPinsList.clientWidth - (window.util.MainPinParam.WIDTH / 2);
  const POSITION_MIN_Y = 130 - window.util.MainPinParam.HEIGHT;
  const POSITION_MAX_Y = 630 - window.util.MainPinParam.HEIGHT;

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const checkPosition = (coords) => {
      if (coords.x <= POSITION_MIN_X) {
        coords.x = POSITION_MIN_X;
      }
      if (coords.x >= POSITION_MAX_X) {
        coords.x = POSITION_MAX_X;
      }
      if (coords.y <= POSITION_MIN_Y) {
        coords.y = POSITION_MIN_Y;
      }
      if (coords.y >= POSITION_MAX_Y) {
        coords.y = POSITION_MAX_Y;
      }
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let newPinCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      checkPosition(newPinCoords);

      mapPinMain.style.top = newPinCoords.y + `px`;
      mapPinMain.style.left = newPinCoords.x + `px`;

      window.form.setAddressField(window.util.getMainPinCoords());
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
