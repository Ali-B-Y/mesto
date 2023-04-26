import './index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from '../scripts/UserInfo.js';

// попап редактировать профиль
const popupEditProfileSelector = '.popup_type_edit-profile';
const buttonEditProfile = document.querySelector('.profile__edit-button');

// попап добавить карточку
const popupAddCardSelector = '.popup_type_add-card';
const buttonAddCard = document.querySelector('.profile__add-button');

// попап просмотр увеличенного фото
const popupViewPhotoSelector = '.popup_type_view-photo';

// форма профиля
const formEditProfile = document.forms['edit-profile'];

// форма добавления карточки
const formAddCard = document.forms['add-card'];

// контейнер для будущих карточек и шаблон карточек
const cardsContainerSelector = '.cards-container';
const cardTemplate = document.querySelector('.card-template').content;

// объект настроек с селекторами и классами формы;
export const validationConfiguration = {
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

const profileInfo = {
  nicknameSelector: '.profile__nickname',
  descriptionSelector: '.profile__desc',
};

const userInfo = new UserInfo(profileInfo);

const handleCardClick = (photo) => {
  popupWithImage.open(photo);
};

//создание карточек и их рендеринг
const renderCard = (cardData) => {
  const card = new Card(cardData, cardTemplate, handleCardClick).generateCard();
  addCreatedCard.setItem(card);
};

const addCreatedCard = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsContainerSelector);

addCreatedCard.renderItems();

// обработчик формы профиля
const handleFormEditProfileSubmit = (data) => {
  userInfo.setUserInfo(data);
};

// создание экземпляров попапов
const popupAddCard = new PopupWithForm(renderCard, popupAddCardSelector);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(handleFormEditProfileSubmit, popupEditProfileSelector);
popupEditProfile.setEventListeners();

const popupWithImage = new PopupWithImage(popupViewPhotoSelector);
popupWithImage.setEventListeners();


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
  const data = userInfo.getUserInfo();
  popupEditProfile.setInputValues(data);
  formEditProfileValidator.clearErrorValidation();
  popupEditProfile.open();
}

buttonEditProfile.addEventListener('click', handleEditProfile);

// слушатель и обработчик кнопки добавить карточку
const openAddCardPopup = () => {
  formAddCardValidator.clearErrorValidation();
  popupAddCard.open();
}

buttonAddCard.addEventListener('click', openAddCardPopup);
