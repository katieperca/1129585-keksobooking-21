'use strict';

const advertsCounter = 8;
const map = document.querySelector(`.map`);
const mapMainPin = map.querySelector(`.map__pin--main`);
const pinContainer = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.children;
const adFormRoomNumberSelect = adForm.querySelector(`#room_number`);
const filtersFormFields = document.querySelector(`.map__filters`).children;
const advertsData = window.card.createAdverts(advertsCounter);
const cardContainer = document.querySelector(`.map`);
let pinsCreated = false;

const activatePage = () => {
  map.classList.remove(`map--faded`);
  window.form.activateForm(filtersFormFields);
  adForm.classList.remove(`ad-form--disabled`);
  window.form.activateForm(adFormFields);
};

window.form.deactivateForm(filtersFormFields);
window.form.deactivateForm(adFormFields);
window.form.setAddressField();

const switchPageToActiveMode = (evt) => {
  if (!pinsCreated) {
    window.util.isEnterEvent(evt, activatePage);
    window.util.isMouseMainButtonEvent(evt, activatePage);
    window.form.setAddressField();
    window.map.renderPins(pinContainer, advertsData);
    window.map.renderCard(cardContainer, advertsData[0]);
    window.form.checkRooms(adFormRoomNumberSelect.value);
    pinsCreated = true;
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
