// попап редактировать профиль
const popupEditProfile = document.querySelector('.popup_js_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');

// попап добавить карточку
const popupAddCard = document.querySelector('.popup_js_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-button');

// попап просмотр увеличенного фото
const popupViewPhoto = document.querySelector('.popup_js_view-photo');

// форма профиля
const form = document.querySelector('.popup__form');
const nicknameInput = document.querySelector('.popup__input_js_nickname');
const descInput = document.querySelector('.popup__input_js_desc');
const profileNickname = document.querySelector('.profile__nickname');
const profileDesc = document.querySelector('.profile__desc');

// контейнер для будущих карточек и шаблон карточек
const cardsContainer = document.querySelector('.cards-container');
const cardTemplate = document.querySelector('.card-template').content;

const initialCards = [
  {
    name: 'Ашхабад-Туркмения',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Астана-Казахстан',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Бишкек-Киргизия',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Душанбе-Таджикистан',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Кабул-Афганистан',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Ташкент-Узбекистан',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopup = (popup) => {
	popup = popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
	popup = popup.classList.remove('popup_opened');
}

const createCard = ((data) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonRemoveCard = card.querySelector('.card__remove-button');
  const buttonLikeCard = card.querySelector('.card__like-button');
  const cardPhoto = card.querySelector('.card__photo');
  const cardTitle = card.querySelector('.card__title');
  const handleLikeButton = () => {
    buttonLikeCard.classList.toggle('card__like-button_active');
  }
  const handleRemoveCard = () => {
    card.remove();
  }
  const handleCardPhoto = () => {
    openPopup(popupViewPhoto);
    const popupPhoto = popupViewPhoto.querySelector('.popup__photo');
    popupPhoto.src = cardPhoto.src;
  }
  buttonRemoveCard.addEventListener('click', handleRemoveCard);
  buttonLikeCard.addEventListener('click',handleLikeButton);
  cardPhoto.addEventListener('click', handleCardPhoto);
  cardPhoto.src = data.link;
  cardTitle.textContent = data.name;
  cardPhoto.alt = data.name;
  return card;
})

const renderCard = (data) => {
  const card = createCard(data);
  cardsContainer.append(card);
}

initialCards.forEach(el => {
  renderCard(el);
});




// cardPhoto.addEventListener('click', () => {
//   openPopup(popupViewPhoto);
// });







const handleEditProfile = () => {
	nicknameInput.value = profileNickname.textContent;
	descInput.value = profileDesc.textContent;
	openPopup(popupEditProfile);
}

const handleAddCard = () => {
  openPopup(popupAddCard);
}

function handleFormSubmit(event) {
	event.preventDefault();
	profileNickname.textContent = nicknameInput.value;
	profileDesc.textContent = descInput.value;
	closePopup(popupEditProfile);
}

// const handlePopupClick = (event) => {
// 	if (event.target === event.currentTarget) {
// 		popup.classList.remove('popup_opened');
// 	}
// }

buttonEditProfile.addEventListener('click', handleEditProfile);
buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
})

buttonAddCard.addEventListener('click', handleAddCard);
buttonCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

form.addEventListener('submit', handleFormSubmit);


//popup.addEventListener('click', handlePopupClick);






