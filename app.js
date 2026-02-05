const tg = window.Telegram.WebApp;
tg.expand();

const images = [
  "val1.png",
  "val2.png",
  "val3.png",
  "val5.png"
];

let currentIndex = 0;
let selectedImage = null;

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const app = document.getElementById("app");
const cardContainer = document.getElementById("card-container");
const sendBtn = document.getElementById("send-btn");

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  app.classList.remove("hidden");
  showCard();
};

function showCard() {
  cardContainer.innerHTML = "";

  const img = document.createElement("img");
  img.src = images[currentIndex];
  img.className = "card";

  cardContainer.appendChild(img);
  enableSwipeAndTap(img);
}

function enableSwipeAndTap(card) {
  let startX = 0;
  let startY = 0;
  let moved = false;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    moved = false;
  });

  card.addEventListener("touchmove", e => {
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;

    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      moved = true;
    }

    card.style.transform = `translateX(${dx}px) rotate(${dx / 15}deg)`;
  });

  card.addEventListener("touchend", () => {
    if (!moved) {
      // ✅ ТАП
      selectedImage = images[currentIndex];
      sendBtn.classList.remove("hidden");
      card.style.transform = "scale(0.95)";
      return;
    }

    // 👉 СВАЙП
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    showCard();
  });
}

sendBtn.onclick = () => {
  if (!selectedImage) return;

  tg.switchInlineQuery(
    "Валентинка 💌",
    { choose_chat_types: ["users"] }
  );
};
