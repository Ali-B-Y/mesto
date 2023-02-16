const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonСlose = document.querySelector('.popup__close-button');
const form = document.querySelector('.popup__form');
const nicknameInput = document.querySelector('.popup__input_js_nickname');
const descInput = document.querySelector('.popup__input_js_desc');
const profileNickname = document.querySelector('.profile__nickname');
const profileDesc = document.querySelector('.profile__desc');

const openPopup = (popup) => {
	popup = popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
	popup = popup.classList.remove('popup_opened');
}

const handleEditProfile = () => {
	nicknameInput.value = profileNickname.textContent;
	descInput.value = profileDesc.textContent;
	openPopup(popup);
}

function handleFormSubmit(event) {
	event.preventDefault();
	profileNickname.textContent = nicknameInput.value;
	profileDesc.textContent = descInput.value;
	closePopup(popup);
}

// const handlePopupClick = (event) => {
// 	if (event.target === event.currentTarget) {
// 		popup.classList.remove('popup_opened');
// 	}
// }


buttonEdit.addEventListener('click', handleEditProfile);
form.addEventListener('submit', handleFormSubmit);
buttonСlose.addEventListener('click', () => {
	closePopup(popup);
})
//popup.addEventListener('click', handlePopupClick);






