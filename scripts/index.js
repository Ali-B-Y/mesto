// попап редактировать профиль
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');

// попап добавить карточку
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');

// попап просмотр увеличенного фото
const popupViewPhoto = document.querySelector('.popup_type_view-photo');

//кнопки закрытия всех попапов
const buttonsClose = document.querySelectorAll('.popup__close-button');

// форма профиля
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nicknameInput = document.querySelector('.popup__input_type_nickname');
const descInput = document.querySelector('.popup__input_type_desc');
const profileNickname = document.querySelector('.profile__nickname');
const profileDesc = document.querySelector('.profile__desc');

// форма добавления карточки
const formAddCard = document.querySelector('form[name="add-card"]');
const photoNameInput = document.querySelector('.popup__input_type_photo-name');
const photoUrlInput = document.querySelector('.popup__input_type_photo-url');

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

// открытие и закрытие всех попапов
closePopupByEsc = (evt) => {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

buttonsClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup))
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
})

// создание карточки и наполнение
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

// рендеринг и обход исходного массива
const renderCard = (el) => {
  const card = createCard(el);
  cardsContainer.prepend(card);
}

initialCards.forEach(el => {
  renderCard(el);
});

// слушатель и обработчик кнопки редактироваеия профиля
const handleEditProfile = () => {
  nicknameInput.value = profileNickname.textContent;
  descInput.value = profileDesc.textContent;
  clearErrorValidation(formEditProfile, validationConfiguration);
  openPopup(popupEditProfile);
}

buttonEditProfile.addEventListener('click', handleEditProfile);

// слушатель и обработчик кнопки добавить карточку
const handleAddCard = () => {
  clearErrorValidation(formAddCard, validationConfiguration);
  openPopup(popupAddCard);
}

buttonAddCard.addEventListener('click', handleAddCard);

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
  closePopup(popupAddCard);
  evt.target.reset();
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);


