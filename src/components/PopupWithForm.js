import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
  }
  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}