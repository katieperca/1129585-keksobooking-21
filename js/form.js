'use strict';

const mainPage = document.querySelector(`main`);
const adForm = document.querySelector(`.ad-form`);
const adFormAddress = adForm.querySelector(`#address`);
const adFormRoomNumber = adForm.querySelector(`#room_number`);
const adFormCapacity = adForm.querySelector(`#capacity`);
const adFormTimeIn = adForm.querySelector(`#timein`);
const adFormTimeOut = adForm.querySelector(`#timeout`);
const adFormHousingType = adForm.querySelector(`#type`);
const adFormPriceForNight = adForm.querySelector(`#price`);
const adFormResetButton = adForm.querySelector(`.ad-form__reset`);
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
const housingMaxPrice = {
  bungalow: 999,
  flat: 4999,
  house: 9999,
  palace: Infinity
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
  adFormAddress.value = coords;
};

const checkRooms = (quantity) => {
  const capacityOptions = adFormCapacity.querySelectorAll(`option`);
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

const onInAndOutChange = (evt) => {
  adFormTimeIn.value = evt.target.value;
  adFormTimeOut.value = evt.target.value;
};

adFormTimeIn.addEventListener(`change`, onInAndOutChange);
adFormTimeOut.addEventListener(`change`, onInAndOutChange);

const onHousingTypeChange = () => {
  adFormPriceForNight.placeholder = housingMinPrice[adFormHousingType.value];
  adFormPriceForNight.setAttribute(`min`, housingMinPrice[adFormHousingType.value]);
  adFormPriceForNight.setAttribute(`max`, housingMaxPrice[adFormHousingType.value]);
};

adFormHousingType.addEventListener(`change`, onHousingTypeChange);

adFormRoomNumber.addEventListener(`change`, () => {
  checkRooms(adFormRoomNumber.value);
});

const showSuccessMessage = () => {
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successMessage = successTemplate.cloneNode(true);
  mainPage.appendChild(successMessage);
  const removeSuccessMessage = () => {
    successMessage.remove();
    successMessage.removeEventListener(`click`, removeSuccessMessage);
  };
  successMessage.addEventListener(`click`, removeSuccessMessage);

  const onSuccessMessageEscPress = (evt) => {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      successMessage.remove();
      successMessage.removeEventListener(`keydown`, onSuccessMessageEscPress);
    }
  };
  successMessage.addEventListener(`keydown`, onSuccessMessageEscPress);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector(`.error__button`);
  mainPage.appendChild(errorMessage);

  const onErrorMessageClick = () => {
    errorMessage.remove();
    errorMessage.removeEventListener(`click`, onErrorMessageClick);
  };
  errorMessage.addEventListener(`click`, onErrorMessageClick);

  const onErrorButtonClick = () => {
    errorMessage.remove();
    errorButton.removeEventListener(`click`, onErrorButtonClick);
  };
  errorButton.addEventListener(`click`, onErrorButtonClick);

  const onErrorMessageEscPress = (evt) => {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      errorMessage.remove();
      errorMessage.removeEventListener(`keydown`, onErrorMessageEscPress);
    }
  };
  errorMessage.addEventListener(`keydown`, onErrorMessageEscPress);
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
};

const onAdFormResetButtonClick = () => {
  resetPage();
};

adForm.addEventListener(`submit`, onAdFormSubmit);
adFormResetButton.addEventListener(`click`, onAdFormResetButtonClick);

window.form = {
  deactivateForm,
  activateForm,
  setAddressField,
  checkRooms,
  onHousingTypeChange
};
