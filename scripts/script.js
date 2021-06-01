let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');
let openPopup = document.querySelector('.profile__edit-button');
let submitButton = document.querySelector('.popup__submit');
let closeButton = document.querySelector('.popup__close'); 



openPopup.addEventListener('click', function(evt){
    evt.preventDefault();
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
});

submitButton.addEventListener('click', function(evt){
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    popup.classList.remove('popup_opened');
})

closeButton.addEventListener('click', function(evt){
    evt.preventDefault();
    popup.classList.remove('popup_opened');
});