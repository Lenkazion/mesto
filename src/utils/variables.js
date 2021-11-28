export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error',
};

export const userInformation = {
  userId: null,
  userName: '.profile__name',
  userAbout: '.profile__description',
  userAvatar: '.profile__avatar',
};

export const popups = {
  avatar: '.popup_edit-avatar',
  profile: '.popup_edit-profile',
  place: '.popup_add-place',
  image: '.popup_place',
  delete: '.popup_delete-confirmation',
};

export const forms = {
  avatar: '.popup__form_edit-avatar',
  profile: '.popup__form_edit-profile',
  place: '.popup__form_add-place',
  delete: '.popup__form_delete-confirmation',
};

export const buttons = {
  avatar: document.querySelector('.profile__avatar'),
  editProfile: document.querySelector('.profile__edit-button'),
  addPlace: document.querySelector('.profile__add-button'),
};

export const template = {
  elementsList: '.elements',
  element: '#cards-template',
};