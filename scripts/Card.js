export default class Card {
    constructor(name, link, templateSelector, openPopup) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
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

        this._setEventListeners();

        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this.cardText.textContent = this._name;
        return this._cardElement;
    }

    _setEventListeners() {
        this.cardImage.addEventListener('click', () => {
            this._handleOpenPopUpImage();
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

    _handleOpenPopUpImage() {
        this.fullscreen = document.querySelector('.popup_place');
        this._openPopup(this.fullscreen);
        this.fullscreen.querySelector('.popup__image').src = this._link;
        this.fullscreen.querySelector('.popup__image').alt = this._name;
        this.fullscreen.querySelector('.popup__text').textContent = this._name;
    }

    _handleDelete() {
        this._cardElement.remove();
        this._cardElement = null;
    }
};