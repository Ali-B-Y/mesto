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
const cardPhoto = document.querySelector('.card__photo');

// кнопки лайк и урна
const buttonLikeCard = document.querySelector('.card__like-button');

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

// Дублируем 6 карточек начального экрана, клонируем шаблон, создаем и наполняем карточки
initialCards.forEach(el => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = card.querySelector('.card__photo');
  const cardTitle = card.querySelector('.card__title');
  cardPhoto.src = el.link;
  cardPhoto.setAttribute('alt', el.name);
  cardTitle.textContent = el.name;
  cardsContainer.append(card);
})










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



// cardPhoto.addEventListener('click', () => {
//   openPopup(popupViewPhoto);
// });




const buttonsRemoveCard = document.querySelectorAll('.card__remove-button');
// вешаем на каждую урну слушатель
// buttonsRemoveCard.forEach(() => {
//   addEventListener('click', (event) => {
//     const eventTarget = event.target;
//     const removedCard = eventTarget.closest('.card');
//     removedCard.remove();
//   });
// });
buttonsRemoveCard.forEach(()=> {
  addEventListener('click', evt => {
    const eventTarget = evt.target;
    const removedCard = eventTarget.closest('.card');
    removedCard.remove();
  });
});

