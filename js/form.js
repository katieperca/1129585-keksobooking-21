'use strict';

(() => {
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
  const mainPinParams = {
    X: 570,
    Y: 375,
    WIDTH: 65,
    HEIGHT: 84
  };
  const adForm = document.querySelector(`.ad-form`);
  const adFormAddressField = adForm.querySelector(`#address`);
  const adFormRoomNumberSelect = adForm.querySelector(`#room_number`);
  const adFormCapacitySelect = adForm.querySelector(`#capacity`);
  const adFormTimeInInput = adForm.querySelector(`#timein`);
  const adFormTimeOutInput = adForm.querySelector(`#timeout`);
  const adFormHousingTypeSelect = adForm.querySelector(`#type`);
  const adFormPriceForNightInput = adForm.querySelector(`#price`);

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

  const setAddressField = () => {
    adFormAddressField.value =
      (mainPinParams.X + Math.floor(mainPinParams.WIDTH / 2)) + `, ` + (mainPinParams.Y + mainPinParams.HEIGHT);
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

  const inAndOutInputChange = function (evt) {
    adFormTimeInInput.value = evt.target.value;
    adFormTimeOutInput.value = evt.target.value;
  };

  adFormTimeInInput.addEventListener(`change`, inAndOutInputChange);

  adFormTimeOutInput.addEventListener(`change`, inAndOutInputChange);

  adFormHousingTypeSelect.addEventListener(`change`, function () {
    adFormPriceForNightInput.placeholder = housingMinPrice[adFormHousingTypeSelect.value];
    adFormPriceForNightInput.setAttribute(`min`, housingMinPrice[adFormHousingTypeSelect.value]);
  });

  adFormRoomNumberSelect.addEventListener(`change`, () => {
    checkRooms(adFormRoomNumberSelect.value);
  });

  window.form = {
    deactivateForm,
    activateForm,
    setAddressField,
    checkRooms,
    inAndOutInputChange
  };
})();