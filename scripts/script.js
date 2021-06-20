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

const submitButton = document.querySelector('.popup__submit');

const closeEditProfile = document.querySelector('.popup__close_edit-profile');
const closeAddPlace = document.querySelector('.popup__close_add-place');
const closePlacePhoto = document.querySelector('.popup__close_place');

const editProfileForm = document.querySelector('.popup__form_edit-profile');
const addPlaceForm = document.querySelector('.popup__form_add-place');

const cardTemplate = document.querySelector('#cards-template').content;
const placeContent = document.querySelector('.elements');
const fullscreenPlace = document.querySelector('.popup_place');
const fullscreenPlacePhoto = document.querySelector('.popup__image');
const fullscreenPlacePhotoText = document.querySelector('.popup__text');



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function fillEditProfileFormInputs () {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
};

function openPopup (popup) {
    popup.classList.add('popup_opened');
};

function openEditPopup () {
    openPopup(popupEditProfile);
    fillEditProfileFormInputs();
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
};

function submitEditProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEditProfile);
};


function renderInitialCards () {
    initialCards.forEach(item => {
      addCard(createCard(item.name, item.link));
   })
 }; 

 
function createCard (name, link) {
    const card = cardTemplate.cloneNode(true);
    const title = card.querySelector('.element__title');
    const image = card.querySelector('.element__image');
    title.textContent = name;
    image.src = link;
    image.alt = name;

  
image.addEventListener('click', function(){
    openPopup(fullscreenPlace);
    fullscreenPlacePhoto.src = link;
    fullscreenPlacePhoto.alt = name;
    fullscreenPlacePhotoText.textContent = name;
});

const likeButton = card.querySelector('.element__like');
    likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active'));
  
const deleteButton = card.querySelector('.element__delete');
    deleteButton.addEventListener('click', () => deleteButton.closest('.element').remove());
    return card;
};
  
function addCard(card) {
    placeContent.prepend(card);
};
    
renderInitialCards();
  
function submitAddCardForm(evt) {
    evt.preventDefault();
    addCard(createCard(inputPlaceName.value, inputPlaceURL.value));
    inputPlaceName.value = '';
    inputPlaceURL.value = '';
    closePopup(popupAddCard);
};

addProfileButton.addEventListener('click', () => openPopup(popupAddCard));
closeAddPlace.addEventListener('click', () => {
  closePopup(popupAddCard);
  addPlaceForm.reset();
});
addPlaceForm.addEventListener('submit', submitAddCardForm);
closePlacePhoto.addEventListener('click', () => closePopup(fullscreenPlace));

editProfileButton.addEventListener('click', openEditPopup);
closeEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
editProfileForm.addEventListener('submit', submitEditProfileForm);

