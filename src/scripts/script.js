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
const inviteContainer = document.getElementById("inviteContainer");
const inputContainer = document.getElementById("inputContainer");
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
  ],
  "Gustavo Family": ["Gustavo Yssak", "Leticia Yssak"],
  "Erika Family": ["Erica Mattos", "Maria Eduarda Salles"],
};

console.log(guest);

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", function () {
  guest = document.getElementById("guest").value;
  inputContainer.classList.toggle("displayOff");
  inviteContainer.classList.toggle("displayOff");
  document.getElementById("guestCall").innerText = guest;
  audioPlayer.play().then(() => {
    iconSpan.textContent = "🔊";
  });
});

// Birthday regressive count display

const aliceBirthdayDate = new Date("2025-12-14 14:00:00").getTime();

function actualizeCount() {
  const now = new Date().getTime();
  const difference = aliceBirthdayDate - now;
  if (difference < 0) {
    clearInterval(intervalID);
    return;
  }
  const daysLeft = Math.trunc(difference / (1000 * 60 * 60 * 24));
  console.log(daysLeft);
  return daysLeft;
}

const intervalID = setInterval(actualizeCount(), 1000);

document.getElementById("daysLeft").innerText = actualizeCount();
