import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelector('.popup__submit');
  }
  _getInputValues() {
    this._inputList = Array.from(this._inputs);
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

  setAutoFill(data) {
    this._inputs.forEach((item) => {
      if (data[item.name]) {
        item.value = data[item.name];
      }
    });
  }

  setButtonText(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = 'Сохранить';
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}