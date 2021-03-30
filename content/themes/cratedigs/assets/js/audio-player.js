const audioPlayerOne = document.querySelector(".audio-player-one");
const audioPlayerTwo = document.querySelector(".audio-player-two");

const streamOne = new Audio(
    "https://cratedigs.radioca.st/stream"
);


const streamTwo = new Audio(
    "https://cratedigsTwo.radioca.st/stream"
);

//toggle between playing and pausing on button click
const playBtnOne = audioPlayerOne.querySelector(".controls-one .toggle-play");
const playBtnTwo = audioPlayerTwo.querySelector(".controls-two .toggle-play");

playBtnOne.addEventListener(
    "click",
    () => {

        if (streamTwo.play) {
            // Stream Two is already playing
            playBtnTwo.classList.remove("pause");
            playBtnTwo.classList.add("play");
            streamTwo.pause();
            playBtnOne.classList.remove("play");
            playBtnOne.classList.add("pause");
            streamOne.play();
        } else if (streamOne.paused) {
            playBtnOne.classList.remove("play");
            playBtnOne.classList.add("pause");
            streamOne.play();
        } else {
            playBtnOne.classList.remove("pause");
            playBtnOne.classList.add("play");
            streamOne.pause();
        }
    },
    false
);

playBtnTwo.addEventListener(
    "click",
    () => {
        if (streamOne.play) {
            // Stream One is already playing
            playBtnOne.classList.remove("pause");
            playBtnOne.classList.add("play");
            streamOne.pause();
            playBtnTwo.classList.remove("play");
            playBtnTwo.classList.add("pause");
            streamTwo.play();
        } else if (streamTwo.paused) {
            playBtnTwo.classList.remove("play");
            playBtnTwo.classList.add("pause");
            streamTwo.play();
        } else {
            playBtnTwo.classList.remove("pause");
            playBtnTwo.classList.add("play");
            streamTwo.pause();
        }
    },
    false
);