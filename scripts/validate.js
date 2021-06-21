const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
 };
 
const showInputError = (form, input, message) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = message;
    input.classList.add(validationConfig.inputErrorClass);
 };
  
const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(validationConfig.inputErrorClass);
 }
  
const checkValidity = (form, input) => {
    if (input.validity.valid) {
       hideInputError(form, input)
    } else {
       showInputError(form, input, input.validationMessage)
    };
 };

function checkValidation (popup) {
    const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));
    const formButton = popup.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState (inputList, formButton);
  };
  
const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const formButton = form.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState (inputList, formButton);
    
    inputList.forEach(input => input.addEventListener('input', function() {
       checkValidity(form, input);
       toggleButtonState (inputList, formButton);
    }));
 };

const enableValidation = (validationConfig) => {
    const forms = document.querySelectorAll(validationConfig.formSelector);
    forms.forEach((form) => {
       form.addEventListener('submit', function(evt){
       evt.preventDefault();
       })
       forms.forEach(form => setEventListeners(form))      
    });
 }; 

function noValidInput(inputList) {
    return inputList.some(inputList => !inputList.validity.valid);
 }
  
function toggleButtonState (inputList, formButton) {
    if (inputList === [] || formButton === null) {
       return
    };
    if (noValidInput(inputList)) {
       formButton.classList.add(validationConfig.inactiveButtonClass)
       formButton.setAttribute('disabled', 'disabled')
    } else {
       formButton.classList.remove(validationConfig.inactiveButtonClass)
       formButton.disabled = '';
    };
 };
 
 enableValidation(validationConfig);