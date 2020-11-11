'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
const METHOD_LOAD = `GET`;
const METHOD_UPLOAD = `POST`;
const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  OK: 200
};

const loadData = (onSuccess, onError, evt) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(evt, xhr.response);
    } else {
      onError(`Cтатус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(METHOD_LOAD, URL_LOAD);
  xhr.send();
};

const uploadData = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError();
    }
  });

  xhr.open(METHOD_UPLOAD, URL_UPLOAD);
  xhr.send(data);
};

window.server = {
  loadData,
  uploadData
};
