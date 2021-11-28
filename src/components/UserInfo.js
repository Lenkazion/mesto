export default class UserInfo {
    constructor({userId, userName, userAbout, userAvatar}) {
      this._userId = userId;
      this._userName = document.querySelector(userName);
      this._userAbout = document.querySelector(userAbout);
      this._userAvatar = document.querySelector(userAvatar);
    }
  
    getUserInfo() {
      return {
        userId: this._userId,
        name: this._userName.textContent,
        about: this._userAbout.textContent,
        avatar: this._userAvatar
      };
    }
  
    setUserInfo(data) {
      this._userId = data._id;
      this._userName.textContent = data.name;
      this._userAbout.textContent = data.about;
      this._userAvatar.style.backgroundImage = `url(${data.avatar})`;
    }
  }