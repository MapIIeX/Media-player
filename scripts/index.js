import { videoPlayerInit } from "./videoPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { radioPlayerInit } from "./radioPlayer.js";

const playerBtns = document.querySelectorAll(".player-btn");
const playerBlocks = document.querySelectorAll(".player-block");
const temp = document.querySelector(".temp");

const disablePlayer = () => {
    temp.style.display = 'none';
    playerBtns.forEach((item) => item.classList.remove("active"));
    playerBlocks.forEach((item) => item.classList.remove("active"));
};

playerBtns.forEach((btn, i) => btn.addEventListener("click", () => {
    disablePlayer();
    btn.classList.add("active");
    playerBlocks[i].classList.add("active");
}));

videoPlayerInit(playerBtns);
musicPlayerInit(playerBtns);
radioPlayerInit(playerBtns);