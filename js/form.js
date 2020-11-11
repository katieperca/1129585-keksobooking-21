'use strict';

const adForm = document.querySelector(`.ad-form`);
const adFormAddressField = adForm.querySelector(`#address`);
const adFormRoomNumberSelect = adForm.querySelector(`#room_number`);
const adFormCapacitySelect = adForm.querySelector(`#capacity`);
const adFormTimeInInput = adForm.querySelector(`#timein`);
const adFormTimeOutInput = adForm.querySelector(`#timeout`);
const adFormHousingTypeSelect = adForm.querySelector(`#type`);
const adFormPriceForNightInput = adForm.querySelector(`#price`);
const mainPage = document.querySelector(`main`);
// const map = document.querySelector(`.map`);
// const adFormFields = adForm.children;
// const filtersFormFields = document.querySelector(`.map__filters`).children;
const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
const housingMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const deactivateForm = (data) => {
  Array.from(data).forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });
};

const activateForm = (data) => {
  Array.from(data).forEach((element) => {
    element.removeAttribute(`disabled`);
  });
};

const setAddressField = (coords) => {
  adFormAddressField.value = coords;
};

const checkRooms = (quantity) => {
  const capacityOptions = adFormCapacitySelect.querySelectorAll(`option`);
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });
  roomValues[quantity].forEach((setAmount) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === setAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const inAndOutInputChange = (evt) => {
  adFormTimeInInput.value = evt.target.value;
  adFormTimeOutInput.value = evt.target.value;
};

adFormTimeInInput.addEventListener(`change`, inAndOutInputChange);

adFormTimeOutInput.addEventListener(`change`, inAndOutInputChange);

adFormHousingTypeSelect.addEventListener(`change`, () => {
  adFormPriceForNightInput.placeholder = housingMinPrice[adFormHousingTypeSelect.value];
  adFormPriceForNightInput.setAttribute(`min`, housingMinPrice[adFormHousingTypeSelect.value]);
});

adFormRoomNumberSelect.addEventListener(`change`, () => {
  checkRooms(adFormRoomNumberSelect.value);
});

const showSuccessMessage = () => {
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successMessage = successTemplate.cloneNode(true);
  mainPage.appendChild(successMessage);
  const removeSuccessMessage = () => {
    successMessage.remove();
  };
  document.addEventListener(`click`, removeSuccessMessage);
  document.addEventListener(`keydown`, (evt) => {
    window.util.isEscEvent(evt, removeSuccessMessage);
  });
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorMessage = errorTemplate.cloneNode(true);
  const removeErrorMessage = () => {
    errorMessage.remove();
  };
  mainPage.appendChild(errorMessage);
  errorMessage.querySelector(`.error__button`).addEventListener(`click`, removeErrorMessage);
  errorMessage.addEventListener(`click`, removeErrorMessage);
  document.addEventListener(`keydown`, (evt) => {
    window.util.isEscEvent(evt, removeErrorMessage);
  });
};

const resetPage = () => {
  window.main.deactivatePage();
  window.util.clearMap();
  window.filter.resetFilters();
  window.uploadPhoto.resetImages();
  window.util.setMainPinCenter();
  adForm.reset();
  setAddressField(window.util.getMainPinCoords());
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  window.server.uploadData(new FormData(adForm), showSuccessMessage, showErrorMessage);
  resetPage();
  // setAddressField(window.util.getMainPinCoords());
};

const onAdFormReset = () => {
  resetPage();
};

adForm.addEventListener(`submit`, onAdFormSubmit);
adForm.addEventListener(`reset`, onAdFormReset);

window.form = {
  deactivateForm,
  activateForm,
  setAddressField,
  checkRooms,
  inAndOutInputChange
};
