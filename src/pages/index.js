import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/InitialCards.js';
import { config, popupEditProfile, popupAddCard, profileName, profileDescription, inputName, inputDescription, editProfileButton, addPlaceButton,
  placeContent, profileForm, placeForm, fullscreenImage, popupPlaceName, popupPlaceLink} from '../utils/constants.js';

const validateProfile = new FormValidator(config, profileForm);
validateProfile.enableValidation();
const validatePlace = new FormValidator(config, placeForm);
validatePlace.enableValidation();

const popupImage = new PopupWithImage(fullscreenImage);
popupImage.setEventListeners();

const popupProfileForm = new PopupWithForm(popupEditProfile, saveProfile);
popupProfileForm.setEventListeners();

const popupAddPlace = new PopupWithForm(popupAddCard, addCard); 
popupAddPlace.setEventListeners();

const user = new UserInfo(profileName, profileDescription);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(generateCard(item))
    },
  },
  placeContent,
);

cardList.renderItems();

function openPopupImage(name, link) {
  popupImage.open(name, link)
}

function generateCard(item) {
  return new Card(item.name, item.link, '#cards-template', openPopupImage).createCard()
}

function addCard({title, description}) {  
  const newCardItem = generateCard({
    name: title,
    link: description
  })
  cardList.addItem(newCardItem)
}

function saveProfile({name, description}) {
  user.setUserInfo(name, description);
}

editProfileButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupProfileForm.open();
  const profile = user.getUserInfo();
  inputName.value = profile.name;
  inputDescription.value = profile.description;
});

addPlaceButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupAddPlace.open();
  validatePlace.toggleButtonState();
});

