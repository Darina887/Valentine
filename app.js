const tg = window.Telegram.WebApp;
tg.expand();

const images = [
  "val1.png",
  "val2.png",
  "val3.png",
  "val4.png",
  "val5.png"
];

let currentIndex = 0;
let selectedImage = null;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
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
  enableSwipe(img);
}

function enableSwipe(card) {
  let startX = 0;
  let currentX = 0;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  card.addEventListener("touchmove", e => {
    currentX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
  });

  card.addEventListener("touchend", () => {
    if (Math.abs(currentX) > 100) {
      selectedImage = images[currentIndex];
      sendBtn.classList.remove("hidden");
    } else {
      card.style.transform = "";
    }
    currentX = 0;
  });
}

sendBtn.onclick = () => {
  tg.switchInlineQuery(
    `Валентинка ❤️`,
    {
      choose_chat_types: ["users"]
    }
  );
};
