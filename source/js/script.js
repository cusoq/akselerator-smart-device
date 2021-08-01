'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var pageElement = document.querySelector('body');
var popupOverlayElement = document.querySelector('.modal-overlay');
var modalBlockElement = document.querySelector('.modal');
var popupNameInputElement = document.getElementById('modal-name-input');
var popupTelInputElement = document.getElementById('modal-tel-input');
var popupTextareaElement = document.getElementById('modal-textarea');
var feedbackNameInputElement = document.getElementById('feedback-name-input');
var feedbackTelInputElement = document.getElementById('feedback-tel-input');
var feedbackTextareaElement = document.getElementById('feedback-textarea');
var crossButtonElement = modalBlockElement.querySelector('.modal__close-button');
var modalForm = modalBlockElement.querySelector('.modal__form');
var feedbackForm = document.querySelector('.feedback__form');
var recallButtonElement = document.querySelector('.header__recall-link');
var anchorsElements = document.querySelectorAll('a[href*="#"]');
var requiredInputElements = document.querySelectorAll('input:required');

// установка фокуса по умолчанию
var getFocus = function () {
  if (popupOverlayElement) {
    popupNameInputElement.focus();
  }
};

getFocus();

// открытие модального окна
var showPopup = function () {
  popupOverlayElement.classList.remove('visually-hidden');
  modalBlockElement.classList.remove('visually-hidden');
  modalForm.addEventListener('submit', onSubmit);
  pageElement.classList.add('non-scroll');
};

// валидация заполнения полей и запись в localStorage

var setLocalStorage = function () {
  localStorage.setItem('modal-name', popupNameInputElement.value);
  localStorage.setItem('modal-tel', popupTelInputElement.value);
  localStorage.setItem('message', popupTextareaElement.value);
  localStorage.setItem('name', feedbackNameInputElement.value);
  localStorage.setItem('tel', feedbackTelInputElement.value);
  localStorage.setItem('question', feedbackTextareaElement.value);

  modalForm.submit();
  feedbackForm.submit();
  closePopup();
};


// закрытие модального окна
var closePopup = function () {
  if (popupOverlayElement || modalBlockElement) {
    popupOverlayElement.classList.add('visually-hidden');
    modalBlockElement.classList.add('visually-hidden');
    pageElement.classList.remove('non-scroll');
  }
};

// Плавная прокрутка для якорных ссылок
var smoothOperate = function () {
  anchorsElements.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var blockID = anchor.getAttribute('href').substr(1);
      if (blockID) {
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

smoothOperate();

// Проверка валидности форм
var checkValidity = function (evt) {
  if (!evt.target.validity.valid) {
    evt.target.parentNode.classList.add('customer-data__input-container--invalid');
  } else {
    evt.target.parentNode.classList.remove('customer-data__input-container--invalid');
  }
};

var onChangeInputValue = function (evt) {
  checkValidity(evt);
};

var onClickOpener = function (evt) {
  evt.preventDefault();
  showPopup();
  getFocus();
  popupOverlayElement.addEventListener('click', onClickCloser);
  crossButtonElement.addEventListener('click', onClickCloser);
};

var onClickCloser = function (evt) {
  evt.preventDefault();
  if (evt.target !== modalBlockElement) {
    closePopup();
  }
};

var onEnterOpener = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    showPopup();
    getFocus();
  }
};

var onEscCloser = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscCloser);
    closePopup();
  }
};

var onSubmit = function (evt) {
  evt.preventDefault();
  setLocalStorage();
};

recallButtonElement.addEventListener('click', onClickOpener);
recallButtonElement.addEventListener('keydown', onEnterOpener);

document.addEventListener('keydown', onEscCloser);
requiredInputElements.forEach(function (element) {
  element.addEventListener('change', onChangeInputValue);
});

feedbackForm.addEventListener('submit', onSubmit);
