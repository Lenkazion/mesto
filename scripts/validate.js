const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
 };

 const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(enableValidation.inputErrorClass);
 };
 
 const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(enableValidation.inputErrorClass);
 }

 const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
     showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
     hideInputError(formElement, inputElement)
       
    };
 };

 const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    const formButton = formElement.querySelector(enableValidation.submitButtonSelector);
    toggleButtonState (inputList, formButton);
 
    inputList.forEach(inputElement => 
       inputElement.addEventListener('input', function() {
       isValid(formElement, inputElement);
       toggleButtonState (inputList, formButton);
    }))
 };

 const setValidation = (enableValidation) => {
    const forms = Array.from(document.querySelectorAll(enableValidation.formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt){
       evt.preventDefault();      
    })
    forms.forEach(formElement => setEventListeners(formElement));
    })
}

 function noValidInput(inputList) {
    return inputList.some((inputList) => !inputList.validity.valid);

};

 function toggleButtonState (inputList, formButton) {
     if (noValidInput(inputList)) {
        formButton.setAttribute('disabled', true)
        formButton.classList.add(enableValidation.inactiveButtonClass)
     } else {
        formButton.removeAttribute('disabled', true)
        formButton.classList.remove(enableValidation.inactiveButtonClass)
     };
 }

 setValidation(enableValidation);