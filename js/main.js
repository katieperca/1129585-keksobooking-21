'use strict';

const map = document.querySelector(`.map`);
const mapMainPin = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.children;
const adFormRoomNumber = adForm.querySelector(`#room_number`);
const filtersFormFields = document.querySelector(`.map__filters`).children;
let pinsCreated = false;

const onMainPinMousedown = (evt) => {
  switchPageToActiveMode(evt);
};

const onMainPinEnterPress = (evt) => {
  if (evt.keyCode === window.util.KeyCode.ENTER) {
    switchPageToActiveMode(evt);
  }
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
  window.form.onHousingTypeChange();
  mapMainPin.removeEventListener(`mousedown`, onMainPinMousedown);
  mapMainPin.removeEventListener(`keydown`, onMainPinEnterPress);
};

const onLoadSuccess = (evt, data) => {
  window.data = data;
  window.util.isEnterEvent(evt, activatePage);
  window.util.isMouseMainButtonEvent(evt, activatePage);
  window.form.setAddressField(window.util.getMainPinCoords());
  if (!pinsCreated) {
    window.util.renderData(window.data);
  }
  window.form.checkRooms(adFormRoomNumber.value);
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
