export default class Card {
  constructor(data, templateElement, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate() {
    return this._templateElement.querySelector('.card').cloneNode(true);
  }

  _handleLikeButton = () => {
    this._buttonLikeCard.classList.toggle('card__like-button_active');
  }

  _handleRemoveCard = () => {
    this._card.remove();
  }

  _setEventListeners = () => {
    this._buttonRemoveCard.addEventListener('click', () => {
      this._handleRemoveCard();
    });
    this._buttonLikeCard.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardPhoto);
    });
  }

  generateCard = () => {
    this._card = this._getTemplate();
    this._buttonRemoveCard = this._card.querySelector('.card__remove-button');
    this._buttonLikeCard = this._card.querySelector('.card__like-button');
    this._cardPhoto = this._card.querySelector('.card__photo');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardPhoto.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardPhoto.alt = this._name;
    this._setEventListeners();
    return this._card;
  }
}
