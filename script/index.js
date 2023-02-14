const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

const handleEditButtonClick = () => {
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

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handlePopupClick);