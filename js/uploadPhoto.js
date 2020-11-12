'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const PhotoParam = {
  WIDTH: 70,
  HEIGHT: 70
};
const adFormUserpic = document.querySelector(`.ad-form-header__input`);
const adFormUserpicPreview = document.querySelector(`.ad-form-header__preview img`);
const adFormPhoto = document.querySelector(`.ad-form__input`);
const adFormPhotoPreview = document.querySelector(`.ad-form__photo`);

const resetImages = () => {
  adFormUserpicPreview.src = `img/muffin-grey.svg`;
  adFormPhotoPreview.innerHTML = ``;
};

const onUserpicUpload = () => {
  const file = adFormUserpic.files[0];

  const matches = FILE_TYPES.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      adFormUserpicPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const onPhotoUpload = () => {
  const file = adFormPhoto.files[0];

  const matches = FILE_TYPES.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      const photoPreview = document.createElement(`img`);

      photoPreview.src = reader.result;
      adFormPhotoPreview.innerHTML = ``;
      photoPreview.alt = `Фотография жилья`;
      photoPreview.style.maxWidth = PhotoParam.WIDTH + `px`;
      photoPreview.style.maxHeight = PhotoParam.HEIGHT + `px`;
      adFormPhotoPreview.append(photoPreview);
    });

    reader.readAsDataURL(file);
  }
};

adFormUserpic.addEventListener(`change`, onUserpicUpload);
adFormPhoto.addEventListener(`change`, onPhotoUpload);

window.uploadPhoto = {
  resetImages
};
