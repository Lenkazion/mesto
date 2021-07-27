import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './InitialCards.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
};

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-place');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputPlaceURL= document.querySelector('.popup__input_type_place-url');

const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');

const closeEditProfile = document.querySelector('.popup__close_edit-profile');
const closeAddPlace = document.querySelector('.popup__close_add-place');
const closePlacePhoto = document.querySelector('.popup__close_place');

const editProfileForm = document.querySelector('.popup__form_edit-profile');
const addPlaceForm = document.querySelector('.popup__form_add-place');

const placeContent = document.querySelector('.elements');
const fullscreenPlace = document.querySelector('.popup_place');

const profileForm = document.querySelector("form[name='profile-form']");
const placeForm = document.querySelector("form[name='place-form']");

const validateProfile = new FormValidator(config, profileForm);
validateProfile.enableValidation();
const validatePlace = new FormValidator(config, placeForm);
validatePlace.enableValidation();

function addCard (name, link) {
  const card = new Card(name, link, '#cards-template', openPopup).createCard();
  placeContent.prepend(card);
}

function renderInitialCards () {
  initialCards.forEach(item => {
  addCard(item.name, item.link);
  })
}; 

function fillEditProfileFormInputs () {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

function openEditPopup () {
  openPopup(popupEditProfile);
  checkValidation(popupEditProfile);
  fillEditProfileFormInputs();
};

function submitEditProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
};
  
function submitAddCardForm(evt) {
    evt.preventDefault();
    addCard(inputPlaceName.value, inputPlaceURL.value);
    closePopup(popupAddCard);
    validatePlace.toggleButtonState();
};

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpEscapeButton);
  popup.addEventListener('click', closePopUpOnOverlay);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpEscapeButton);
  popup.removeEventListener('click', closePopUpOnOverlay);
};

function openAddPopup(popup) {
  openPopup(popup);
  }

const closePopUpEscapeButton = (evt) => {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape'){
     closePopup(openedPopup);
  }
};

const closePopUpOnOverlay = (evt) => {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.target === openedPopup) {
     closePopup(openedPopup);
  }
};

renderInitialCards();

addProfileButton.addEventListener('click', () => openAddPopup(popupAddCard));
closeAddPlace.addEventListener('click', () => {
  closePopup(popupAddCard);
  addPlaceForm.reset();
});
addPlaceForm.addEventListener('submit', submitAddCardForm);
closePlacePhoto.addEventListener('click', () => closePopup(fullscreenPlace));

editProfileButton.addEventListener('click', openEditPopup);
closeEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
editProfileForm.addEventListener('submit', submitEditProfileForm);

