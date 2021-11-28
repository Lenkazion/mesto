import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { config, userInformation, popups, forms, buttons, template } from '../utils/variables.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'd3a63f01-1045-4e1e-b727-d3760ac2c2e8',
    'Content-Type': 'application/json',
  },
});

const user = new UserInfo(userInformation);

const popupImage = new PopupWithImage(popups.image);
popupImage.setEventListeners();

const popupDeleteConfirmation = new PopupWithSubmit(popups.delete);
popupDeleteConfirmation.setEventListeners();

const popupEditAvatar = new PopupWithForm(popups.avatar, saveAvatar);
popupEditAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm(popups.profile, saveProfile);
popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm(popups.place, saveNewPlace); 
popupAddPlace.setEventListeners();

const validateProfile = new FormValidator(config, forms.profile);
validateProfile.enableValidation();
const validatePlace = new FormValidator(config, forms.place);
validatePlace.enableValidation();
const validateAvatar = new FormValidator(config, forms.avatar);
validateAvatar.enableValidation();

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createNewCard(item))
    },
  container: template.elementsList
});

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

function createNewCard(data) {
  const card = new Card({
    data: data,
    userId: user.getUserInfo().userId,
    cardSelector: template.element,
    handleCardClick: handleCardClick,
    handleLikeClick: () => handleLikeClick(card, data),
    handleDeleteClick: () => handleDeleteClick(card),
  });
  return card.createCard();
}

function saveAvatarButton() {
  validateAvatar.toggleButtonState();
  validateAvatar.hideError();
  popupEditAvatar.open();
}

function saveProfileButton() {
  popupEditProfile.open();
  const profile = user.getUserInfo();
  popupEditProfile.setAutoFill(profile);
  validateProfile.toggleButtonState();
  validateProfile.hideError();
}

function saveNewPlaceButton() {
  validatePlace.toggleButtonState();
  validatePlace.hideError();
  popupAddPlace.open();
}

function saveAvatar(data) {
  popupEditAvatar.setButtonText(true);
  api
    .setAvatar(data)
    .then((data) => {
      user.setUserInfo(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.setButtonText(false);
    });
}

function saveProfile(userData) {
  popupEditProfile.setButtonText(true);
  api
    .setUserInfo(userData)
    .then((userData) => {
      user.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.setButtonText(false);
    });
}

function saveNewPlace(data) {
  popupAddPlace.setButtonText(true);
  api
    .setCard(data)
    .then((data) => {
      cardList.addItem(createNewCard(data), false);
      popupAddPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddPlace.setButtonText(false);
    });
}

function handleLikeClick(card, data) {
  const firstAction = card.isLiked(data) ? api.setDislike(data._id) : api.setLike(data._id);
  firstAction
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteClick(card) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setNewHandler(() => {
    popupDeleteConfirmation.setButtonText(true);
    api
      .setDelete(card.getCardId())
      .then(() => {
        card.handleDeleteCard();
        popupDeleteConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDeleteConfirmation.setButtonText(false);
      });
  });
}

api
  .getAllData()
  .then((data) => {
    const [cards, userData] = data;
    user.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

buttons.avatar.addEventListener('click', saveAvatarButton);
buttons.editProfile.addEventListener('click', saveProfileButton);
buttons.addPlace.addEventListener('click', saveNewPlaceButton);


