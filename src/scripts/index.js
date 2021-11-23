import '../pages/index.css';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import UserInfo from './UserInfo.js';
import { initialCards } from './InitialCards.js';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
};

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-place');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const placeContent = document.querySelector('.elements');

const profileForm = document.querySelector("form[name='profile-form']");
const placeForm = document.querySelector("form[name='place-form']");

const validateProfile = new FormValidator(config, profileForm);
validateProfile.enableValidation();
const validatePlace = new FormValidator(config, placeForm);
validatePlace.enableValidation();

const fullscreenImage = document.querySelector('.popup_place');
const popupImage = new PopupWithImage(fullscreenImage);
fullscreenImage.setEventListeners();

function open(name, link) {
  popupImage.open(name, link);
}

function addCard ({ name, link}) {
  const card = new Card(name, link, '#cards-template', open).createCard();
  cardList.addItem(card);
}

function saveProfile({profileName, profileDescription}) {
  user.setUserInfo(profileName, profileDescription);
}

const popupProfileForm = new PopupWithForm(popupEditProfile, saveProfile);
const popupAddPlace = new PopupWithForm(popupAddCard, addCard);
popupProfileForm.setEventListeners();
popupAddPlace.setEventListeners();

const user = new UserInfo(profileName, profileDescription);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '#cards-template', open).createCard();
      cardList.addItem(card);
    },
  },
  placeContent,
);

cardList.renderItems();

editProfileButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupProfileForm.open();
  const profile = user.getUserInfo();
  inputName.value = profile.profileName;
  inputDescription.value = profile.profileDescription;
});

addPlaceButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupAddPlace.open();
  validatorPlace.toggleButtonState();
});

