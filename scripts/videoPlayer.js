import {
    addZero
} from "./supScript.js";

export const disableVideoPlayer = btns => {
    // заглушение при клике на другую вкладку
    const videoPlayer = document.querySelector(".video-player");
    const videoNavigation = document.querySelector(".video-navigation");

    btns.forEach(element => {
        if (!element.classList.contains("player-video")) {
            element.addEventListener("click", () => {
                videoPlayer.pause();
            });
        } else {
            videoNavigation.style.bottom = 0;
        }
    });
};

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector(".video-player");
    const videoButtonPlay = document.querySelector(".video-button__play");
    const videoButtonStop = document.querySelector(".video-button__stop");
    const videoProgress = document.querySelector(".video-progress");
    const videoTimePassed = document.querySelector(".video-time__passed");
    const videoTimeTotal = document.querySelector(".video-time__total");
    const playerVideo = document.querySelector(".player-video");
    const videoVolumeButton = document.querySelector(".video-volume__button");
    const videoVolume = document.querySelector(".video-volume");
    const videoButtonFullscreen = document.querySelector(".video-button__fullscreen");
    const videoContainer = document.querySelector(".video-container");
    const videoBlock = document.querySelector(".video");
    const videoNavigation = document.querySelector(".video-navigation");

    const toggleIcon = () => {
        videoButtonPlay.classList.toggle("fa-play");
        videoButtonPlay.classList.toggle("fa-pause");
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const changeVolumeIcon = () => {
        const volume = videoPlayer.volume;
        if (volume === 0) {
            videoVolumeButton.style.backgroundImage = `url("../image/${volumeStates[0]}.svg")`;
        } else if (volume < 0.25 && volume > 0) {
            videoVolumeButton.style.backgroundImage = `url("../image/${volumeStates[1]}.svg")`;
        } else if (volume < 0.75 && volume >= 0.25) {
            videoVolumeButton.style.backgroundImage = `url("../image/${volumeStates[2]}.svg")`;
        } else if (volume <= 1 && volume >= 0.75) {
            videoVolumeButton.style.backgroundImage = `url("../image/${volumeStates[3]}.svg")`;
        }
    };

    const fullScreenMode = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoBlock.requestFullscreen();
        }
    };

    const makeResponsive = () => {
        const container = videoContainer.parentNode;

        if (document.fullscreenElement) {
            videoButtonFullscreen.style.backgroundImage = 'url("../image/not_fullscreen.svg")';
            videoContainer.style.position = "unset";
            videoContainer.style.maxWidth = "unset";
            container.classList.remove("container");
            videoPlayer.style.height = Math.round(window.screen.availWidth / 16 * 9) + "px";
            hideControls();
        } else {
            videoButtonFullscreen.style.backgroundImage = 'url("../image/fullscreen.svg")';
            videoContainer.style.position = "relative";
            videoContainer.style.maxWidth = "800px";
            container.classList.add("container");
            videoPlayer.style.height = Math.round(videoContainer.clientWidth / 16 * 9) + "px";
            showControls();
        }
    };

    const resize = () => {
        if (document.fullscreenElement) {
            videoPlayer.style.height = Math.round(window.screen.availWidth / 16 * 9) + "px";
        } else {
            setTimeout(() => {
                videoPlayer.style.height = Math.round(videoContainer.clientWidth / 16 * 9) + "px";
            }, 40);
        }
    };

    const hideControls = () => {
        if (!videoPlayer.paused) {
            setTimeout(() => {
                videoNavigation.classList.add("navigation-hidden");
                videoContainer.classList.add("cursor-hidden");
                videoPlayer.style.cursor = "none";
            }, 3500);
        }

    };

    const showControls = () => {
        videoNavigation.classList.remove("navigation-hidden");
        videoContainer.classList.remove("cursor-hidden");
        videoPlayer.style.cursor = "pointer";
    };

    const volumeStates = ["mute-volume", "volume_0", "volume_1", "volume_2"];
    let tempVolume = 0;

    videoPlayer.addEventListener("click", togglePlay);
    videoButtonPlay.addEventListener("click", togglePlay);

    videoPlayer.addEventListener("pause", toggleIcon);
    videoPlayer.addEventListener("play", toggleIcon);

    videoButtonStop.addEventListener("click", stopPlay);

    videoPlayer.addEventListener("timeupdate", () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        const minutesTotal = Math.floor(duration / 60);
        const secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener("input", () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoVolume.addEventListener("input", () => {
        videoPlayer.volume = videoVolume.value;
        changeVolumeIcon();
    });

    videoVolumeButton.addEventListener("click", () => {
        if (videoPlayer.volume) {
            tempVolume = videoPlayer.volume;
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = tempVolume;
        }
        videoVolume.value = videoPlayer.volume;
        changeVolumeIcon();
    });

    videoButtonFullscreen.addEventListener("click", fullScreenMode);
    videoPlayer.addEventListener("dblclick", fullScreenMode);
    videoBlock.addEventListener("fullscreenchange", makeResponsive);
    window.addEventListener("orientationchange", resize);

    // events for hiding nav
    videoPlayer.addEventListener("play", hideControls);
    videoPlayer.addEventListener("pause", showControls);
    videoPlayer.addEventListener("mousemove", showControls);
    videoPlayer.addEventListener("mouseleave", hideControls);
    videoNavigation.addEventListener("mousemove", showControls);

    window.addEventListener("keydown", event => {
        if (event.code === "Space" && playerVideo.classList.contains("active") && document.hasFocus()) {
            togglePlay();
        }
    });
};