const setUpValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
 };

 const enableValidation = (setUpValidation) => {
    const forms = document.querySelectorAll(setUpValidation.formSelector);
    forms.forEach(form => form.addEventListener('submit', function(evt){
       evt.preventDefault();      
    }));
    forms.forEach(form => setEventListeners(form))
 };
  
 
 const showInputError = (form, input, message) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.textContent = message;
    input.classList.add(setUpValidation.inputErrorClass);
 };
  
 const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(setUpValidation.inputErrorClass);
 }
  
 const checkValidity = (form, input) => {
    if (input.validity.valid) {
       hideInputError(form, input)
    } else {
       showInputError(form, input, input.validationMessage)
    };
 };
  
 const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll(setUpValidation.inputSelector));
    const formButton = form.querySelector(setUpValidation.submitButtonSelector);
    toggleButtonState (inputList, formButton);
    
    inputList.forEach(input => input.addEventListener('input', function() {
       checkValidity(form, input);
       toggleButtonState (inputList, formButton);
    }));
 };

 function noValidInput(inputList) {
    return inputList.some(inputList => !inputList.validity.valid);
 }
  
 function toggleButtonState (inputList, formButton) {
    if (inputList === [] || formButton === null) {
       return
    };
    if (noValidInput(inputList)) {
       formButton.setAttribute('disabled', true)
       formButton.classList.add(setUpValidation.inactiveButtonClass)
    } else {
       formButton.removeAttribute('disabled', true)
       formButton.classList.remove(setUpValidation.inactiveButtonClass)
    };
 };
 enableValidation(setUpValidation);