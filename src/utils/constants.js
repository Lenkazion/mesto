export { config, popupEditProfile, popupAddCard, profileName, profileDescription, inputName, inputDescription, editProfileButton, addPlaceButton,
placeContent, profileForm, placeForm, fullscreenImage}

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

const fullscreenImage = document.querySelector('.popup_place');