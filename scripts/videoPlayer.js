export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector(".video-player");      
    const videoButtonPlay = document.querySelector(".video-button__play");
    const videoButtonStop = document.querySelector(".video-button__stop");
    const videoProgress = document.querySelector(".video-progress");
    const videoTimePassed = document.querySelector(".video-time__passed");
    const videoTimeTotal = document.querySelector(".video-time__total");
    const playerVideo = document.querySelector(".player-video");

    const toggleIcon = () => {
        videoButtonPlay.classList.toggle("fa-play");
        videoButtonPlay.classList.toggle("fa-pause");
    };

    const togglePlay = () => {
        if(videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const formatDate = n => n < 10 ? `0${n}` : n;

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

        videoTimePassed.textContent = `${formatDate(minutesPassed)}:${formatDate(secondsPassed)}`;
        videoTimeTotal.textContent = `${formatDate(minutesTotal)}:${formatDate(secondsTotal)}`;
    });

    videoProgress.addEventListener("change", () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    window.addEventListener("keydown", event => {
        if(event.code === "Space" && playerVideo.classList.contains("active")) {
            togglePlay();
        }
    });
};