export default class Card {
    constructor({ data, userId, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick}) {
        this._data = data;
        this._place = data.name;
        this._link = data.link;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._cardSelector = document.querySelector(cardSelector).content;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    getCardId() {
        return this._cardId;
    }

    isLiked() {
        return this._isLiked;
    }

    setLike(data) {
        this._isLiked = data.likes.filter((item) => { return item._id == this._userId; }).length > 0;
        this._likeCounter.textContent = data.likes.length;
        if (this._isLiked) {
          this._cardLike.classList.add('element__like_active');
        } else {
          this._cardLike.classList.remove('element__like_active');
        }
      }

    createCard() {
        this._cardElement = this._getTemplate();

        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardTitle = this._cardElement.querySelector('.element__title');
        this._cardLike = this._cardElement.querySelector('.element__like');
        this._likeCounter = this._cardElement.querySelector('.element__like_counter');
        this._cardDelete = this._cardElement.querySelector('.element__delete');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._place;
        this._cardTitle.textContent = this._place;

        this._setEventListeners();
        this._hideDeleteButton();
        this.setLike(this._data);

        return this._cardElement;
    }

    _getTemplate() {
        const cardTemplate = this._cardSelector.querySelector('.element').cloneNode(true);
        return cardTemplate;
    }

    _hideDeleteButton() {
        if (this._ownerId !== this._userId) {
          this._cardDelete.style.display = 'none';
        }
      }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._place, this._link);
        });

        this._cardLike.addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._cardDelete.addEventListener('click', (evt) => {
            this._handleDeleteClick();
        });
    }

    handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }
};