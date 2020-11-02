'use strict';

const map = document.querySelector(`.map`);
const mapMainPin = map.querySelector(`.map__pin--main`);
const pinContainer = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.children;
const adFormRoomNumberSelect = adForm.querySelector(`#room_number`);
const filtersFormFields = document.querySelector(`.map__filters`).children;
const cardContainer = document.querySelector(`.map`);
let pinsCreated = false;

const deactivatePage = () => {
  window.form.deactivateForm(filtersFormFields);
  window.form.deactivateForm(adFormFields);
  window.form.setAddressField(window.util.getMainPinCoords());
};

deactivatePage();

const activatePage = () => {
  map.classList.remove(`map--faded`);
  window.form.activateForm(filtersFormFields);
  adForm.classList.remove(`ad-form--disabled`);
  window.form.activateForm(adFormFields);
};

const switchPageToActiveMode = (evt) => {
  if (!pinsCreated) {
    window.server.loadData((data) => {
      window.util.isEnterEvent(evt, activatePage);
      window.util.isMouseMainButtonEvent(evt, activatePage);
      window.form.setAddressField(window.util.getMainPinCoords());
      window.pin.renderPins(pinContainer, data);
      window.card.renderCard(cardContainer, data[0]);
      window.form.checkRooms(adFormRoomNumberSelect.value);
      pinsCreated = true;
    },
    (errorMessage) => {
      const node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `25px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    });
  }
};

const onMainPinMousedown = (evt) => {
  switchPageToActiveMode(evt);
  mapMainPin.removeEventListener(`mousedown`, onMainPinMousedown);
};

const onMainPinEnterPress = (evt) => {
  switchPageToActiveMode(evt);
  mapMainPin.removeEventListener(`keydown`, onMainPinEnterPress);
};

mapMainPin.addEventListener(`mousedown`, onMainPinMousedown);
mapMainPin.addEventListener(`keydown`, onMainPinEnterPress);
