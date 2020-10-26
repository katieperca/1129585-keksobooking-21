'use strict';

(() => {
  const renderPins = (container, data) => {
    data.forEach((element) => {
      container.appendChild(window.pin.createPin(element));
    });
  };

  const renderCard = (container, data) => {
    const filtersContainer = document.querySelector(`.map__filters-container`);
    container.insertBefore(window.card.createCard(data), filtersContainer);
  };

  window.map = {
    renderPins,
    renderCard
  };
})();
