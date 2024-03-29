import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
    this._inputsList = this._popupForm.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const formValues = {};
    this._inputsList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._getInputValues())
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  loading(text, isBlocked) {
    this._submitButton.disabled = isBlocked;
    this._submitButton.textContent = text;
  }
}
