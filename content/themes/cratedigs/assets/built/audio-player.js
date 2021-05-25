const streamOne = new Audio(
    "https://cratedigs.radioca.st/stream"
);


// This stops IceCast registering listeners on new tabs being opened.
streamOne.preload = "none";

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

function playStreamOne() {
    playBtnOne.classList.remove("play");
    playBtnOne.classList.add("pause", "playing");
    streamOne.play();

}

function pauseStreamOne() {
    streamOne.pause();
    playBtnOne.classList.remove("pause", "playing");
    playBtnOne.classList.add("play");
}


function playStates(thisClick) {

    if (thisClick === "play-one") {
        if (document.getElementById(thisClick).classList.contains("playing")) {
            pauseStreamOne();
            return
        } else {
            playStreamOne();
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