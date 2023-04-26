export default class UserInfo {
  constructor({ nicknameSelector, descriptionSelector }) {
    this._nicknameElement = document.querySelector(nicknameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nicknameElement.textContent,
      about: this._descriptionElement.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._nicknameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }
}
