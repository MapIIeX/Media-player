import {addZero} from "./supScript.js";

export const musicPlayerInit = btns => {

    const audio = document.querySelector(".audio");
    const audioPlayer = document.querySelector(".audio-player");
    const audioImg = document.querySelector(".audio-img");
    const audioButtonPlay = document.querySelector(".audio-button__play");
    const audioHeader = document.querySelector(".audio-header");
    const audioNavigation = document.querySelector(".audio-navigation");
    const audioTimePassed = document.querySelector(".audio-time__passed");
    const audioTimeTotal = document.querySelector(".audio-time__total");
    const audioProgress = document.querySelector(".audio-progress");
    const audioProgressTiming = document.querySelector(".audio-progress__timing");

    const playList = ["hello", "flow", "speed"];

    let trackIndex = 0;

    const loadSong = () => {
        const isPlayed = audioPlayer.paused;
        audioPlayer.src = `./audio/${playList[trackIndex]}.mp3`;
        audioImg.src = `./audio/${playList[trackIndex]}.jpg`;
        audioHeader.textContent = playList[trackIndex].toUpperCase();
        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevSong = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        loadSong();
    };

    const nextSong = () => {
        if (trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadSong();
    };

    audioNavigation.addEventListener("click", event => {
        const target = event.target;

        if (target.classList.contains("audio-button__play")) {
            audio.classList.toggle("play");
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            audioImg.src = `./audio/${playList[trackIndex]}.jpg`;
            audioHeader.textContent = playList[trackIndex].toUpperCase();
        }

        if (target.classList.contains("audio-button__prev")) {
            prevSong();
        }
        if (target.classList.contains("audio-button__next")) {
            nextSong();
        }
    });

    audioPlayer.addEventListener("ended", () => {
        nextSong();
        audioPlayer.play();
    });

    audioPlayer.addEventListener("timeupdate", () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;

        const minutesPassed = Math.floor(currentTime / 60) || 0;
        const secondsPassed = Math.floor(currentTime % 60) || 0;

        const minutesTotal = Math.floor(duration / 60) || 0;
        const secondsTotal = Math.floor(duration % 60) || 0;

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
               
        audioProgressTiming.style.width = (currentTime / duration) * 100 + "%";
    });

    audioProgress.addEventListener("click", event => {
        const x = event.offsetX;
        const fullWidth = event.target.clientWidth;
        audioProgressTiming.style.width = (x / fullWidth) * 100 + "%";
        audioPlayer.currentTime = (x / fullWidth) * audioPlayer.duration;
    });

    // заглушение при клике на другую вкладку
    btns.forEach(element => {
        if (!element.classList.contains("player-audio")) {
            element.addEventListener("click", () => {
                if(!audioPlayer.paused) {
                    audio.classList.toggle("play");
                    audioButtonPlay.classList.toggle("fa-play");
                    audioButtonPlay.classList.toggle("fa-pause");
                }
                audioPlayer.pause();
            });
        }
    });
};