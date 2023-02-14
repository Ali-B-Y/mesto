const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-nickname');
let jobInput = document.querySelector('.popup__input-job');
const profileNickname = document.querySelector('.profile__nickname');
const profileJob = document.querySelector('.profile__job')

const handleEditButtonClick = () => {
	nameInput.value = profileNickname.textContent;
	jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

const handleCloseButtonClick = () => {
	popup.classList.remove('popup_opened');
}

const handlePopupClick = (event) => {
	if(event.target === event.currentTarget) {
		popup.classList.remove('popup_opened');
	}
}

function handleFormSubmit (event) {
    event.preventDefault();
	profileNickname.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
	popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handlePopupClick);
formElement.addEventListener('submit', handleFormSubmit); 
