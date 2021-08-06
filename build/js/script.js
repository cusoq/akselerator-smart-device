'use strict';

var popupNameInputElement = document.getElementById('modal-name-input');
var popupTelInputElement = document.getElementById('modal-tel-input');
var popupTextareaElement = document.getElementById('modal-textarea');
var feedbackNameInputElement = document.getElementById('feedback-name-input');
var feedbackTelInputElement = document.getElementById('feedback-tel-input');
var feedbackTextareaElement = document.getElementById('feedback-textarea');
var modalForm = document.querySelector('.modal__form');
var feedbackForm = document.querySelector('.feedback__form');
var anchorsElements = document.querySelectorAll('a[href*="#"]');
var requiredInputElements = document.querySelectorAll('input:required');

// валидация заполнения полей и запись в localStorage

var setLocalStorage = function () {
  if (popupNameInputElement || popupTelInputElement || popupTextareaElement || feedbackNameInputElement || feedbackTelInputElement || feedbackTextareaElement) {
    localStorage.setItem('modal-name', popupNameInputElement.value);
    localStorage.setItem('modal-tel', popupTelInputElement.value);
    localStorage.setItem('message', popupTextareaElement.value);
    localStorage.setItem('name', feedbackNameInputElement.value);
    localStorage.setItem('tel', feedbackTelInputElement.value);
    localStorage.setItem('question', feedbackTextareaElement.value);
  }
  modalForm.submit();
  feedbackForm.submit();
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

var onSubmit = function (evt) {
  evt.preventDefault();
  setLocalStorage();
};

requiredInputElements.forEach(function (element) {
  element.addEventListener('change', onChangeInputValue);
});

feedbackForm.addEventListener('submit', onSubmit);
