// Music display

const audioPlayer = document.getElementById("music");
const musicButton = document.getElementById("musicToggleBtn");
const iconSpan = musicButton.querySelector("span");

let isPlaying = true;

musicButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    iconSpan.textContent = "🔇";
  } else {
    audioPlayer
      .play()
      .then(() => {
        iconSpan.textContent = "🔊";
      })
      .catch((error) => {
        console.error("Erro ao iniciar a música:", error);
      });
  }

  isPlaying = !isPlaying;
});

// Guest display

let guest = "";

// Guests database

const listOfGuests = {
  "Erica Beta family": [
    "Luisa Pimentel",
    "Erica Pimentel",
    "Luan Pimentel",
    "Cleuza Pimentel",
    "Adriano",
  ],
  "Alexandre Family": [
    "Alexandre Cerqueira",
    "Lisiane Moura",
    "Bruna Lia Cerqueira",
    "Artur",
  ],
  "Andrea Family": [
    "Andrea Cerqueira",
    "Marco Vidal",
    "Beatriz Vidal",
    "Neuza Pereira",
    "Fabyolla Vidal",
  ],
  "Gustavo family": [
    "Gustavo Yssak",
    "Leticia Yssak",
    "Lucas",
    "Lucas Miguel",
    "Maria",
  ],
  "Denise family": ["Denise Yssak", "Ana Licia"],
  "Erica family": ["Erica Matos", "Maria Eduarda Salles"],
  "Erick family": [
    "Erick Teixeira",
    "Erika Teixeira",
    "Vinicius Teixeira",
    "Adriano",
    "Gabriel Teixeira",
    "Ana Paula Teixeira",
    "Giovana Teixeira",
    "Guilherme Teixeira",
  ],
  "Phelippe family": [
    "Phelippe Toledo",
    "Janete Chaves",
    "Enrico Toledo",
    "Regina Caetano",
  ],
  "Alan family": ["Alan Silva", "Erika Silva"],
  "Saci family": [
    "Emerson Domingos",
    "Adriana Santos",
    "Gabriel Paulino",
    "Richard Benite",
    "Daiane Caroline",
    "Valentina Magalhães",
  ],
  "Yuri family": ["Yuri Vidal"],
  "Rogerio family": ["Rogerio Rodrigues"],
  "Caue family": ["Caue", "Lara"],
  "Stephanie family": ["Stephanie Gomes", "Wallacy Sant'anna"],
  "Elizabete family": ["Elizabete Matos", "Annibal Ramos"],
  "Chagas family": [
    "Francisco Chagas",
    "Benjamin Telles",
    "Elila Medeiros",
    "Dafne Telles",
  ],
};

// Elements

const inputContainer = document.getElementById("inputContainer");
const guestSelectContainer = document.getElementById("guestSelectName");
const inviteContainer = document.getElementById("inviteContainer");
const familySection = document.getElementById("familyConfirmation");

guestSelectContainer.classList.add("displayOff");

const submitButton = document.getElementById("submitButton");
const guestInput = document.getElementById("guest");
const guestSelectBox = document.getElementById("guestSelectBox");
const confirmSelectedNameBtn = document.getElementById("confirmSelectedName");
const familyConfirmation = document.getElementById("familyConfirmation");
const confirmationSucessfull = document.getElementById(
  "confirmationSucessfull"
);
const returnButton = document.getElementById("returnButton");
// Guest name filter

submitButton.addEventListener("click", () => {
  const typedName = guestInput.value.trim().toLowerCase();
  if (!typedName) return;

  const filteredResults = [];

  for (const family in listOfGuests) {
    listOfGuests[family].forEach((person) => {
      if (person.toLowerCase().includes(typedName)) {
        filteredResults.push({ name: person, family: family });
      }
    });
  }
  if (filteredResults.length === 0) {
    alert("Nome não encontrado. Verifique se digitou corretamente!");
    return;
  }

  inputContainer.classList.add("displayOff");
  guestSelectContainer.classList.remove("displayOff");

  guestSelectBox.innerHTML = "";
  filteredResults.forEach((result) => {
    const option = document.createElement("option");
    // O valor da option é um JSON string contendo { name: "Nome Completo", family: "Nome da Família" }
    option.value = JSON.stringify(result);
    option.textContent = result.name;
    guestSelectBox.appendChild(option);
  });
});

confirmSelectedNameBtn.addEventListener("click", () => {
  const selectedData = JSON.parse(guestSelectBox.value);
  const userName = selectedData.name; // Já é a string do nome completo!
  // const userNameDisplay = userName.split(" "); // Não precisamos disso se usarmos a string completa.
  const userFamily = selectedData.family;

  guestSelectContainer.classList.add("displayOff");
  inviteContainer.classList.remove("displayOff");

  // Usamos apenas o primeiro nome para a saudação, mas a variável global armazena o nome completo
  document.getElementById("guestCall").innerText = userName.split(" ")[0];

  audioPlayer.play().then(() => {
    iconSpan.textContent = "🔊";
  });

  // *** MODIFICAÇÃO CHAVE: window.selectedGuest é agora a string completa do nome. ***
  window.selectedGuest = userName;
  window.selectedFamily = userFamily;
});

const confirmButton = document.getElementById("confirmation");

confirmButton.addEventListener("click", () => {
  const familyListDiv = document.getElementById("familyList");
  const family = window.selectedFamily;
  const mainGuest = window.selectedGuest;
  const familyMembers = listOfGuests[family];
  console.log(familyMembers);

  if (familyMembers.length > 1) {
    familyWithNoGuest = familyMembers.filter(
      (person) => person !== mainGuest // Remove o convidado principal da lista
    );

    inviteContainer.classList.add("displayOff");
    familyListDiv.innerHTML = "";

    // Itera apenas sobre os membros restantes da família
    familyWithNoGuest.forEach((person) => {
      const id = `fam_${person.replace(/\s+/g, "_")}`;

      const box = `
      <label>
        <input type="checkbox" value="${person}" id="${id}">
        ${person}
      </label><br>
    `;

      familyListDiv.insertAdjacentHTML("beforeend", box);
    });
    inviteContainer.classList.add("displayOff");
    familySection.classList.remove("displayOff");
  } else {
    const user = window.selectedGuest;
    const boxes = document.querySelectorAll("#familyList input[type=checkbox]");
    let confirmed = [user];
    boxes.forEach((box) => {
      if (box.checked) confirmed.push(box.value);
    });
    const payload = {
      // Payload Simplificado:
      ListaConfirmados: confirmed.join(", "), // Converte o array ordenado para uma string
      Timestamp: new Date().toISOString(),
    };

    // ATENÇÃO: SUBSTITUA PELA URL PÚBLICA DO SEU SERVIÇO NO RENDER
    fetch("https://alice-birthday.onrender.com/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.text())
      .then((msg) => {
        alert("Confirmação enviada!");
        inviteContainer.classList.add("displayOff");
        confirmationSucessfull.classList.remove("displayOff");
      })
      .catch((err) => alert("Erro ao enviar confirmação"));
  }
});

returnButton.addEventListener("click", () => {
  inviteContainer.classList.remove("displayOff");
  confirmationSucessfull.classList.add("displayOff");
  confirmButton.classList.add("displayOff");
});

// script.js (NOVO TRECHO para o sendBtn)

const sendBtn = document.getElementById("sendConfirmation");

sendBtn.addEventListener("click", () => {
  const user = window.selectedGuest;
  const boxes = document.querySelectorAll("#familyList input[type=checkbox]");
  let confirmed = [user]; // Usa 'let' para permitir a modificação
  boxes.forEach((box) => {
    if (box.checked) confirmed.push(box.value);
  });

  // *** AÇÃO PRINCIPAL: ORDENAR ALFABETICAMENTE ***
  confirmed.sort(); // Ordena a lista

  const payload = {
    // Payload Simplificado:
    ListaConfirmados: confirmed.join(", "), // Converte o array ordenado para uma string
    Timestamp: new Date().toISOString(),
  };

  // ATENÇÃO: SUBSTITUA PELA URL PÚBLICA DO SEU SERVIÇO NO RENDER
  fetch("https://alice-birthday.onrender.com/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((r) => r.text())
    .then((msg) => {
      alert("Confirmação enviada!");
      familySection.classList.add("displayOff");
      confirmationSucessfull.classList.remove("displayOff");
    })
    .catch((err) => alert("Erro ao enviar confirmação"));
});

// Regressive count

const aliceBirthdayDate = new Date("2025-12-14 14:00:00").getTime();

function actualizeCount() {
  const now = Date.now();
  const diff = aliceBirthdayDate - now;

  if (diff < 0) return 0;

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

setInterval(() => {
  // Use um setTimeout inicial para evitar esperar um segundo para a primeira atualização
  document.getElementById("daysLeft").innerText = actualizeCount();
}, 1000);
