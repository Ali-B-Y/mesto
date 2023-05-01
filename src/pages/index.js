import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation
  from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import {
  apiSettings,
  buttonAddCard,
  buttonEditAvatar,
  buttonEditProfile,
  cardsContainerSelector,
  cardTemplate,
  formAddCard,
  formEditAvatar,
  formEditProfile,
  popupAddCardSelector,
  popupDeleteCardSelector,
  popupEditAvatarSelector,
  popupEditProfileSelector,
  popupViewPhotoSelector,
  profileInfo,
  validationConfiguration
} from '../scripts/utils/constants.js';

let userId;

const userInfo = new UserInfo(profileInfo);
const api = new Api(apiSettings);

//открытие попапа с картинкой по клику на карточку
const handleCardClick = (photo) => {
  popupWithImage.open(photo);
};

//открытие попапа редактирования профиля
const handleEditProfile = () => {
  const data = userInfo.getUserInfo();
  popupEditProfile.setInputValues(data);
  formEditProfileValidator.clearErrorValidation();
  popupEditProfile.open();
};

//открытие попапа редактирования аватара
const openEditAvatarPopup = () => {
  formEditAvatarValidator.clearErrorValidation();
  popupEditAvatar.open();
};

//открытие попапа добавления карточки
const openAddCardPopup = () => {
  formAddCardValidator.clearErrorValidation();
  popupAddCard.open();
};

//создание карточек и их рендеринг
const renderCard = (cardData) => {
  const card = new Card(cardData, userId, cardTemplate, handleCardClick, handleClickDeleteButton, handleLikeClick).generateCard();
  cardList.setItem(card);
};

//создание экземпляра класса для добавления карточек
const cardList = new Section(renderCard, cardsContainerSelector);

//обработка клика на кнопку удаления карточки
const handleClickDeleteButton = (cardId, card) => {
  popupConfirmDelete.open(cardId, card);
};

//сохранение изменений профиля
const handleFormEditProfileSubmit = (data) => {
  popupEditProfile.loading('Сохранение...', true);
  api.changeUserInfo(data)
    .then(response => {
      userInfo.setUserInfo(response);
      popupEditProfile.close();
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => popupEditProfile.loading('Сохранить', false));

};

//сохранение изменений аватара
const handleSaveAvatarSubmit = (data) => {
  popupEditAvatar.loading('Сохранение...', true);
  api.changeUserAvatar(data)
    .then(response => {
      userInfo.setUserAvatar(response);
      popupEditAvatar.close();
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => popupEditAvatar.loading('Сохранить', false));
};

//добавление новой карточки
const handleAddCard = (data) => {
  popupAddCard.loading('Создание...', true);
  api.addUserCard(data)
    .then(response => {
      renderCard(response);
      popupAddCard.close();
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => popupAddCard.loading('Создать', false));
};

//удаление карточки
const handleDeleteCard = (cardId, card) => {
  popupConfirmDelete.loading('Сохранение...', true);
  api.deleteUserCard(cardId)
    .then(() => {
      card.handleRemoveCard();
      popupConfirmDelete.close();
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => popupConfirmDelete.loading('Да', false));
};

//обработка лайка карточки
const handleLikeClick = (cardId, isLiked, card) => {
  card.blockLikeButton(true);
  if (isLiked) {
    api.deleteLike(cardId)
      .then(response => {
        console.log(response)
        card.handleLike(response.likes);
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => card.blockLikeButton(false));
  } else {
    api.addLike(cardId)
      .then(response => {
        card.handleLike(response.likes);
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => card.blockLikeButton(false));
  }
};

// создание экземпляров попапов
const popupAddCard = new PopupWithForm(handleAddCard, popupAddCardSelector);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(handleFormEditProfileSubmit, popupEditProfileSelector);
popupEditProfile.setEventListeners();

const popupWithImage = new PopupWithImage(popupViewPhotoSelector);
popupWithImage.setEventListeners();

const popupEditAvatar = new PopupWithForm(handleSaveAvatarSubmit, popupEditAvatarSelector);
popupEditAvatar.setEventListeners();

const popupConfirmDelete = new PopupWithConfirmation(handleDeleteCard, popupDeleteCardSelector);
popupConfirmDelete.setEventListeners();


// создание экземпляров форм валидации
const createFormValidator = (formElement) => {
  const formValidator = new FormValidator(validationConfiguration, formElement);
  formValidator.enableValidation();
  return formValidator;
}

// вызов валидации
const formEditProfileValidator = createFormValidator(formEditProfile);
const formAddCardValidator = createFormValidator(formAddCard);
const formEditAvatarValidator = createFormValidator(formEditAvatar);


//получение карточек и информации пользователя с сервера при загрузке страницы
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch(error => console.log(`Ошибка: ${error}`));


//слушатель кнопки редактирования профиля
buttonEditProfile.addEventListener('click', handleEditProfile);

//слушатель кнопки редактирования аватара
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

//слушатель кнопки добавления карточки
buttonAddCard.addEventListener('click', openAddCardPopup);
