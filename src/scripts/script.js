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

const audioPlayer = document.getElementById("music");
const musicButton = document.getElementById("musicToggleBtn");
const iconSpan = musicButton.querySelector("span");

let isPlaying = false;

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
