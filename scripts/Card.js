export class Card {
  constructor(data, templateElement, handleCardPhoto) {
    this.name = data.name;
    this.link = data.link;
    this.templateElement = templateElement;
    this.handleCardPhoto = handleCardPhoto;
  }
  console.log(this.templateElement);

  getTemplate() {
    return this.templateElement.querySelector('.card').cloneNode(true);
  }

  handleLikeButton = () => {
    this.buttonLikeCard.classList.toggle('card__like-button_active');
  }

  handleRemoveCard = () => {
    this.card.remove();
  }

  setEventListeners = () => {
    this.buttonRemoveCard.addEventListener('click', () => {
      this.handleRemoveCard();
    });
    this.buttonLikeCard.addEventListener('click', () => {
      this.handleLikeButton();
    });
    this.cardPhoto.addEventListener('click', () => {
      this.handleCardPhoto(this.cardPhoto);
    });
  }

  generateCard = () => {
    this.card = this.getTemplate();
    this.buttonRemoveCard = this.card.querySelector('.card__remove-button');
    this.buttonLikeCard = this.card.querySelector('.card__like-button');
    this.cardPhoto = this.card.querySelector('.card__photo');
    this.cardTitle = this.card.querySelector('.card__title');
    this.setEventListeners();
    this.cardPhoto.src = this.link;
    this.cardTitle.textContent = this.name;
    this.cardPhoto.alt = this.name;
    return this.card;
  }
}
