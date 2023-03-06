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
const buttonCloseViewPhoto = popupViewPhoto.querySelector('.popup__close-button');

// форма профиля
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nicknameInput = document.querySelector('.popup__input_js_nickname');
const descInput = document.querySelector('.popup__input_js_desc');
const profileNickname = document.querySelector('.profile__nickname');
const profileDesc = document.querySelector('.profile__desc');

// форма добавления карточки
const formAddCard = document.querySelector('form[name="add-card"]');
const photoNameInput = document.querySelector('.popup__input_js_photo-name');
const photoUrlInput = document.querySelector('.popup__input_js_photo-url');

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

const createCard = (el => {
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
    const popupPhoto = popupViewPhoto.querySelector('.popup__photo');
    const popupTitle = popupViewPhoto.querySelector('.popup__photo-caption');
    popupPhoto.src = cardPhoto.src;
    popupPhoto.alt = cardPhoto.alt;
    popupTitle.textContent = cardTitle.textContent;
    openPopup(popupViewPhoto);
  }
  buttonRemoveCard.addEventListener('click', handleRemoveCard);
  buttonLikeCard.addEventListener('click',handleLikeButton);
  cardPhoto.addEventListener('click', handleCardPhoto);
  cardPhoto.src = el.link;
  cardTitle.textContent = el.name;
  cardPhoto.alt = el.name;
  return card;
})

const renderCard = (el) => {
  const card = createCard(el);
  cardsContainer.prepend(card);
}

initialCards.forEach(el => {
  renderCard(el);
});


// слушатель и обработчик кнопки редкатироваеия профиля
const handleEditProfile = () => {
  nicknameInput.value = profileNickname.textContent;
  descInput.value = profileDesc.textContent;
  openPopup(popupEditProfile);
}

buttonEditProfile.addEventListener('click', handleEditProfile);
buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

// слушатель и обработчик кнопки добавить карточку
const handleAddCard = () => {
  openPopup(popupAddCard);
}

buttonAddCard.addEventListener('click', handleAddCard);
buttonCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

// слушатель и обработчик формы профиля
const handleFormEditProfileSubmit = evt => {
  evt.preventDefault();
  profileNickname.textContent = nicknameInput.value;
  profileDesc.textContent = descInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// слушатель и обработчик формы добавления карточки пользователя
const handleFormAddCardSubmit = evt => {
  evt.preventDefault();
  const userCard = {};
  userCard.name = photoNameInput.value;
  userCard.link = photoUrlInput.value;
  renderCard(userCard);
  cardsContainer.lastElementChild.remove();
  closePopup(popupAddCard);
}

  // const addUsersCard = (photoName, photoUrl) => {
  //   const userCard = {};
  //   userCard.name = photoName;
  //   userCard.link = photoUrl;
  //   initialCards.unshift(userCard);
  //   initialCards.pop();
  //   return userCard
  // }

  // ((photoName, photoUrl) => {
  //   const userCard = {};
  //   userCard.name = photoName;
  //   userCard.link = photoUrl;
  //   initialCards.unshift('userCard');
  //   initialCards.pop();
  //   console.log(userCard)
  // })();


// const addUsersCard = (photoName, photoUrl) => {
//   const userCard = {};
//   userCard.name = photoName;
//   userCard.link = photoUrl;
//   initialCards.unshift('userCard');
//   initialCards.pop();
// }
//


formAddCard.addEventListener('submit', handleFormAddCardSubmit);




buttonCloseViewPhoto.addEventListener('click', () => {
  closePopup(popupViewPhoto);
});



// const handlePopupClick = (event) => {
// 	if (event.target === event.currentTarget) {
// 		popup.classList.remove('popup_opened');
// 	}
// }

//popup.addEventListener('click', handlePopupClick);
