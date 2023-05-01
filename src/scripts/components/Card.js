export default class Card {
  constructor(data, userId, templateElement, handleCardClick, handleClickDeleteButton, handleLikeCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this._handleClickDeleteButton = handleClickDeleteButton;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    return this._templateElement.querySelector('.card').cloneNode(true);
  }

  _handleLikeButton(isLiked) {
    if(isLiked) {
      this._buttonLikeCard.classList.add('card__like-button_active');
    } else {
      this._buttonLikeCard.classList.remove('card__like-button_active');
    }
  }

  handleRemoveCard() {
    this._card.remove();
    this._card = null;
  }

  _checkUserLike() {
    return this._likes.some(owner => owner._id === this._userId);
  }

  handleLike(likes) {
    this._likes = likes;
    this._isLiked = this._checkUserLike();
    this._likesCounter.textContent = likes.length;
    this._handleLikeButton(this._isLiked);
  }

  blockLikeButton(isBlocked) {
    this._buttonLikeCard.disabled = isBlocked;
  }

  _setEventListeners() {
    this._buttonRemoveCard.addEventListener('click', () => {
      this._handleClickDeleteButton(this._cardId, this);
    });
    this._buttonLikeCard.addEventListener('click', () => {
      this._handleLikeCard(this._cardId, this._isLiked, this);
    });
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardPhoto);
    });
  }

  generateCard = () => {
    this._card = this._getTemplate();
    this._buttonRemoveCard = this._card.querySelector('.card__remove-button');
    if(this._ownerId !== this._userId) {
      this._buttonRemoveCard.remove();
    }
    this._buttonLikeCard = this._card.querySelector('.card__like-button');
    this._likesCounter = this._card.querySelector('.card__like-counter');
    this._cardPhoto = this._card.querySelector('.card__photo');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardPhoto.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardPhoto.alt = this._name;
    this.handleLike(this._likes);
    this._setEventListeners();
    return this._card;
  }
}
