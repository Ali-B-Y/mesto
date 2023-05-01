// попап редактировать профиль
  export const popupEditProfileSelector = '.popup_type_edit-profile',
  buttonEditProfile = document.querySelector('.profile__edit-button'),

// попап добавить карточку
  popupAddCardSelector = '.popup_type_add-card',
  buttonAddCard = document.querySelector('.profile__add-button'),

// попап просмотр увеличенного фото
  popupViewPhotoSelector = '.popup_type_view-photo',

// форма профиля
  formEditProfile = document.forms['edit-profile'],

// форма добавления карточки
  formAddCard = document.forms['add-card'],

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

// исходный массив с данными будущих 6-и карточек начального экрана
  initialCards = [
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
  ],

  profileInfo = {
    nicknameSelector: '.profile__nickname',
    descriptionSelector: '.profile__desc',
  };
