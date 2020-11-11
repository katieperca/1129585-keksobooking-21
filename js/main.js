'use strict';

const map = document.querySelector(`.map`);
const mapMainPin = map.querySelector(`.map__pin--main`);
// const pinContainer = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.children;
const adFormRoomNumberSelect = adForm.querySelector(`#room_number`);
const filtersFormFields = document.querySelector(`.map__filters`).children;
// const cardContainer = document.querySelector(`.map`);
let pinsCreated = false;

const onMainPinMousedown = (evt) => {
  switchPageToActiveMode(evt);
  // mapMainPin.removeEventListener(`mousedown`, onMainPinMousedown);
};

const onMainPinEnterPress = (evt) => {
  switchPageToActiveMode(evt);
  // mapMainPin.removeEventListener(`keydown`, onMainPinEnterPress);
};

const deactivatePage = () => {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  window.form.deactivateForm(filtersFormFields);
  window.form.deactivateForm(adFormFields);
  window.form.setAddressField(window.util.getMainPinCoords());
  mapMainPin.addEventListener(`mousedown`, onMainPinMousedown);
  mapMainPin.addEventListener(`keydown`, onMainPinEnterPress);
};

deactivatePage();

const activatePage = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  window.form.activateForm(filtersFormFields);
  window.form.activateForm(adFormFields);
  mapMainPin.removeEventListener(`mousedown`, onMainPinMousedown);
  mapMainPin.removeEventListener(`keydown`, onMainPinEnterPress);
};

const onLoadSuccess = (evt, data) => {
  // if (!pinsCreated) {
  window.data = data;
  window.util.isEnterEvent(evt, activatePage);
  window.util.isMouseMainButtonEvent(evt, activatePage);
  window.form.setAddressField(window.util.getMainPinCoords());
  if (!pinsCreated) {
    window.util.renderData(window.data);
  }
  // window.util.renderData(window.data);
  window.form.checkRooms(adFormRoomNumberSelect.value);
  // pinsCreated = true;
};

const onErrorLoad = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `25px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const switchPageToActiveMode = (evt) => {
  window.server.loadData(onLoadSuccess, onErrorLoad, evt);
};

window.main = {
  deactivatePage
};
