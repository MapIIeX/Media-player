export const radioPlayerInit = () => {
    
    const radio = document.querySelector(".radio");
    const radioCoverImg = document.querySelector(".radio-cover__img");
    const radioHeaderBig = document.querySelector(".radio-header__big");
    const radioNavigation = document.querySelector(".radio-navigation");
    const radioItems = document.querySelectorAll(".radio-item");
    const radioStop = document.querySelector(".radio-stop");
    const radioVolume = document.querySelector(".radio-volume");
    
    const audio = new Audio();
    audio.type = "audio/aac";
    radioStop.disabled = true;

    const currentStation = item => {
        radioCoverImg.src = item.querySelector(".radio-img").src;
        radioHeaderBig.textContent = item.querySelector(".radio-name").textContent;
        radioItems.forEach(el => el.classList.remove("select"));
        item.classList.add("select");
    };

    const changeIcons = () => {
        if(audio.paused) {
            radio.classList.remove("play");
            radioStop.classList.remove("fa-stop");
            radioStop.classList.add("fa-play");
        } else {
            radio.classList.add("play");
            radioStop.classList.add("fa-stop");
            radioStop.classList.remove("fa-play");
        }
    };

    radioNavigation.addEventListener("change", event => {
        radioStop.disabled = false;

        const target = event.target;

        audio.src = target.dataset.radioStantion;
        audio.play();

        const parentNode = target.closest(".radio-item");
        currentStation(parentNode);
        changeIcons();
    });

    radioStop.addEventListener("click", () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", changeIcons);
    audio.addEventListener("pause", changeIcons);

    radioVolume.addEventListener("input", () => audio.volume = radioVolume.value);
};