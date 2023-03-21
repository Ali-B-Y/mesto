export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._submitButton = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  // отображение ошибки инпута
  _showInputError = (input) => {
    this._error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    this._error.textContent = input.validationMessage;
    this._error.classList.add(this._errorClass);
  };

  // скрытие ошибки инпута
  _hideInputError = (input) => {
    this._error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    this._error.classList.remove(this._errorClass);
    this._error.textContent = '';
  };

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
      }
    };

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
      this._setEventListeners();
  };

  clearErrorValidation = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}


