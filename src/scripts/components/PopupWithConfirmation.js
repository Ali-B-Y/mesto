import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(formSubmitCallback, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
    this._formSubmitCallback = formSubmitCallback;
    this._submitHandler = this._handleFormSubmit.bind(this);
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._formSubmitCallback(this._cardId, this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitHandler);
  }

  loading(text, isBlocked) {
    this._submitButton.disabled = isBlocked;
    this._submitButton.textContent = text;
  }
}
