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
  "Alexandre Family": [
    "Alexandre Cerqueira",
    "Lisiane Moura",
    "Bruna Lia Cerqueira",
  ],
  "Andrea Family": [
    "Andrea Cerqueira",
    "Marco Vidal",
    "Beatriz Vidal",
    "Neuza Pereira",
    "Fabyolla Vidal",
  ],
  "Gustavo Family": ["Gustavo Yssak", "Leticia Yssak", "Denise Yssak"],
  "Erica Family": ["Erica Mattos", "Maria Eduarda Salles"],
  "Erick family": [
    "Erick Teixeira",
    "Erika Teixeira",
    "Vinicius Teixeira",
    "Adriano",
    "Gabriel Teixeira",
    "Ana Paula Teixeira",
  ],
  "Phelippe family": ["Phelippe Toledo", "Janete Chaves", "Enrico Toledo"],
  "Alan family": ["Alan Silva", "Erika Silva"],
};

// Elements

const inputContainer = document.getElementById("inputContainer");
const guestSelectContainer = document.getElementById("guestSelectName");
const inviteContainer = document.getElementById("inviteContainer");

guestSelectContainer.classList.add("displayOff");

const submitButton = document.getElementById("submitButton");
const guestInput = document.getElementById("guest");
const guestSelectBox = document.getElementById("guestSelectBox");
const confirmSelectedNameBtn = document.getElementById("confirmSelectedName");

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
  const familySection = document.getElementById("familyConfirmation");
  const familyListDiv = document.getElementById("familyList");

  const family = window.selectedFamily;
  const mainGuest = window.selectedGuest; // Pega o nome do convidado principal

  // Filtra a lista completa de convidados da família
  const familyMembers = listOfGuests[family].filter(
    (person) => person !== mainGuest // Remove o convidado principal da lista
  );

  inviteContainer.classList.add("displayOff");
  familyListDiv.innerHTML = "";

  // Itera apenas sobre os membros restantes da família
  familyMembers.forEach((person) => {
    const id = `fam_${person.replace(/\s+/g, "_")}`;

    const box = `
      <label>
        <input type="checkbox" value="${person}" id="${id}">
        ${person}
      </label><br>
    `;

    familyListDiv.insertAdjacentHTML("beforeend", box);
  });

  familySection.classList.remove("displayOff");
});

const sendBtn = document.getElementById("sendConfirmation");

sendBtn.addEventListener("click", () => {
  // 'user' agora é a string completa do nome principal
  const user = window.selectedGuest;
  const family = window.selectedFamily;
  const boxes = document.querySelectorAll("#familyList input[type=checkbox]");

  // O array 'confirmed' começa com a string completa do convidado principal.
  const confirmed = [user];
  boxes.forEach((box) => {
    if (box.checked) confirmed.push(box.value);
  });

  const payload = {
    mainGuest: user,
    familyName: family,
    confirmedList: confirmed,
    timestamp: new Date().toISOString(),
  };

  fetch("http://localhost:3000/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((r) => {
      if (!r.ok) {
        throw new Error("Resposta do servidor não foi OK");
      }
      return r.text();
    })
    .then((msg) => alert("Confirmação enviada com sucesso!"))
    .catch((err) => {
      console.error(err);
      alert(
        "Erro ao enviar confirmação. Verifique o console ou se o servidor Node.js está rodando."
      );
    });
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
}, 1000); // 1000ms (1 segundo) é muito frequente. Um intervalo de 60000ms (1 minuto) seria suficiente para dias, mas manterei 1000ms para consistência.
