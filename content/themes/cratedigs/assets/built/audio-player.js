const streamOne = new Audio(
    "https://cratedigs.radioca.st/stream"
);

const streamTwo = new Audio(
    "https://cratedigsTwo.radioca.st/stream"
);

//toggle between playing and pausing on button click
// This all needs massive refinement

$("#volume").slider({
    min: 0,
    max: 100,
    value: 50,
    range: "min",
    slide: function(event, ui) {
        setVolume(ui.value / 100);
    }
});

function setVolume(myVolume) {
    streamOne.volume = myVolume;
}

const playBtnOne = document.getElementById("play-one");
const playBtnTwo = document.getElementById("play-two");

function playStreamOne() {
    playBtnOne.classList.remove("play");
    playBtnOne.classList.add("pause", "playing");
    streamOne.play();
}

function playStreamTwo() {
    playBtnTwo.classList.remove("play");
    playBtnTwo.classList.add("pause", "playing");
    streamTwo.play();
}

function pauseStreamOne() {
    streamOne.pause();
    playBtnOne.classList.remove("pause", "playing");
    playBtnOne.classList.add("play");
}

function pauseStreamTwo() {
    streamTwo.pause();
    playBtnTwo.classList.remove("pause", "playing");
    playBtnTwo.classList.add("play");
}

function playStates(thisClick) {


    if (thisClick === "play-one") {
        if (document.getElementById(thisClick).classList.contains("playing")) {
            pauseStreamOne();
            return
        } else {
            if (!streamTwo.paused) {
                pauseStreamTwo();
            }
            playStreamOne();
        }

    } else if (thisClick === "play-two") {
        if (document.getElementById(thisClick).classList.contains("playing")) {
            pauseStreamTwo();
            return
        } else {
            if (!streamOne.paused) {
                pauseStreamOne();
            }
            playStreamTwo();
        }
    }

}

playBtnOne.addEventListener(
    "click",
    () => {
        playStates(playBtnOne.id)
    },
    false
);

playBtnTwo.addEventListener(
    "click",
    () => {
        playStates(playBtnTwo.id)
    },
    false
);