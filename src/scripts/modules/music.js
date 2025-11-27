import { $audioPlayer, $musicButton, $iconSpan } from "../utils/dom.js";

let isPlaying = false;
let musicInitialized = false;

const toggleMusic = () => {
  if (!$audioPlayer || !$iconSpan) return;

  if (isPlaying) {
    $audioPlayer.pause();
    $iconSpan.textContent = "🔇";
    isPlaying = false;
  } else {
    $audioPlayer
      .play()
      .then(() => {
        $iconSpan.textContent = "🔊";
        isPlaying = true;
      })
      .catch((error) => {
        console.error("Erro ao iniciar a música:", error);
        $iconSpan.textContent = "🔇";
        isPlaying = false;
      });
  }
};

export function initMusic() {
  if (musicInitialized || !$musicButton || !$audioPlayer) return;

  const forcePlay = () => {
    $audioPlayer.currentTime = 0;

    $audioPlayer
      .play()
      .then(() => {
        console.log("✅ Música iniciada com sucesso!");
        isPlaying = true;
        if ($iconSpan) $iconSpan.textContent = "🔊";
      })
      .catch((error) => {
        console.warn(
          "⚠️ Primeira tentativa falhou, tentando novamente...",
          error
        );

        setTimeout(() => {
          $audioPlayer
            .play()
            .then(() => {
              isPlaying = true;
              if ($iconSpan) $iconSpan.textContent = "🔊";
            })
            .catch(() => {
              console.error("❌ Autoplay bloqueado - use o botão");
              isPlaying = false;
              if ($iconSpan) $iconSpan.textContent = "🔇";
            });
        }, 100);
      });
  };

  forcePlay();

  $musicButton.addEventListener("click", toggleMusic);
  musicInitialized = true;
}
