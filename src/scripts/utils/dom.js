export const show = (element) =>
  element && element.classList.remove("displayOff");
export const hide = (element) => element && element.classList.add("displayOff");
export const sendingButtonText = '<span class="spinner"></span> Enviando...';

// dom ref
export const $audioPlayer = document.getElementById("music");
export const $musicButton = document.getElementById("musicToggleBtn");
export const $iconSpan = $musicButton
  ? $musicButton.querySelector("span")
  : null;
export const $guestCall = document.getElementById("guestCall");
export const $daysLeft = document.getElementById("daysLeft");

// containers
export const $inputContainer = document.getElementById("inputContainer");
export const $guestSelectContainer = document.getElementById("guestSelectName");
export const $inviteMainContainer = document.getElementById(
  "inviteMainContainer"
);
export const $familySection = document.getElementById("familyConfirmation");
export const $confirmationSuccessfull = document.getElementById(
  "confirmationSucessfull"
);

// buttons
export const $guestInputButton = document.getElementById("guestInputButton");
export const $guestSelectBox = document.getElementById("guestSelectBox");
export const $confirmSelectedNameBtn = document.getElementById(
  "confirmSelectedName"
);
export const $confirmButton = document.getElementById("confirmation");
export const $sendFamilyConfirmation = document.getElementById(
  "sendFamilyConfirmation"
);
export const $returnButton = document.getElementById("returnButton");
export const $familyListDiv = document.getElementById("familyList");
export const $guestInput = document.getElementById("guestInput");
