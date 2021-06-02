let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');
let editProfileButton = document.querySelector('.profile__edit-button');
let submitButton = document.querySelector('.popup__submit');
let closeButton = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form'); 

function writePopup () {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
};

function openPopup () {
    popup.classList.add('popup_opened');
    writePopup();
}

editProfileButton.addEventListener('click', openPopup);

function closePopup () {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup();
}

form.addEventListener('submit', formSubmitHandler);