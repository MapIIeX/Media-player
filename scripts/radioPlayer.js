export const radioPlayerInit = btns => {
    
    const radio = document.querySelector(".radio");
    const radioCoverImg = document.querySelector(".radio-cover__img");
    const radioHeaderBig = document.querySelector(".radio-header__big");
    const radioNavigation = document.querySelector(".radio-navigation");
    const radioItems = document.querySelectorAll(".radio-item");
    const radioStop = document.querySelector(".radio-stop");
    const radioVolume = document.querySelector(".radio-volume");
    const radioVolumeButton = document.querySelector(".radio-volume__button");
    
    const currentStation = item => {
        radioCoverImg.src = item.querySelector(".radio-img").src;
        radioHeaderBig.textContent = item.querySelector(".radio-name").textContent;
        radioItems.forEach(el => el.classList.remove("select"));
        item.classList.add("select");
    };
    
    const changePlayIcons = () => {
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

    const changeVolume = () => {
        audio.volume = radioVolume.value;
        if(audio.volume === 0) {
            radioVolumeButton.textContent = "🔇";
        } else {
            radioVolumeButton.textContent = "🔊";
        }
    };

    const muteSound = () => {
        if(memorisedVolume && !audio.volume) {
            radioVolumeButton.textContent = "🔊";
            audio.volume = memorisedVolume;
            radioVolume.value = memorisedVolume;
        } else {
            radioVolumeButton.textContent = "🔇";
            memorisedVolume = audio.volume;
            audio.volume = '0';
            radioVolume.value = '0';
        }
    };
    
    const audio = new Audio();
    audio.type = "audio/aac";
    radioStop.disabled = true;
    let memorisedVolume;
    
    radioNavigation.addEventListener("change", event => {
        radioStop.disabled = false;

        const target = event.target;

        audio.src = target.dataset.radioStantion;
        audio.play();

        const parentNode = target.closest(".radio-item");
        currentStation(parentNode);
        changePlayIcons();
    });

    radioStop.addEventListener("click", () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", changePlayIcons);
    audio.addEventListener("pause", changePlayIcons);

    radioVolume.addEventListener("input", changeVolume);
    radioVolumeButton.addEventListener("click", muteSound);

    // заглушение при клике на другую вкладку
    btns.forEach(element => {
        if (!element.classList.contains("player-radio")) {
            element.addEventListener("click", () => {
                audio.pause();
            });
        }
    });
};