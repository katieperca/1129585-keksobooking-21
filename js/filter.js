'use strict';

(() => {
  const TYPE_ANY = `any`;
  const priceRange = {
    LOW: 1000,
    HIGH: 50000
  };
  const priceType = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`
  };
  const filtersForm = document.querySelector(`.map__filters`);
  const filterHousingType = filtersForm.querySelector(`#housing-type`);
  const filterHousingPrice = filtersForm.querySelector(`#housing-price`);
  const filterHousingRooms = filtersForm.querySelector(`#housing-rooms`);
  const filterHousingGuests = filtersForm.querySelector(`#housing-guests`);
  const filterHousingReatures = filtersForm.querySelector(`#housing-features`);

  const resetFilters = () => {
    filtersForm.reset();
  };

  const filterByHousingType = (data) => {
    return data.offer.type === filterHousingType.value ||
    filterHousingType.value === TYPE_ANY;
  };

  const filterByHousingPrice = (data) => {
    switch (filterHousingPrice.value) {
      case priceType.LOW:
        return data.offer.price < priceRange.LOW;
      case priceType.MIDDLE:
        return data.offer.price >= priceRange.LOW && data.offer.price <= priceRange.HIGH;
      case priceType.HIGH:
        return data.offer.price >= priceRange.HIGH;
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
    // window.util.renderData(filtredData);
    window.debounce(window.util.renderData(filtredData));
  };

  filtersForm.addEventListener(`change`, showFiltredData);

  window.filter = {
    resetFilters
  };
})();
