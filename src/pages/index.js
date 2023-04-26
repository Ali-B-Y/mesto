import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from '../scripts/components/UserInfo.js';
import {
  buttonAddCard,
  buttonEditProfile,
  cardsContainerSelector,
  cardTemplate,
  formAddCard,
  formEditProfile,
  initialCards,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupViewPhotoSelector,
  profileInfo,
  validationConfiguration
} from "../scripts/utils/constants.js";

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
