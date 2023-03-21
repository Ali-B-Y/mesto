export class FormValidator {
  constructor(validationConfiguration, form) {
    this._form = form;
    this._inputSelector = validationConfiguration.inputSelector;
    this._submitButtonSelector = validationConfiguration.submitButtonSelector;
    this._inactiveButtonClass = validationConfiguration.inactiveButtonClass;
    this._inputErrorClass = validationConfiguration.inputErrorClass;
    this._errorClass = validationConfiguration.errorClass;
  }




//отображение ошибки инпута
  const showInputError = (form, input, this._inputErrorClass, this._errorClass, errorMessage) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  };

//скрытие ошибки инпута
  const hideInputError = (form, input, this._inputErrorClass, this._errorClass) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };

  const checkInputValidity = (this._form, input) => {
    if (!input.validity.valid) {
      showInputError(this._form, input, this._inputErrorClass, this._errorClass, input.validationMessage);
    } else {
      hideInputError(form, input, config.this._inputErrorClass, this._errorClass);
      }
    };

  const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  const toggleButtonState = (inputList, button, this._inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  };

  _setEventListeners = (this._form) => {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        checkInputValidity(this._form, input);
        toggleButtonState(inputList, button, this._inactiveButtonClass);
      });
    });
  };

  enableValidation = () => {
      _setEventListeners(this._form);
  };



  const clearErrorValidation = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.this._inputSelector));
    const button = form.querySelector(config.this._submitButtonSelector);
    inputList.forEach((input) => {
      hideInputError(form, input, config.this._inputErrorClass, this._errorClass);
    });
    toggleButtonState(inputList, button, config.this._inactiveButtonClass);
  }











}


