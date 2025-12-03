import { show, hide, sendingButtonText } from "./utils/dom.js";
import {
  $guestCall,
  $inputContainer,
  $guestInput,
  $guestInputButton,
  $inviteMainContainer,
  $familySection,
  $confirmationSuccessfull,
  $returnButton,
  $guestSelectContainer,
  $guestSelectBox,
  $confirmSelectedNameBtn,
  $confirmButton,
  $familyListDiv,
  $sendFamilyConfirmation,
} from "./utils/dom.js";
import { listOfGuests, RENDER_URL, normalizeString } from "./utils/data.js";
import { initMusic } from "./modules/music.js";
import { initCountdown } from "./modules/countdown.js";

const appState = {
  selectedGuest: null,
  selectedFamily: null,
};

const CONFIG = {
  MESSAGES: {
    NAME_NOT_FOUND: "Nome não encontrado. Verifique se digitou corretamente!",
    EMPTY_INPUT: "Por favor, digite um nome para buscar.",
    WAIT_CONFIRMATION: "Aguarde enquanto enviamos sua confirmação...",
    SUCCESS: "Confirmação enviada com sucesso!",
    ERROR: "Erro ao enviar confirmação. Tente novamente.",
  },
};

function showNotification(message, type = "info") {
  alert(message);
  console.log(`[${type.toUpperCase()}]`, message);
}

function searchGuest() {
  const typedName = normalizeString($guestInput.value.trim());

  if (!typedName) {
    showNotification(CONFIG.MESSAGES.EMPTY_INPUT, "warning");
    return;
  }

  const filteredResults = [];

  for (const family in listOfGuests) {
    listOfGuests[family].forEach((person) => {
      if (normalizeString(person).includes(typedName)) {
        filteredResults.push({ name: person, family: family });
      }
    });
  }

  if (filteredResults.length === 0) {
    showNotification(CONFIG.MESSAGES.NAME_NOT_FOUND, "error");
    return;
  }

  hide($inputContainer);
  show($guestSelectContainer);

  renderGuestOptions(filteredResults);
}

function renderGuestOptions(results) {
  $guestSelectBox.innerHTML = "";
  results.forEach((result) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(result);
    option.textContent = result.name;
    $guestSelectBox.appendChild(option);
  });
}

function confirmSelectedGuest() {
  const selectedGuest = JSON.parse($guestSelectBox.value);

  appState.selectedGuest = selectedGuest.name;
  appState.selectedFamily = selectedGuest.family;

  $guestCall.innerText = selectedGuest.name.split(" ")[0];

  hide($guestSelectContainer);
  show($inviteMainContainer);
  initMusic();
}

function confirmPresence() {
  const familyMembers = listOfGuests[appState.selectedFamily];
  $confirmButton.disabled = true;
  $confirmButton.innerHTML = sendingButtonText;

  if (familyMembers.length > 1) {
    renderFamilySelection(familyMembers);
    hide($inviteMainContainer);
    show($familySection);
  } else {
    sendConfirmation([appState.selectedGuest]);
  }
}

function renderFamilySelection(familyMembers) {
  const familyWithNoGuest = familyMembers.filter(
    (person) => person !== appState.selectedGuest
  );

  $familyListDiv.innerHTML = "";

  familyWithNoGuest.forEach((person) => {
    const id = `fam_${person.replace(/\s+/g, "_")}`;
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = person;
    checkbox.id = id;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${person}`));
    label.appendChild(document.createElement("br"));

    $familyListDiv.appendChild(label);
  });
}

function confirmFamilyPresence() {
  const boxes = document.querySelectorAll("#familyList input[type=checkbox]");
  const confirmed = [appState.selectedGuest];
  $sendFamilyConfirmation.disabled = true;
  $sendFamilyConfirmation.innerHTML = sendingButtonText;

  boxes.forEach((box) => {
    if (box.checked) confirmed.push(box.value);
  });

  sendConfirmation(confirmed);
}

async function sendConfirmation(confirmedGuests) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "force-wait-cursor";
  styleSheet.innerHTML = "* { cursor: wait !important; }";
  document.head.appendChild(styleSheet);

  showNotification(CONFIG.MESSAGES.WAIT_CONFIRMATION, "info");

  const now = new Date();

  const pad = (num) => (num < 10 ? "0" + num : num);

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  const formattedTimestamp = `${day}/${month}/${year}, ${hours}:${minutes}`;

  const payload = {
    ListaConfirmados: confirmedGuests.sort().join(", "),
    Timestamp: formattedTimestamp,
  };

  try {
    const response = await fetch(RENDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    await response.text();

    showNotification(CONFIG.MESSAGES.SUCCESS, "success");
    hide($inviteMainContainer);
    hide($familySection);
    show($confirmationSuccessfull);
  } catch (error) {
    console.error("Erro ao enviar confirmação:", error);
    showNotification(CONFIG.MESSAGES.ERROR, "error");
  } finally {
    const styleToRemove = document.getElementById("force-wait-cursor");
    if (styleToRemove) {
      styleToRemove.remove();
    }
  }
}

function returnButton() {
  show($inviteMainContainer);
  hide($confirmationSuccessfull);
  hide($confirmButton);
}

// Event listeners
$guestInputButton.addEventListener("click", searchGuest);
$confirmSelectedNameBtn.addEventListener("click", confirmSelectedGuest);
$confirmButton.addEventListener("click", confirmPresence);
$sendFamilyConfirmation.addEventListener("click", confirmFamilyPresence);
$returnButton.addEventListener("click", returnButton);

$guestInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchGuest();
});

initCountdown();
