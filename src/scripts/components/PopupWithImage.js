import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupPhotoCaption = this._popup.querySelector('.popup__photo-caption');
  }

  open({ alt, src }) {
    this._popupPhoto.src = src;
    this._popupPhoto.alt = alt;
    this._popupPhotoCaption.textContent = alt;
    super.open();
  }
}
