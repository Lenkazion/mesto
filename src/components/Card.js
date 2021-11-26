export default class Card {
    constructor(name, link, templateSelector, handlerPopUpImage) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handlerPopUpImage = handlerPopUpImage;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        return cardTemplate.cloneNode(true).querySelector('.element');
    }

    createCard() {
        this._cardElement = this._getTemplate();

        this.cardImage = this._cardElement.querySelector('.element__image');
        this.cardText = this._cardElement.querySelector('.element__title');
        this.cardLike = this._cardElement.querySelector('.element__like');
        this.cardDelete = this._cardElement.querySelector('.element__delete');

        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this.cardText.textContent = this._name;

        this._setEventListeners();

        return this._cardElement;
    }

    _setEventListeners() {
        this.cardImage.addEventListener('click', () => {
            this._handlerPopUpImage(this._name, this._link);
        });

        this.cardLike.addEventListener('click', () => {
            this._handleLike();
        });

        this.cardDelete.addEventListener('click', (evt) => {
            this._handleDelete();
        });
    }

    _handleLike() {
        this.cardLike.classList.toggle('element__like_active');
    }

    _handleDelete() {
        this._cardElement.remove();
        this._cardElement = null;
    }
};