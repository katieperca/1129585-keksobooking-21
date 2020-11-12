'use strict';

const TYPE_ANY = `any`;
const filtersForm = document.querySelector(`.map__filters`);
const filterHousingType = filtersForm.querySelector(`#housing-type`);
const filterHousingPrice = filtersForm.querySelector(`#housing-price`);
const filterHousingRooms = filtersForm.querySelector(`#housing-rooms`);
const filterHousingGuests = filtersForm.querySelector(`#housing-guests`);
const filterHousingReatures = filtersForm.querySelector(`#housing-features`);
const priceRange = {
  low: 1000,
  high: 50000
};
const priceType = {
  low: `low`,
  middle: `middle`,
  high: `high`
};

const resetFilters = () => {
  filtersForm.reset();
};

const filterByHousingType = (data) => {
  return data.offer.type === filterHousingType.value ||
  filterHousingType.value === TYPE_ANY;
};

const filterByHousingPrice = (data) => {
  switch (filterHousingPrice.value) {
    case priceType.low:
      return data.offer.price < priceRange.low;
    case priceType.middle:
      return data.offer.price >= priceRange.low && data.offer.price <= priceRange.high;
    case priceType.high:
      return data.offer.price >= priceRange.high;
  }
  return true;
};

const filterByHousingRooms = (data) => {
  return data.offer.rooms === +filterHousingRooms.value ||
  filterHousingRooms.value === TYPE_ANY;
};

const filterByHousingGuests = (data) => {
  return data.offer.guests === +filterHousingGuests.value ||
  filterHousingGuests.value === TYPE_ANY;
};

const filterByHousingFeatures = (data) => {
  const selectedFeatures = filterHousingReatures.querySelectorAll(`input:checked`);
  return Array.from(selectedFeatures).every((item) => {
    return data.offer.features.includes(item.value);
  });
};

const filterData = (data) => {
  return filterByHousingType(data)
    && filterByHousingPrice(data)
    && filterByHousingRooms(data)
    && filterByHousingGuests(data)
    && filterByHousingFeatures(data);
};

const showFiltredData = () => {
  const filtredData = window.data.filter(filterData);
  window.util.clearMap();
  window.debounce(window.util.renderData(filtredData));
};

filtersForm.addEventListener(`change`, showFiltredData);

window.filter = {
  resetFilters
};
