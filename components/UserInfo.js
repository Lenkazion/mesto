export default class UserInfo {
    constructor(name, description) {
      this._name = name;
      this._description = description;
    }
  
    getUserInfo() {
      this._obj = {
        name: this._name.textContent,
        description: this._description.textContent,
      };
      return this._obj
    }
  
    setUserInfo(name, description) {
      this._name.textContent = name;
      this._description.textContent = description;
    }
  }