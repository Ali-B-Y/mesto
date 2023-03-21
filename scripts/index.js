import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// попап редактировать профиль
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');

// попап добавить карточку
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');

// попап просмотр увеличенного фото
const popupViewPhoto = document.querySelector('.popup_type_view-photo');
const popupPhoto = popupViewPhoto.querySelector('.popup__photo');
const popupTitle = popupViewPhoto.querySelector('.popup__photo-caption');

//кнопки закрытия всех попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// форма профиля
const formEditProfile = document.forms['edit-profile'];
const profileNickname = document.querySelector('.profile__nickname');
const profileDesc = document.querySelector('.profile__desc');

// форма добавления карточки
const formAddCard = document.forms['add-card'];

// контейнер для будущих карточек и шаблон карточек
const cardsContainer = document.querySelector('.cards-container');
const cardTemplate = document.querySelector('.card-template').content;

// объект настроек с селекторами и классами формы;
const validationConfiguration = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// исходный массив с данными будущих 6-и карточек начального экрана
const initialCards = [
  {
    name: 'Ташкент-Узбекистан',
    link: 'https://i.ibb.co/KXdXsLq/6.jpg'
  },
  {
    name: 'Кабул-Афганистан',
    link: 'https://i.ibb.co/gZwV5h3/5.jpg'
  },
  {
    name: 'Душанбе-Таджикистан',
    link: 'https://i.ibb.co/k0GVbxt/4.jpg'
  },
  {
    name: 'Бишкек-Киргизия',
    link: 'https://i.ibb.co/kQQwgkC/3.jpg'
  },
  {
    name: 'Астана-Казахстан',
    link: 'https://i.ibb.co/FwtSWpd/2.jpg'
  },
  {
    name: 'Ашхабад-Туркмения',
    link: 'https://i.ibb.co/d2QNKP5/1.jpg'
  }
];

// открытие и закрытие всех попапов
const closePopupByEsc = (evt) => {
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

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup))
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
})

// обработчик просмотра увеличенного фото
const handleCardPhoto = (cardPhoto) => {
  popupPhoto.src = cardPhoto.src;
  popupPhoto.alt = cardPhoto.alt;
  popupTitle.textContent = cardPhoto.alt;
  openPopup(popupViewPhoto);
}

// создание экземпляра карточки
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplate, handleCardPhoto);
  return card.generateCard();
}

// рендеринг карточки
const renderCard = (cardData) => {
  cardsContainer.prepend(createCard(cardData));
}

// обход исходного массива
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

// initialCards.forEach((cardData) => {
//   const card = new Card(cardData, cardTemplate, handleCardPhoto);
//   const cardElement = card.generateCard();
//   cardsContainer.prepend(cardElement);
// });

// создание экземпляров форм валидации
const createFormValidator = (formElement) => {
  const formValidator = new FormValidator(validationConfiguration, formElement);
  formValidator.enableValidation();
  return formValidator;
}

// вызов валидации
const formEditProfileValidator = createFormValidator(formEditProfile);
const formAddCardValidator = createFormValidator(formAddCard);

// слушатель и обработчик кнопки редактироваеия профиля
const handleEditProfile = () => {
  formEditProfile.nickname.value = profileNickname.textContent;
  formEditProfile.desc.value = profileDesc.textContent;
  formEditProfileValidator.clearErrorValidation();
  openPopup(popupEditProfile);
}

buttonEditProfile.addEventListener('click', handleEditProfile);

// слушатель и обработчик кнопки добавить карточку
const openAddCardPopup = () => {
  formAddCardValidator.clearErrorValidation();
  openPopup(popupAddCard);
}

buttonAddCard.addEventListener('click', openAddCardPopup);

// слушатель и обработчик формы профиля
const handleFormEditProfileSubmit = evt => {
  evt.preventDefault();
  profileNickname.textContent = formEditProfile.nickname.value;
  profileDesc.textContent = formEditProfile.desc.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// слушатель и обработчик формы добавления карточки пользователя
const handleFormAddCardSubmit = evt => {
  evt.preventDefault();
  const userCard = {};
  userCard.name = formAddCard.title.value;
  userCard.link = formAddCard.link.value;
  renderCard(userCard);
  closePopup(popupAddCard);
  evt.target.reset();
}

formAddCard.addEventListener('submit', handleFormAddCardSubmit);
