// попап редактировать профиль
export const popupEditProfileSelector = '.popup_type_edit-profile',
  buttonEditProfile = document.querySelector('.profile__edit-button'),

// попап добавить карточку
  popupAddCardSelector = '.popup_type_add-card',
  buttonAddCard = document.querySelector('.profile__add-button'),

// попап просмотр увеличенного фото
  popupViewPhotoSelector = '.popup_type_view-photo',

//попап подтверждения удаления карточки
  popupDeleteCardSelector = '.popup_type_delete-card',
  buttonEditAvatar = document.querySelector('.profile__avatar-edit'),

  //попап редактирования аватара
  popupEditAvatarSelector = '.popup_type_edit-avatar',

// форма профиля
  formEditProfile = document.forms['edit-profile'],

// форма добавления карточки
  formAddCard = document.forms['add-card'],

  //форма редактирования аватара
  formEditAvatar = document.forms['edit-avatar'],

// контейнер для будущих карточек и шаблон карточек
  cardsContainerSelector = '.cards-container',
  cardTemplate = document.querySelector('.card-template').content,

// объект настроек с селекторами и классами формы;
  validationConfiguration = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  },

  profileInfo = {
    nicknameSelector: '.profile__nickname',
    descriptionSelector: '.profile__desc',
    avatarSelector: '.profile__avatar'
  },

  apiSettings = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
      authorization: 'a9540b87-8667-40ff-a62a-c3c072b9a9c4',
      'Content-Type': 'application/json'
    }
  };
